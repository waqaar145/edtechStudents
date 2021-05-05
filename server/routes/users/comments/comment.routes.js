const Router = require('express');
const routes = new Router();

const commentController = require('./comment.controllers');

routes.get('/discussion/content/:content_slug', commentController.getContentByContentSlug)
routes.get('/discussion/discussion/:content_slug', commentController.getCommentsOfContent)
routes.post('/discussion/comment/add', commentController.addComment)
routes.put('/discussion/comment/edit/:comment_id', commentController.updateComment)
routes.delete('/discussion/comment/:comment_id', commentController.deleteCommentById)

module.exports = routes;