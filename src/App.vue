<template>
  <div id="app">
    <div class="navbar">
      <a href="/">Home</a>
      <a href="/categories">Categories</a>
      <a href="/random-page">Random Page</a>
    </div>
    <div class="teste">
      <router-view/>
    </div>
    <div class="footer">
      <Footer/>
    </div>
  </div>
</template>

<script lang="ts">
import Footer from './components/Footer.vue';
import { Component, Prop, Vue } from 'vue-property-decorator';
import router from './router';

@Component({
  components: {
    Footer,
  },
})
export default class App extends Vue {
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  flex: 1;
}
.navbar {
  overflow: hidden;
  background-color: #333;
  position: fixed;
  top: 0;
  width: 100%;
}
.navbar a {
  min-height: 5vh;
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}
.navbar a:hover {
  background: #ddd;
  color: black;
}
.footer {
  min-height: 11.5vh;
  background-color: #333333;
  margin-top: 50px;
}
.teste {
  min-height: 80vh;
}
</style>
