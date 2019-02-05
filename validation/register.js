const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';

    if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
        errors.name = 'Le nom doit avoir entre 2 à 30 characters';
    }

    if (Validator.isEmpty(data.name)) {
        errors.name = 'Vous devez rentrer votre nom.';
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Cette email est incorrect';
    }
    if (Validator.isEmpty(data.email)) {
        errors.email = 'Vous devez rentrer votre email.';
    }

    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = 'Le mot de passe doit avoir au moins 6 characters';
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = 'Vous devez rentrer un mot de passe.';
    }

    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = 'Les mots de passe ne sont pas identiques.';
    }
    if (Validator.isEmpty(data.password2)) {
        errors.password2 = 'Vous devez confirmer votre mot de passe.';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};