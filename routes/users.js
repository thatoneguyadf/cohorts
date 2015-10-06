var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Project = mongoose.model('Project');
var jwt = require('../modules/jwt.js');

router.param('userId', function (req, res, next, userId) {
    User.findById(userId, function (err, user) {
        if (err) return res.sendStatus(404);
        req.userObj = user;
        next();
    });
});

/* GET users listings. */
router.route('/')
    .get(jwt.protect, function (req, res) {
        User.find(function (err, users) {
            res.json(users);
        });
    })
    .post(jwt.protect, function (req, res) {
        var user = new User(req.body);
        user.save(function (err) {
            res.json(user);
        });
    });

/* GET project listings. */
router.route('/:userId')
    .put(jwt.protect, function (req, res) {
        req.userObj.update({$set: req.body}, {new: true}, function (err, user) {
            res.sendStatus(200);
        });
    })
    .get(jwt.protect, function (req, res) {
        /*User.find({user: req.userObj._id}, function (err, users) {
            res.json(req.userObj);
        });*/
        res.json(req.userObj);
    })
    .delete(jwt.protect, function (req, res) {
        req.userObj.remove(function (err) {
            if (err) return res.status(400).json(err);

            res.sendStatus(200);
        });
    });


module.exports = router;
