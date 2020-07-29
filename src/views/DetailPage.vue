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
        <div class="movie-box-recom">
            <div class="movie-recom-title">
                Recommendation based on this movie
            </div>
            <section class="movie-box-recom" >
                <template v-for='item in recom' >
                <a
                    id="movie-poster-options"  
                    :style="{ backgroundImage: 'url(' + getPoster(item.poster_path) + ')'}" 
                    :href='"/detail-page/" + item.id'
                    :key="item.id"
                    ></a>
                </template>
            </section>
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
  private data: any = {};
  private collection: any = {};
  private recom: any = [];
  private movie_id: string = (this.$router as any).history.current.params.movie_id;
  private sort: string = 'popularity.desc';

  private compare( a: any, b: any ) {
    if ( a.last_nom < b.last_nom ) {
        return -1;
    }
    if ( a.last_nom > b.last_nom ) {
        return 1;
    }
    return 0;
    }

  private collectionRecommended() {
        const index = this.collection.parts.map((e: any) => e.id).indexOf(this.data.id);
        this.collection.parts.splice(index, 1);
        const parts = this.collection.parts;
        if (parts.length > 2) {
            if (index === parts.length) {
                this.recom = parts.slice(0, 3);

            } else if (index === parts.length - 1) {
                this.recom.push(parts[parts.length - 1]);
                this.recom.push(parts[0]);
                this.recom.push(parts[1]);

            } else if (index === parts.length - 2) {
                this.recom.push(parts[parts.length - 2]);
                this.recom.push(parts[parts.length - 1]);
                this.recom.push(parts[0]);

            } else {
                this.recom = parts.slice(index, 3 + index);
            }
        } else if (parts.length <= 2) {
            this.recom = parts;
            this.recommendMovies(3 - parts.length);
        }
  }

  private recommendMovies(moviesNum: number) {
    console.log('newMovies', moviesNum);
    const genresId = this.data.genres.map((genre: any ) => genre.id).toString();
    DataService.getAll(1, 'popularity.desc', genresId)
        .then((response) => {
            const recommended = JSON.parse(JSON.stringify(response.data)).results;
            if (!recommended) {
                return;
            }
            const index = recommended.map((e: any) => e.id).indexOf(this.data.id);
            let indexRecommended = 0;
            let x = moviesNum;
            if (index > -1) {
                recommended.splice(index, 1);
                }
            console.log(recommended[0]);
            if (this.collection) {
                while (x !== 0) {
                    const recommendedMovie = recommended[indexRecommended];

                    if (this.collection.parts.map((e: any) => e.id).indexOf(recommendedMovie.id) === -1) {
                        this.recom.push(recommendedMovie);
                        x--;
                    }
                    indexRecommended++;
                }
            } else {
                for (let i = 0; i < moviesNum; i++) {
                    this.recom.push(recommended[i]);
                }
            }
         })
        .catch((e) => {
            console.log(e);
        });
  }
  private retrieveCollections() {
    if (this.data.belongs_to_collection) {
    DataService.getCollection(this.data.belongs_to_collection.id)
        .then((response) => {
            this.collection = JSON.parse(JSON.stringify(response.data));
            this.collectionRecommended();
         })
        .catch((e) => {
            console.log(e);
        });
    }  else {
        this.recommendMovies(3);
    }
  }
  private retrieveMovies() {
    DataService.get(this.movie_id)
      .then((response) => {
        this.data = JSON.parse(JSON.stringify(response.data));
        if (this.data.belongs_to_collection != null) {
            this.retrieveCollections();
        } else {
            this.collection = null;
            this.recommendMovies(3);
        }
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
.movie-box-recom {
  display: flex;
  flex-wrap: wrap;
  justify-content:center;
  width: 100%;
  background-color: #e8e8e8;
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
.movie-recom-title {
  margin-top: 15px;
  font-size: 24px;
}
</style>
