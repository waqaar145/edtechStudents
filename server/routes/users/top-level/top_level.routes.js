const Router = require('express');
const routes = new Router();

const topLevelController = require('./top_level.controllers');
const validation = require('./top_level.validations');

routes.get('/top-level/semesters', topLevelController.getSemesters);
routes.get('/top-level/subjects', topLevelController.getSubjects);

module.exports = routes;