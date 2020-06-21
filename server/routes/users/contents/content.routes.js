const Router = require('express');
const routes = new Router();

const contentController = require('./content.controllers');
const validation = require('./content.validations');

routes.get('/content/subject/:subject_slug', contentController.getFirstChapterSlugBySubjectSlug)
routes.get('/content/subject/:subject_slug/123', contentController.getChaptersBySubjectSlug);


module.exports = routes;