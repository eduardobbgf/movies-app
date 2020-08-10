<template>
  <div class="main">
    <div class="container"> 
      <div class="button-switch-page">
        <div>
        <select 
          size="1" 
          class="select-box" 
          v-model="sort" 
          @change='selectSort'
        >
          <option
            v-for="options in sortChoices"
            :value='options.value' 
            :key="options.name"
            >{{ options.name }}
          </option>
        </select>
        <select 
          size="1" 
          class="select-box" 
          v-model="withGenre"  
          @change='selectGenre'
          >
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
        <Pagination :pageNumber="pageNumber" />
      </div>
      <li 
        v-for="item in movieList.slice(this.part*10,this.part*10+10)" 
        v-bind:key="item.id"
        >
          <MovieCard :item="item"/>
      </li>
      <Pagination :pageNumber="pageNumber" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import Pagination from './../components/Pagination.vue';
import MovieCard from './../components/MovieCard.vue';
import functions from './../mixins/sharedFunctions.vue';

@Component({components: {Pagination, MovieCard}})
export default class HomePage extends Vue {
  private movieList: any = [];
  private pageNumber: number = 1;
  private part: number = 0;
  private sort: string = 'popularity.desc';
  private allGenres: object[] = [];
  private withGenre: string = '';
  private sortChoices: object[] = functions.data.sortChoices;

  @Watch('pageNumber')
  @Watch('part')
  private scrollTop() {
    window.scrollTo(0, 0);
  }

  private selectGenre() {
    this.part = 0;
    this.pageNumber = 1;
    this.setMovies();
  }

  private selectSort() {
    this.part = 0;
    this.pageNumber = 1;
    this.setMovies();
  }

  private async setMovies() {
    const filters = {
      pageNumber: this.pageNumber,
      sort: this.sort,
      withGenre: this.withGenre,
      };
    await this.$store.dispatch('retrieveMovies', filters);
    this.movieList = this.$store.getters.getMovies;
  }

  private async retrieveGenres() {
    await this.$store.dispatch('retrieveGenres');
    this.allGenres = await this.$store.getters.getGenres;
  }

  private getGenreQuery() {
    const genreQuery = (this.$router as any).history.current.query.genre_id;
    if (genreQuery) {
      this.withGenre = genreQuery;
    }
  }

  private mounted() {
    this.getGenreQuery();
    this.retrieveGenres();
    this.setMovies();
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
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
div {
line-break: auto;
}
.main {
  display: flex;
  justify-content: center;
  margin-bottom: 150px;
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
  background-position: center 0 ;
  background-repeat: no-repeat;
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
@media screen and (max-width: 600px)
and (max-device-width : 768px)  {
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
