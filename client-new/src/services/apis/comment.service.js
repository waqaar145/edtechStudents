import { HTTPClient } from './http.service';

export const commentService = {
  async getContentByContentSlug (content_slug) {
    try {
      let result = await HTTPClient.get(`/api/v1/discussion/content/${content_slug}`);
      return result;
    } catch(error) {
      throw error;
    }
  },
  async getDiscussionByContentSlug(content_slug, queryParams) {
    try {
      let result = await HTTPClient.get(`/api/v1/discussion/discussion/${content_slug}`, { params: queryParams });
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
}