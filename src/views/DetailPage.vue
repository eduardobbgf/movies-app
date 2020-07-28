<template>
      <div class="main">
        <li>
          <div 
            id="movie-paper"
            >
            <a :href='"/detail-page/" + data.id'>
            <div
              id="movie-poster"  
              :style="{ backgroundImage: 'url(' + getPoster(data.poster_path) + ')', height: (data.title.length>40) ? '305px':'328px'}" 
              v-bind="data"
              ></div>
              <div class="movie-title">
                <div>
                {{ data.title }}
                </div>
                <div>
                {{ data.release_date.slice(0,4) }}
                </div>
                <div>
                Comedy, Action, Drama
                </div>
            </div>
            </a>
          </div>
        </li>
        <div>
          <button :disabled='isDisabled' @click="decrementPage()">Previous page</button>
          <button @click="incrementPage()">Next page</button>
        </div>
      </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';
import DataService from './../services/DataService';
import VueRouter, { Route } from 'vue-router';

@Component
export default class DetailPage extends Vue {
  private data = {};
  private movie_id: string = (this.$router as any).history.current.params.movie_id;
  private sort: string = 'popularity.desc';

  private retrieveMovies() {
    DataService.get(this.movie_id)
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

    if (!posterPath) {
      return 'https://cdn4.iconfinder.com/data/icons/defaulticon/icons/png/256x256/no.png';
    }
    return posterPathInit + posterPath;
  }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
a {
  text-decoration: none;
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
#movie-paper {
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
  margin: 10px 0;
}

</style>
