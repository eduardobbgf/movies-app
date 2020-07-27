<template>
  <div class="hello">
    <div>
      <button @click="decrementPage()">Previous page</button>
      <button @click="incrementPage()">Next page</button>
    </div>
    <li v-for="item in data.results" v-bind:key="data.results">
      <button id="movie-paper">
        <div id="movie-poster" :style="{ backgroundImage: 'url(' + getPoster(item.poster_path) + ')'}" v-bind="item" />
        <div id="movie-title">
          <div>
          {{ item.title }}
          </div>
          <div>
          {{ item.release_date.slice(0,4) }}
          </div>
        </div>
      </button>
    </li>
    <div>
      <button @click="decrementPage()">Previous page</button>
      <button @click="incrementPage()">Next page</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';
import DataService from './../services/DataService';

@Component
export default class Home extends Vue {
  @Prop() private msg!: string;
  private data = {};
  private pageNumber: number = 1;


  private incrementPage() {
    this.pageNumber++;
    this.retrieveMovies();
    console.log(this.pageNumber);
  }
  private decrementPage() {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.retrieveMovies();
      }
    console.log(this.pageNumber);
  }
  private retrieveMovies() {
    DataService.getAll(this.pageNumber)
      .then((response) => {
        this.data = JSON.parse(JSON.stringify(response.data));

        console.log(this.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  private mounted() {
    this.retrieveMovies();
  }

  private getPoster(posterPath: string): string {
    const posterPathInit = 'https://image.tmdb.org/t/p/w500';
    return posterPathInit + posterPath;
  }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
div {
line-break: auto;
}
#movie-paper {
  width: 300px;
  margin: 15px 0;
  padding: 0;
  background-color: white;
  border: 1px solid grey;
}
#movie-poster {
  height: 200px;
  background-size: cover;
}
#movie-title {
  height: 60;
}
</style>
