<template>
  <div>
    <div id="app">
      <Navbar/>
      <router-view/>
    </div>
    <div class="footer">
      <Footer/>
    </div>
  </div>
</template>

<script lang="ts">
import Footer from './components/Footer.vue';
import Navbar from './components/Navbar.vue';
import { Component, Prop, Vue } from 'vue-property-decorator';
import router from './router';

@Component({
  components: {
    Footer,
    Navbar,
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
  justify-content: center;
  padding: 35px 0;
  flex: 1;
}
.footer {
  background-color: #333333;
  clear: both;
  position: relative;
  width: 100%;
  height: 100px;
  margin-top: -100px;
} 
@media screen and (max-width: 600px) {
  
.footer {
  margin-top: 80px;
} 
}
</style>
