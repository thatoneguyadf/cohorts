var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Project = mongoose.model('Project');
var jwt = require('../modules/jwt.js');

router.param('projectId', function (req, res, next, projectId) {
    Project.findById(projectId).populate('user').exec(function (err, project) {
        if (err) return res.sendStatus(404);
        req.project = project;
        next();
    });
});

/* GET project listing. */
router.route('/')
    .get(jwt.protect, function (req, res) {
        Project.find(function (err, projects) {
            res.json(projects);
        });
    })
    .post(jwt.protect, function (req, res) {
        var project = new Project(req.body);
        project.save(function (err) {
            res.json(project);
        });
    });

router.route('/:projectId')
    .put(jwt.protect, function (req, res) {
        req.project.update({$set: req.body}, {new: true}, function (err, project) {
            res.sendStatus(200);
        });
    })
    .get(jwt.protect, function (req, res) {
        res.json(req.project);
    })
    .delete(jwt.protect, function (req, res) {
        req.project.remove(function (err) {
            if (err) return res.status(400).json(err);

            res.sendStatus(200);
        });
    });

module.exports = router;