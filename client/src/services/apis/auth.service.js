import {HTTPClient} from './http.service';

export const authService = {
  async Signup(data) {
    try {
      const result = await HTTPClient.post('/api/v1/auth/signup', data);
      return result;
    } catch(error) {
      throw error;
    }
  },
  async Signin(data) {
    try {
      const result = await HTTPClient.post('/api/v1/auth/signin', data);
      return result;
    } catch(error) {
      throw error;
    }
  },
  async getLoggedInUser (cookie) {
    try {
      const result = await HTTPClient.get(process.env.API_URL + '/api/v1/auth/logged-in', {headers: {Cookie: cookie}});
      return result;
    } catch(error) {
      throw error;
    }
  }
}