const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const key = require('../../config/key');
const passport = require('passport');

//Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

//Load User model
const User = require('../../models/User');

// @route   GET api/users/test
// @desc    test users route
// @access  Public
router.get('/test', (req, res) => res.json( {msg: "Users Works"} ));

// @route   GET api/users/register
// @desc    register user
// @access  Public
router.post('/register', (req, res) => {
    const {errors, isValid } = validateRegisterInput(req.body);
    //Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({ email: req.body.email })
        .then(user => {
            if(user){
                errors.email = 'Cette adresse Email existe déjà.'
                return res.status(400).json(errors);
            }else{
                const avatar = gravatar.url(req.body.email, {
                    s: '200', //Size
                    r: 'pg', //Rating
                    d: 'mm' //default
                });

                const newUser = new User({
                    name:  req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    })
                })
            }
        });
});

// @route   GET api/users/login
// @desc    register user / Returning JWT Token
// @access  Public
router.post('/login', (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body);

    //Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    //find user by email
    User.findOne({email})
        .then(user => {
            //Check for user
            if(!user) {
                errors.email = "Ce compte n'existe pas.";
                return res.status(404).json(errors);
            }

            //Check password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch){
                        // User Matched

                        const payload = {id: user.id, name: user.name, avatar: user.avatar} //Create JWT Payload

                        // Sign Token
                        jwt.sign(payload, 
                            key.secretOrKey, 
                            { expiresIn: 3600 },
                             (err, token) => {
                                res.json({
                                    succes: true,
                                    token: 'Bearer ' + token
                                });
                        });
                    }else{
                        errors.password = 'Mot de passe incorrect.'; 
                        return res.status(400).json(errors);
                    }
                });
        });
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
});

module.exports = router;