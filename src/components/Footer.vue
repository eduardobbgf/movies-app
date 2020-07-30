<template>
      <section class="footer-info">
        <div class="footer-itens">
          <div 
            v-for="route in routes" 
            :key="route.name"
            >
            <a 
            :href="route.path"
            v-show="!route.path.includes(':')"
            >{{ route.name }}</a>
          </div>
        </div>
        <div class="footer-itens">
          Developed By:
            <a  href="https://github.com/EduardoBBGusmao">
              <div class="github"></div>
            </a>
        </div>   
        <div class="footer-itens">
          Powered By:
            <a  href="https://www.themoviedb.org">
              <div class="tmdb"></div>
            </a>     
        </div>
      </section>
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
  text-decoration: none;
  color: white;
}
.footer-info {
  display: flex;
  flex-wrap: wrap;
  justify-content:center;
}
.footer-itens {
  margin: 15px 20px;
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

</style>
