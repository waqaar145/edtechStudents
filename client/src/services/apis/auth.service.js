import {HTTPClient} from './http.service';

export const authService = {
  async Signup(data) {
    try {
      const result = await HTTPClient.post('/api/v1/signup', data);
      return result;
    } catch(error) {
      throw error;
    }
  }
}