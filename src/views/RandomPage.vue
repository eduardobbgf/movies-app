<template>
      <div class="main">
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
                <div>
                Comedy, Action, Drama
                </div>
            </div>
            </a>
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
  private retrieveMovies() {
    DataService.getAll(this.pageNumber, this.sort, '')
      .then((response) => {
        this.data = JSON.parse(JSON.stringify(response.data));
        this.getRandomMoviePos();
        console.log(this.data);
      })
      .catch((e) => {
        console.log("error",e);
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
  margin-top: 30px;
  display: flex;
}
a {
  text-decoration: none;
}
#movie-paper {
  justify-content: center;
  padding: 0;
  width: 300px;
  height: 420px;
  margin: 15px 0;
  background-color: white;
  border: 1px solid grey;
}
#movie-poster {
  background-size: cover;
  margin: 0;
}
.movie-title {
  margin: 10px 8px;
}

</style>
