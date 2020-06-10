import {HTTPClient} from './http.service';

export const contentService = {
  async getContents() {
    try {
      const result = await HTTPClient.get('https://jsonplaceholder.typicode.com/users');
      return result;
    } catch(error) {
      return error;
    }
  }
}