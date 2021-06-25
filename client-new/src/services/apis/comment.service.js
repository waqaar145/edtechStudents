import { HTTPClient } from './http.service';
const queryString = require('query-string');

export const commentService = {
  async getContentByContentSlug (content_slug, cookie) {
    try {
      let result = await HTTPClient.get(`/api/v1/discussion/content/${content_slug}`, cookie ? {headers: {Cookie: cookie}} : {});
      return result;
    } catch(error) {
      throw error;
    }
  },
  async getDiscussionByContentSlug(content_slug, queryParams, cookie) {
    let params = queryString.stringify(queryParams)
    try {
      let result = await HTTPClient.get(`/api/v1/discussion/discussion/${content_slug}?${params}`, cookie ? {headers: {Cookie: cookie}} : {});
      return result;
    } catch(error) {
      throw error;
    }
  },
  async addComment(comment) {
    try {
      let result = await HTTPClient.post('/api/v1/discussion/comment/add', comment);
      return result;
    } catch(error) {
      throw error;
    }
  },
  async updateComment(comment, id) {
    try {
      let result = await HTTPClient.put(`/api/v1/discussion/comment/edit/${id}`, comment);
      return result;
    } catch(error) {
      throw error;
    }
  },
  async deleteCommentById(contentId, commentId) {
    try {
      let result = await HTTPClient.delete(`/api/v1/discussion/comment/${commentId}/${contentId}`);
      return result;
    } catch(error) {
      throw error;
    }
  },
  async likeComment (data) {
    try {
      let result = await HTTPClient.post('/api/v1/discussion/comment/like', data);
      return result;
    } catch(error) {
      throw error;
    }
  }
}