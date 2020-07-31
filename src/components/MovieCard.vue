<template>
      <div class="container"> 
        <div class="button-switch-page">
          <div>
          <select size="1" class="select-box" v-model="sort" @change='selectSort'>
            <option value='popularity.desc' selected>Most Popular</option>
            <option value='popularity.asc' selected>Least Popular</option>
            <option value='original_title.asc' selected>Title Ascending</option>
            <option value='original_title.desc' selected>Title Descending</option>
          </select>
          <select size="1" class="select-box" v-model="genreWith"  @change='selectGenre'>
            <option 
              value='' 
              selected
              >All</option>
            <option 
              :value='genre.id' 
              v-for="genre in allGenres" 
              :key="genre.id" 
              >{{genre.name}}</option>
          </select>
          </div>
          <div class="button-page-top">
              <div class="w3-bar w3-border w3-round">
                <button 
                  class="w3-button"
                  :disabled='isDisabled'
                  @click="decrementPage()"
                  >&#10094; Previous</button>
                <button 
                  href="#" 
                  class="w3-button w3-right"
                  @click="incrementPage()"
                  >Next &#10095;</button>
              </div>
          </div>
        </div>
        <li 
          v-for="item in data.results.slice(this.part*10,this.part*10+10)" 
          v-bind:key="item.id"
          >
          <div 
            id="movie-paper"
            >
            <a :href='"/detail-page/" + item.id'>
            <div
              id="movie-poster"  
              :style="{ backgroundImage: 'url(' + getPoster(item.poster_path) + ')', height: giveHeights(item.title.length)}" 
              v-bind="item"
              ></div>
              <div class="movie-title">
                <div>
                {{ item.title }}
                </div>
                <div>
                {{ item.release_date.slice(0,4) }}
                </div>
            </div>
            </a>
          </div>
        </li>
        <div class="w3-center">
          <div class="w3-bar w3-border w3-round">
              <button 
                class="w3-button"
                :disabled='isDisabled'
                @click="decrementPage()"
                >&#10094; Previous</button>
              <button 
                href="#" 
                class="w3-button w3-right"
                @click="incrementPage()"
                >Next &#10095;</button>
          </div>
        </div>
      </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';
import DataService from './../services/DataService';
import VueRouter, { Route } from 'vue-router';

@Component
export default class MovieCard extends Vue {
  @Prop() private msg!: string;
  private data = {};
  private pageNumber: number = 1;
  private isDisabled: boolean = true;
  private part: number = 0;
  private sort: string = 'popularity.desc';
  private allGenres: any;
  private genreWith: string = '';

  private selectGenre() {
    this.part = 0;
    this.pageNumber = 1;
    this.retrieveMovies();
  }
  private retrieveGenres() {
    DataService.getGenres()
      .then((response) => {
        this.allGenres = JSON.parse(JSON.stringify(response.data)).genres;

        console.log(this.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  private giveHeights(numChar: any) {
    if (numChar < 42) {
      return '328px';
    } else if (numChar < 80) {
      return '305px';
    } else {
      return '295px';
    }
  }
  private pages() {
    this.isDisabled = (this.pageNumber === 1 && this.part === 0) ? true : false;
  }
  private incrementPage() {
    if (this.part === 1) {
      this.pageNumber++;
      this.part = 0;
    } else {
      this.part++;
    }

    this.retrieveMovies();
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  private decrementPage() {
    if (this.part === 0) {
      if (this.pageNumber > 1) {
        this.pageNumber--;
      }
    }
    if (this.part === 1) {
      this.part--;
    }
    this.retrieveMovies();

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    console.log(this.pageNumber);
  }

  private retrieveMovies() {
    DataService.getAll(this.pageNumber, this.sort, this.genreWith)
      .then((response) => {
        this.data = JSON.parse(JSON.stringify(response.data));

        console.log(this.data);
        this.pages();
      })
      .catch((e) => {
        console.log(e);
      });
  }
  private getGenre() {
    const genreQuery = (this.$router as any).history.current.query.genre_id;
    if (genreQuery) {
      this.genreWith = genreQuery;
    }
  }
  private mounted() {
    this.getGenre();
    this.retrieveGenres();
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
  flex-wrap: wrap;
  justify-content:space-between;
  margin: 35px 10px 10px;
}
#movie-paper {
  padding: 0;
  width: 300px;
  height: 420px;
  margin: 15px 0;
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
.container {
  max-width: 1600px;
}
.select-box {
  padding: 8px;
  margin-right: 15px;
  margin-top: 5px;
}
@media screen and (max-width: 600px) {
.button-switch-page {
  display: flex;
  flex-wrap: wrap;
  justify-content:center;
  margin: 35px 10px 10px;
}
.select-box {
  width: 80%;
  padding: 8px;
  margin: 10px 0;
}
.button-page-top {
  width: 232px;
  margin-top: 15px;
}
}
</style>
