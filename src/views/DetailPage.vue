<template>
      <div class="main">
        <section class="movie-box">
            <div
                class="movie-poster"  
                :style="{ backgroundImage: mixinsFuncs.getPoster(movieDetails.poster_path) }" 
                v-bind="movieDetails"
                ></div>
            <div class="movie-title">
                <p>
                  <span id="movie-list">Title</span>
                  <span>: {{ movieDetails.title }}</span>
                </p>
                <p>
                  <span id="movie-list">Release Date</span>
                  <span>: {{ movieDetails.release_date }}</span>
                </p>
                <div>
                  <span id="movie-list">Genres:</span>
                  <span v-for="(genre, index) in movieDetails.genres" :key="genre.name">
                    <span> {{ genre.name }}</span>
                    <span v-if="index+1 <movieDetails.genres.length">,</span>
                  </span>
                </div>
                <p>
                  <span id="movie-list">Rating</span>
                  <span>: {{ movieDetails.vote_average }}</span>
                </p>
                <p>
                  <span id="movie-list">Votes</span> 
                  <span>: {{ movieDetails.vote_count }}</span>
                </p>
                <p>
                  <span id="movie-list">Overview</span> 
                  <span>: {{ movieDetails.overview }}</span>
                </p>
                <p>
                  <span>{{ movieDetails.runtime }} min</span>
                </p>
                <p>
                  <span id="movie-list">Status</span> 
                  <span>: {{ movieDetails.status }}</span>
                </p>
                <p>
                  <a :href="movieDetails.homepage">Movie's Homepage</a>
                </p>
            </div>
        </section>
        <div class="movie-box-recom">
            <div class="movie-recom-title">
              Recommendation based on this movie
            </div>
            <section class="movie-box-recom" >
                <a
                    v-for='item in moviesRecommended'
                    class="movie-poster-options"  
                    :style="{ backgroundImage: mixinsFuncs.getPoster(item.poster_path)}" 
                    :href='"/detail-page/" + item.id'
                    :key="item.id"
                    ></a>
            </section>
        </div>
      </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import VueRouter, { Route } from 'vue-router';
import functions from './../mixins/sharedFunctions.vue';

@Component
export default class DetailPage extends Vue {
  private movieDetails: any = {};
  private collection: any = {};
  private moviesRecommended: any = [];
  private moviesSelected: any = {};
  private movieId: string = (this.$router as any).history.current.params.movie_id;
  private sort: string = 'popularity.desc';
  private mixinsFuncs = functions.methods;

  private async setMovieDetail() {
    await this.$store.dispatch('retrieveMovieDetail', this.movieId);
    this.movieDetails = await this.$store.getters.getMovieDetail;
    this.retrieveCollections();
  }

  // If this movie has a collection, recommend movies from the collection
  private async retrieveCollections() {
    if (this.movieDetails.belongs_to_collection) {
      await this.setCollections();
      this.collectionRecommended();
    }  else {
      this.recommendMovies();
    }
  }

  private async setCollections() {
    await this.$store.dispatch('retrieveCollections',
                               this.movieDetails.belongs_to_collection.id);
    this.collection = await this.$store.getters.getCollection;
  }

  private async recommendMovies() {
    await this.selectMovies();
    this.removeItem(this.moviesSelected, this.movieDetails);
    const numberRecommended = this.moviesRecommended.length;
    for (let i = 0; i < 3 - numberRecommended; i++) {
      this.moviesRecommended.push(this.moviesSelected[i]);
    }
  }

  // Function will organize the order movie collections in case there are more
  // than 2 movies in this collection
  private collectionRecommended() {
    const index = this.collection.parts.map((e: any) => e.id)
                  .indexOf(this.movieDetails.id);
    this.collection.parts.splice(index, 1);
    const parts = this.collection.parts;
    if (parts.length > 2) {
      for (let i = 0; i < index; i++) {
          parts.push(parts.shift());
      }
      this.moviesRecommended = parts.slice(0, 3);
    } else {
      this.moviesRecommended = parts;
      this.recommendMovies();
    }
  }

  // This function will get the top 20 most popular movies with the same genre
  private async selectMovies() {
    const genresId = this.getMovieGenres();
    const filters = {
      page: 1,
      sort: 'popularity.desc',
      withGenre: genresId,
    };
    await this.$store.dispatch('retrieveMovies', filters);
    this.moviesSelected = this.$store.getters.getMovies;
  }

  private removeItem(array: object[], item: any) {
    const index = array.map((e: any) => e.id).indexOf(item.id);
    if (index > -1) {
      array.splice(index, 1);
    }
  }

  private getMovieGenres() {
    return this.movieDetails.genres.map((genre: any ) => genre.id).toString();
  }

  private async mounted() {
    await this.setMovieDetail();
  }
}
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
.button-switch-page {
  display: flex;
  justify-content:space-between;
  margin: 0 32px;
  margin-top: 25px;
}
.movie-poster { 
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  background-position: center 0 ;
  border-radius: 10px;
  width: 300px;
  height: 420px;
  background-size: cover;
  margin: 0  15px;
}
.movie-title {
  width: 65%;
  margin: 10px 0;
  text-align: left;
}
.movie-box {
  display: flex;
  flex-wrap: wrap;
  justify-content:center;
  margin: 3%;
}
.movie-box-recom {
  display: flex;
  flex-wrap: wrap;
  justify-content:center;
  margin-bottom: 21px;
  width: 100%;
  background-color: #e8e8e8;
}
.movie-poster-options {
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  width: 225px;
  height: 315px;
  background-size: cover;
  margin: 15px;
}
#movie-list {
    font-weight: bold;
}
.movie-recom-title {
  margin-top: 15px;
  font-size: 24px;
}
.main {
  margin-top: 40px;
  margin-bottom: 150px;
}
</style>
