import http from '../http-common';

// const api_key = 'f516e13764c3e546142f74d9acf29011';

class DataService {
  public getAll(pageNumber: number, sorting: string) {
    return http.get(`/discover/movie?api_key=f516e13764c3e546142f74d9acf29011&language=en-US&sort_by=${sorting}&certification_country=us&include_adult=false&page=${pageNumber}&with_original_language=en`);
  }

  public get(id: string) {
    return http.get(`/movie/${id}?api_key=f516e13764c3e546142f74d9acf29011`);
  }

//   create(data: any) {
//     return http.post('/tutorials', data);
//   }

//   update(id: string, data: any) {
//     return http.put(`/tutorials/${id}`, data);
//   }

//   delete(id: string) {
//     return http.delete(`/tutorials/${id}`);
//   }

//   deleteAll() {
//     return http.delete(`/tutorials`);
//   }

//   findByTitle(title: string) {
//     return http.get(`/tutorials?title=${title}`);
//   }
}

export default new DataService();
