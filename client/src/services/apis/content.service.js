import {HTTPClient} from './http.service';

export const contentService = {
  async getFirstChaptersBySubjectSlug(subject_slug, isServer) {
    try {
      let result;
      if (isServer) {
        result = await HTTPClient.get(`${process.env.API_URL}/api/v1/content/subject/${subject_slug}`);
      } else {
        result = await HTTPClient.get(`/api/v1/content/subject/${subject_slug}`);
      }
      return result;
    } catch(error) {
      throw error;
    }
  },
  async getChaptersBySubjectSlug(subject_slug, chapter_slug, isServer) {
    try {
      let result;
      if (isServer) {
        result = await HTTPClient.get(`${process.env.API_URL}/api/v1/content/subject/${subject_slug}/chapter/${chapter_slug}/all`);
      } else {
        result = await HTTPClient.get(`/api/v1/content/subject/${subject_slug}/all`);
      }
      return result;
    } catch(error) {
      throw error;
    }
  },
  async getContentByChapterSlug(chapter_slug, content_type, isServer) {
    try {
      let result;
      if (isServer) {
        result = await HTTPClient.get(`${process.env.API_URL}/api/v1/content/chapter/${chapter_slug}?content_type=${content_type}`);
      } else {
        result = await HTTPClient.get(`/api/v1/content/chapter/${chapter_slug}?content_type=${content_type}`);
      }
      return result;
    } catch(error) {
      throw error;
    }
  },
}