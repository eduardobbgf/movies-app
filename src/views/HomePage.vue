<template>
      <div class="main">
        <MovieCard/>
      </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';
import DataService from './../services/DataService';
import MovieCard from './../components/MovieCard.vue';
@Component({
  components: {
    MovieCard,
  },
})
export default class HomePage extends Vue {
  @Prop() private msg!: string;
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
.main {
  display: flex;
  justify-content: center;
  margin-bottom: 150px;
}
</style>
