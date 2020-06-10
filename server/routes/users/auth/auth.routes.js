const Router = require('express');
const routes = new Router();

const {signUp, signIn, loggedIn, logOut} = require('./auth.controllers');
const { signupValidation, signinValidation } = require('./auth.validations');
const { isLoggedIn } = require('./../../../helpers/auth');

routes.post('/auth/signup', [signupValidation], signUp);
routes.post('/auth/signin', [signinValidation], signIn);
routes.get('/auth/logged-in', loggedIn);
routes.get('/auth/logout', isLoggedIn, logOut);

module.exports = routes;