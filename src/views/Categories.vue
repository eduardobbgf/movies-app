<template>
    <div class="main">
      <div class="container"> 
        <div class="page-title">Movies categories</div>
        <li 
          v-for="item in allGenres" 
          v-bind:key="item.id"
          >
          <div class="genre-paper"> 
            <a :href='"/?genre_id=" + item.id'>
              <div class="genre-name">
                <div>
                  {{ item.name }}
                </div>
              </div>
            </a>
          </div>
        </li>
      </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Categories extends Vue {
  private allGenres = [];

  private async retrieveGenres() {
    await this.$store.dispatch('retrieveGenres');
    this.allGenres = await this.$store.getters.getGenres;
  }
  private mounted() {
    this.retrieveGenres();
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}
li {
  display: inline-block;
  margin: 0 10px;
}
.genre-paper {
  justify-content: flex-start;
  height: 50px;
  width: 200px;
  border: none;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  padding: 16px 0;
  margin: 40px;
}
.genre-paper:hover {
    background-color: rgba(151, 150, 150, 0.15);
}
.container {
  padding: 30px;
  max-width: 1600px;
}
.main {
  display: flex;
  justify-content: center;
  margin-bottom: 150px;
}
.page-title {
  font-size: 36px;
}
</style>
