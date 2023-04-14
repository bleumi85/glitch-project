const Joi = require("joi");
const validateRequest = require("../middleware/validate-request");
const accountService = require("../services/account");

module.exports = (router) => {
    router.post("/register", registerScheme, register);

    // Return the router
    return router;
}

function registerScheme(req, res, next) {
    const schema = Joi.object({
        userName: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
        acceptTerms: Joi.boolean().valid(true).required()
    });
    validateRequest(req, next, schema);
}

function register(req, res, next) {
    accountService.register(req.body, req.get('origin'))
        .then(() => res.json({ message: 'Registration successful, please check your email for verification instructions' }))
        .catch(next);
}