<template>
  <div class="home card">
    <div class="sub-menu">
      <router-link to="/vite-sub/home">home</router-link>
      <router-link to="/vite-sub/dialog">dialog</router-link>
      <router-link to="/vite-sub/location">location</router-link>
      <router-link to="/vite-sub/contact">contact</router-link>
    </div>
    <img class="home-bg" src="@/assets/images/welcome.png" alt="welcome" />
  </div>
</template>

<script setup lang="ts" name="home"></script>

<style scoped lang="scss">
@import "./index.scss";
</style>
