<template>
      <div class="main">
        <section class="movie-box">
            <div
                id="movie-poster"  
                :style="{ backgroundImage: 'url(' + getPoster(data.poster_path) + ')'}" 
                v-bind="data"
                ></div>
            <div class="movie-title">
                <p>
                    <span id="movie-list">Title</span>
                    <span>: {{ data.title }}</span>
                </p>
                <p>
                    <span id="movie-list">Release Date</span>
                    <span>: {{ data.release_date }}</span>
                </p>
                <div>
                    <span id="movie-list">Genres:</span>
                    <span v-for="(genre, index) in data.genres">
                        <span> {{ genre.name }}</span><span v-if="index+1 <data.genres.length">,</span>
                    </span>
                </div>
                <p>
                    <span id="movie-list">Votes</span>
                    <span>: {{ data.vote_average }}</span>
                </p>
                <p>
                    <span id="movie-list">Votes</span> 
                <span>: {{ data.vote_count }}</span>
                </p>
                <p>
                    <span id="movie-list">Overview</span> 
                    <span>: {{ data.overview }}</span>
                </p>
                <p>
                    <span>{{ data.runtime }} min</span>
                </p>
                <p>
                    <span id="movie-list">Status</span> 
                    <span>: {{ data.status }}</span>
                </p>
                <p>
                    <a :href="data.homepage">Movie's Homepage</a>
                </p>
            </div>
        </section>
        <div class="movie-recom">
            Recommendation based on this movie
        </div>
        <section class="movie-box">
            <div
                id="movie-poster-options"  
                :style="{ backgroundImage: 'url(' + getPoster(data.poster_path) + ')'}" 
                v-bind="data"
                ></div>
            <div
                id="movie-poster-options"  
                :style="{ backgroundImage: 'url(' + getPoster(data.poster_path) + ')'}" 
                v-bind="data"
                ></div>
            <div
                id="movie-poster-options"  
                :style="{ backgroundImage: 'url(' + getPoster(data.poster_path) + ')'}" 
                v-bind="data"
                ></div>
        </section>
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
  display: flex;
  padding: 0;
  width: 300px;
  height: 420px;
  margin: 15px 0;
  background-color: white;
  border: 1px solid grey;
}
#movie-poster {
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
#movie-poster-options {
  width: 225px;
  height: 315px;
  background-size: cover;
  margin: 15px;
}
#movie-list {
    font-weight: bold;
}
.movie-recom {
  font-size: 24px;
}
</style>
