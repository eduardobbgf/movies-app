<template>
    <div class="movie-paper">
        <a :href='"/detail-page/" + item.id'>
            <div
            class="movie-poster"  
            :style="{ backgroundImage: mixinsFuncs.getPoster(item.poster_path),
                            height: mixinsFuncs.giveHeights(item.title.length)}" 
            v-bind="item"
            ></div>
            <div class="movie-title">
                <div>
                {{ item.title }}
                </div>
                <div>
                {{ item.release_date  ? item.release_date.slice(0,4) :
                "No release date" }}
                </div>
            </div>
        </a>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import functions from './../mixins/sharedFunctions.vue';

@Component
export default class MovieCard extends Vue {
  @Prop() private item!: any;
  private mixinsFuncs = functions.methods;

}
</script>

<style scoped>

a {
  text-decoration: none;
}
.movie-paper {
  padding: 0;
  width: 300px;
  height: 420px;
  margin: 15px 0;
  border-radius: 10px;
  background-color: white;
  border: none;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15)
}
.movie-poster {
  border-radius: 10px 10px 0 0;
  background-size: cover;
  background-position: center 0 ;
  background-repeat: no-repeat;
  margin: 0;
}
.movie-title {
  margin: 10px 8px;
  padding: 0 15px;
  word-break: keep-all;
}
</style>
