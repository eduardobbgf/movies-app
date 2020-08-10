import http from '../http-common';

// const api_key = 'f516e13764c3e546142f74d9acf29011';

class DataService {
  public getAll(pageNumber: number, sorting: string, genres: string) {
    if (genres === '') {
      return http.get(`/discover/movie?api_key=f516e13764c3e546142f74d9acf29011&language=en-US&sort_by=${sorting}&certification_country=us&include_adult=false&page=${pageNumber}&with_original_language=en`);
    } else {
      return http.get(`/discover/movie?api_key=f516e13764c3e546142f74d9acf29011&language=en-US&sort_by=${sorting}&certification_country=us&include_adult=false&page=${pageNumber}&with_original_language=en&with_genres=${genres}`);
    }
  }

  public get(id: string) {
    return http.get(`/movie/${id}?api_key=f516e13764c3e546142f74d9acf29011`);
  }

  public getCollection(id: string) {
    return http.get(`/collection/${id}?api_key=f516e13764c3e546142f74d9acf29011`);
  }

  public getGenres() {
    return http.get(`/genre/movie/list?api_key=f516e13764c3e546142f74d9acf29011&language=en-US`);
  }
}

export default new DataService();
