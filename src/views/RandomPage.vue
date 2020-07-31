<template>
      <div class="main">
<div class="container">
        <div class="page-title">Random Movie
        </div>
          <div 
            id="movie-paper"
            >
            <a :href='"/detail-page/" + data.results[moviePos].id'>
              <div
                id="movie-poster"  
                :style="{ backgroundImage: 'url(' + getPoster(data.results[moviePos].poster_path) + ')', height: (data.results[moviePos].title.length > 45) ? '305px':'328px'}" 
                v-bind="data.results[moviePos]"
                ></div>
                <div class="movie-title">
                  <div>
                  {{ data.results[moviePos].title }}
                  </div>
                  <div>
                  {{ data.results[moviePos].release_date.slice(0,4) }}
                  </div>
              </div>
            </a>
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
import axios from 'axios';
import DataService from './../services/DataService';

@Component
export default class RandomPage extends Vue {
  @Prop() private msg!: string;
  private data: any = {};
  private pageNumber: number = 1;
  private moviePos: number = 0;
  private sort: string = 'popularity.desc';
  private getRandomPage() {
      this.pageNumber = Math.floor(Math.random() * 500) + 1;
  }
  private getRandomMoviePos() {
      this.moviePos = Math.floor(Math.random() * this.data.results.length) + 1;
  }
  private getNewRandom() {
    this.getRandomPage();
    this.retrieveMovies();
  }
  private retrieveMovies() {
    DataService.getAll(this.pageNumber, this.sort, '')
      .then((response) => {
        this.data = JSON.parse(JSON.stringify(response.data));
        this.getRandomMoviePos();
        console.log(this.data);
      })
      .catch((e) => {
        console.log('error', e);
      });
  }
  private mounted() {
    this.getRandomPage();
    this.retrieveMovies();
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main {
  padding: 16px 0;
  /* margin-top: 30px; */
  display: flex;
  justify-content: center;
}
a {
  text-decoration: none;
}
#movie-paper {
  padding: 0;
  width: 300px;
  height: 420px;
  margin: 35px 0;
  border-radius: 10px;
  background-color: white;
  border: none;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15)
}
#movie-poster {
  border-radius: 10px 10px 0 0;
  background-size: cover;
  margin: 0;
}
.movie-title {
  margin: 10px 8px;
}
.random-button {
  margin-top: 55px;
}
.page-title {
  font-size: 36px;
}
.container {
  padding: 50px;
  max-width: 1600px;
}
</style>
