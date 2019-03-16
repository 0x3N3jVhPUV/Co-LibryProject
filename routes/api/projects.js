const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//Project model
const Projects = require('../../models/Projects');
//Profile model
const Profile = require('../../models/Profile');

//Validation
const validateProjectsInput = require('../../validation/projects');

// @route   GET api/Projectss/test
// @desc    test Projects route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: "Projects Works" }));

// @route   GET api/Projectss
// @desc    Get Projects
// @access  Public
router.get('/', (req, res) => {
    Projects.find()
        .sort({ date: -1 })
        .then(projects => res.json(projects))
        .catch(err => res.status(404).json({ noprojectsfound: 'No projects found' }));
});

// @route   GET api/projects/:id
// @desc    Get project by id
// @access  Public
router.get('/:id', (req, res) => {
    Projects.findById(req.params.id)
        .then(projects => res.json(projects))
        .catch(err => res.status(404).json({ noprojectsfound: 'No projects found with this ID' }));
});

// @route   POST api/projects
// @desc    Create project
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateProjectsInput(req.body);

    //Check Validation
    if (!isValid) {
        // If any errors, send 400 with errors object
        return res.status(400).json(errors);
    }

    const newProjects = new Projects({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
    });

    newProjects.save().then(projects => res.json(projects));
});

// @route   DELETE api/projects/:id
// @desc    Delete projects
// @access  Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            Projects.findById(req.params.id)
                .then(projects => {
                    //Check for project owner
                    if (projects.user.toString() !== req.user.id) {
                        return res.status(401).json({ notauthorized: 'User not authorized' });
                    }
                    //Delete
                    projects.remove().then(() => res.json({ success: true }));
                })
                .catch(err => res.status(404).json({ projectnotfound: 'No project found' }));
        })
});

// @route   POST api/projects /like/: id
// @desc    Project like
// @access  Private
router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            Projects.findById(req.params.id)
                .then(projects => {
                    if (projects.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
                        return res.status(400).json({ alreadyliked: 'User already liked this projects' });
                    }
                    // Add user id to like array
                    projects.likes.unshift({ user: req.user.id });
                    //save
                    projects.save().then(projects => res.json(projects));
                })
                .catch(err => res.status(404).json({ projectsnotfound: 'No projects found' }));
        })
});

// @route   POST api/projects /unlike/: id
// @desc    Projects unlike
// @access  Private
router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            Projects.findById(req.params.id)
                .then(projects => {
                    if (projects.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
                        return res.status(400).json({ notliked: 'You have not yet liked this projects' });
                    }
                    // Get remove index
                    const removeIndex = projects.likes.map(item => itme.user.toString()).indexOf(req.user.id);

                    // Splice out of array
                    projects.likes.splice(removeIndex, 1);

                    //Save
                    projects.save().then(projects => res.json(projects));
                })
                .catch(err => res.status(404).json({ projectsnotfound: 'No projects found' }));
        })
});

// @route   POST api/projects/comment/: id
// @desc    Add comment to project
// @access  Private
router.post('/comment/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateProjectsInput(req.body);

    //Check Validation
    if (!isValid) {
        // If any errors, send 400 with errors object
        return res.status(400).json(errors);
    }

    Projects.findById(req.params.id)
        .then(projects => {
            const newComment = {
                text: req.body.text,
                name: req.body.name,
                avatar: req.body.avatar,
                user: req.user.id
            }
            //Add comment array
            projects.comments.unshift(newComment);
            //Save
            projects.save().then(projects => res.json(projects))
        })
        .catch(err => res.status(404).json({ projectsnotfoud: 'No projects found' }));
});

// @route   DELETE api/projects/comment/: id/:comment_id
// @desc    remove comment from poroject
// @access  Private
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Projects.findById(req.params.id)
        .then(projects => {
            //Check if comment exists
            if (projects.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
                return res.status(404).json({ commentnotexists: 'Comment does not exist' });
            }
            //Get remove index
            const removeIndex = projects.comments.map(item => item._id.toString()).indexOf(req.params.comment_id);
            //Splice comment out of array
            projects.comments.splice(removeIndex, 1);
            //Save
            projects.save().then(projects => res.json(projects));
        })
        .catch(err => res.status(404).json({ projectsnotfoud: 'No projects found' }));
});

module.exports = router;