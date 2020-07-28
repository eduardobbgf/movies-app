<template>
  <div id="app">
      <div class="navbar">
        <a href="/">Home</a>
        <a href="/categories">Categories</a>
        <a href="/random-page">Random Page</a>
      </div>
    <router-view/>
  </div>
</template>

import
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.navbar {
  overflow: hidden;
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
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}
.main {
  padding: 16px;
  margin-top: 30px;
}
.navbar a:hover {
  background: #ddd;
  color: black;
}
</style>
