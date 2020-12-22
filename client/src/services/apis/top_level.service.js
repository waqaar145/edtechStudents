import {HTTPClient} from './http.service';

export const topLevelService = {
  async getSemesters(isServer) {
    try {
      let result;
      if (isServer) {
        result = await HTTPClient.get(process.env.API_URL + '/api/v1/top-level/semesters');
      } else {
        result = await HTTPClient.get('/api/v1/top-level/semesters');
      }
      return result;
    } catch(error) {
      throw error;
    }
  },
  async getSubjects(isServer) {
    try {
      let result;
      if (isServer) {
        result = await HTTPClient.get(process.env.API_URL + '/api/v1/top-level/subjects');
      } else {
        result = await HTTPClient.get('/api/v1/top-level/subjects');
      }
      return result;
    } catch(error) {
      throw error;
    }
  },
}