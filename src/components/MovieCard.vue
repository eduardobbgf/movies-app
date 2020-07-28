<template>
      <div>
        <div class="button-switch-page">
          <select size="1" name="pet" v-model="sort" @change='selectSort'>
            <option value='popularity.desc' selected>Most Popular</option>
            <option value='popularity.asc' selected>Least Popular</option>
            <option value='original_title.asc' selected>Title Ascending</option>
            <option value='original_title.desc' selected>Title Descending</option>
          </select>
          <div>
            <button 
                    :disabled='isDisabled'
                    @click="decrementPage()"
                    >Previous page</button>
            <button @click="incrementPage()">Next page</button>
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
              :style="{ backgroundImage: 'url(' + getPoster(item.poster_path) + ')', height: (item.title.length>40) ? '305px':'328px'}" 
              v-bind="item"
              ></div>
              <div class="movie-title">
                <div>
                {{ item.title }}
                </div>
                <div>
                {{ item.release_date.slice(0,4) }}
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

@Component
export default class MovieCard extends Vue {
  @Prop() private msg!: string;
  private data = {};
  private pageNumber: number = 1;
  private isDisabled: boolean = true;
  private part: number = 0;
  private sort: string = 'popularity.desc';

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
  private selectSort() {
    this.retrieveMovies();
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
    DataService.getAll(this.pageNumber, this.sort)
      .then((response) => {
        this.data = JSON.parse(JSON.stringify(response.data));

        console.log(this.data);
        this.pages();
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
