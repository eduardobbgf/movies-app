<template>
<div class="navbar">
    <a href="/">Home</a>
    <a href="/categories">Categories</a>
    <a href="/random-page">Random Page</a>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import router from './../router';

@Component
export default class Navbar extends Vue {
}
</script>
<style>
.navbar {
  min-height: 5vh;
  background-color: #333;
  position: fixed;
  top: 0;
  width: 100%;
}
.navbar a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 12px 14px;
  text-decoration: none;
  font-size: 17px;
}
.navbar a:hover {
  background: #ddd;
  color: black;
}
@media screen and (max-width: 600px) {
  .navbar.responsive {
    position: relative;
    }
  .navbar.responsive .icon {
    position: absolute;
    right: 0;
    top: 0;
  }
  .navbar.responsive a {
    float: none;
    display: block;
    text-align: left;
  }
}
</style>
