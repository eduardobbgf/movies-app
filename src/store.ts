import Vue from 'vue';
import Vuex from 'vuex';
import MovieModel from './models/MovieModel';
import DataService from './services/DataService';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    movies: [],
    collection: {},
    movieDetail: MovieModel,
    genres: [],
  },

  getters: {
    getMovies(state) {
      return state.movies;
    },
    getMovieDetail(state) {
      return state.movieDetail;
    },
    getCollection(state) {
      return state.collection;
    },
    getGenres(state) {
      return state.genres;
    },
  },
  actions: {
    async retrieveMovies(context: any, filters: any) {
      const {pageNumber, sort, withGenre} = filters;
      const response = await DataService.getAll(pageNumber, sort, withGenre);
      const moviesData = response.data.results;
      context.commit('setMovies', moviesData);

    },
    async retrieveMovieDetail(context: any, movieId: string) {
      const response = await DataService.get(movieId);
      context.commit('setMovieDetail', response.data);
    },

    async retrieveCollections(context: any, collectionId: string) {
      const response = await DataService.getCollection(collectionId);
      context.commit('setMovieCollection', response.data);
    },
    async retrieveGenres(context: any) {
      const response: any = await DataService.getGenres();
      context.commit('setGenres', response.data.genres);
    },
  },

  mutations: {
    setMovies(state: any, movies: any) {
      state.movies = movies;
    },
    setMovieDetail(state: any, movieInfo: any) {
      state.movieDetail = movieInfo;
    },
    setMovieCollection(state: any, collection: any) {
      state.collection = collection;
    },
    setGenres(state: any, genres: any) {
      state.genres = genres;
    },
  },
});
