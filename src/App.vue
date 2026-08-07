<script setup>
import {RouterView} from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style>


* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}

#app {
  width: 100%;
  min-height: 100vh;
  background: url('./assets/logo.png') center/cover no-repeat,
  radial-gradient(
    ellipse at center,
    #130348 0%,
    #07072C 100%
  );
}
</style>
