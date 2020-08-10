<template>
      <div class="main">
        <div class="container">
          <div class="page-title">Random Movie</div>
            <div class="movie-paper">
              <MovieCard :item="randomMovie"/>
            </div>
            <div class="padding-20">
              <button 
                class="random-button w3-button w3-white w3-border"
                @click="getNewRandom"
                >Generate New Random</button>
            </div>
        </div>
      </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import functions from './../mixins/sharedFunctions.vue';
import MovieCard from './../components/MovieCard.vue';

@Component({components: {MovieCard}})
export default class RandomPage extends Vue {
  private data: object[] = [];
  private randomMovie: any = {title: ''};
  private pageNumber: number = 1;
  private moviePos: number = 0;
  private sort: string = 'popularity.desc';
  private mixinsFuncs = functions.methods;

  private getRandomPage() {
    this.pageNumber = Math.floor(Math.random() * 500) + 1;
  }

  private getRandomMoviePos() {
    this.moviePos = Math.floor(Math.random() * this.data.length) + 1;
  }
  private getNewRandom() {
    this.getRandomPage();
    this.setMovies();
  }

  private async setMovies() {
    const filters = {
      pageNumber: this.pageNumber,
      sort: this.sort,
      withGenre: '',
      };
    await this.$store.dispatch('retrieveMovies', filters);
    this.data = this.$store.getters.getMovies;
    this.randomMovie = this.data[(this.moviePos as any)];
  }

  private mounted() {
    this.getRandomPage();
    this.setMovies();
  }

  private getPoster(posterPath: string): string {
    const posterPathInit = 'https://image.tmdb.org/t/p/w500';
    if (!posterPath) {
      return 'https://cdn4.iconfinder.com/data/icons/defaulticon/icons/png/256x256/no.png';
    }
    return posterPathInit + posterPath;
  }
}
</script>

<style scoped>
.main {
  padding: 20px 0 200px;
  height: 100vh;
  margin-top: -108px;
  padding-top: 120px;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
}
a {
  text-decoration: none;
}
.padding-20 {
  margin-top: -20px;
}
.movie-paper {
  padding: 0;
  width: 300px;
  height: 420px;
  margin: 35px 0;
  border-radius: 10px;
  background-color: white;
  border: none;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15)
}
.movie-title {
  margin: 10px 8px;
}
.random-button {
  margin: 20px 0;
}
.page-title {
  margin-top: 15px;
  font-size: 36px;
}
.container {
  height: auto;
  max-width: 1600px;
}
</style>
