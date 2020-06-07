import {HTTPClient} from './http.service';

export const contentService = {
  async getContents() {
    try {
      const result = await HTTPClient.get('https://jsonplaceholder.typicode.com/users');
      return result;
    } catch(error) {
      return error;
    }
  },
  // async tierList() {
  //   try {
  //     const result = await HTTPClient.get('/notification/tier');
  //     return result;
  //   } catch(error) {
  //     return error;
  //   }
  // },
  // async addNotification (data) {
  //   try {
  //     const result = await HTTPClient.post('/notification/', data);
  //     return result;
  //   } catch(error) {
  //     let error_object;
  //     if (error.status === 422 && error.data.status.code === 422) error_object = error.data.status.message;
  //     else if (error.status === 400 && error.data.status.code === 400) error_object = error.data.status.message;
  //     else error_object = 'UNKNOWN ERROR'
  //     throw error_object;
  //   }
  // }
}