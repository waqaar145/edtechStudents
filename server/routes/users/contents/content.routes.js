const Router = require('express');
const routes = new Router();

const contentController = require('./content.controllers');
const validation = require('./content.validations');

routes.get('/content/subject/:subject_slug', contentController.getFirstChapterSlugBySubjectSlug)
routes.get('/content/subject/:subject_slug/chapter/:chapter_slug/all', contentController.getChapterBySubjectSlug)
routes.get('/content/chapter/:chapter_slug', contentController.getContentByChapterSlug)


module.exports = routes;