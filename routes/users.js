var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Project = mongoose.model('Project');

router.param('userId', function (req, res, next, userId) {
    User.findById(userId, function (err, user) {
        if (err) return res.sendStatus(404);
        req.user = user;
        next();
    });
});

/* GET users listings. */
router.route('/')
    .get(function (req, res) {
        User.find(function (err, users) {
            res.json(users);
        });
    })
    .post(function (req, res) {
        var user = new User(req.body);
        user.save(function (err) {
            res.json(user);
        });
    });

/* GET project listings. */
router.route('/:userId')
    .put(function (req, res) {
        req.user.update({$set: req.body}, {new: true}, function (err, result) {
            res.sendStatus(200);
        });
    })
    .get(function (req, res) {
        Project.find({user: req.user._id}, function (err, projects) {
            res.json(req.user);
        });
    })
    .delete(function (req, res) {
        req.user.remove(function (err) {
            if (err) return res.status(400).json(err);

            res.sendStatus(200);
        });
    });


module.exports = router;
