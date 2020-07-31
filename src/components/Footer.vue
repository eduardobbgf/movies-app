<template>
  <footer class="footer">
      <section class="footer-info">
        <div class="footer-itens-sitemap">
          <span class="sitemap">
            Sitemap
          </span>
          <div 
            v-for="route in routes" 
            :key="route.name"
            class="sitemap-routes"
            >
            <a 
            :href="route.path"
            v-show="!route.path.includes(':')"
            >{{ route.name }}</a>
          </div>
        </div>
        <div class="footer-itens">
          <div>
          Developed By:
            <a  href="https://github.com/EduardoBBGusmao">
              <div class="github"></div>
            </a>
          </div>
          <div>
          Powered By:
            <a  href="https://www.themoviedb.org">
              <div class="tmdb"></div>
            </a>    
          </div> 
        </div>
      </section>
  </footer>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';
import DataService from './../services/DataService';
import router from './../router';

@Component
export default class Footer extends Vue {
  private routes: any = (this.$router as any).options.routes;
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

a {
  font-size: 10px;
  text-decoration: none;
  color: white;
}

a:hover{
  text-decoration: underline;
  color: black;
}

.footer {
  background-color: #333333;
  flex-wrap: wrap;
  min-height: 50px;
  margin-top: -50px;
} 
.footer-info {
  background-color: #333333;

  display: flex;
  flex-wrap: wrap;
  justify-content:space-around;
}
.footer-itens {
  margin: 25px;
  color: white;
  font-size: 10px;
  width: 300px;
  display: flex;
  justify-content:space-evenly;
  flex-wrap: wrap;

}
.footer-itens-sitemap {
  margin: 25px;
  color: white;
}
.github {
  background-image: url('./../assets/GitHub-Mark-Light-120px-plus.png');
  justify-content: center;
  background-size: cover;
  height: 50px;
  width: 50px;
}
.tmdb {
  background-image: url('./../assets/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg');
  justify-content: center;
  background-size:auto;
  background-repeat: no-repeat;
  height: 50px;
  width: 50px;
}
.sitemap {
  font-size: 12px;
}
</style>
