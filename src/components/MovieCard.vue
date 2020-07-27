<template>
      <div>
        <img :src="getPoster(item.poster_path)" v-bind="item" height=100/>
        <div>
         {{ item.title }}
        </div>
        <div>
         {{ item.release_date }}
        </div>
      </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class MovieCard extends Vue {
  @Prop() private item!: object;
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
</style>
