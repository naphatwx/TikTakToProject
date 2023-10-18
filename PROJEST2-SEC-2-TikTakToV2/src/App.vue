<script setup>

import {RouterView} from 'vue-router'
import Nav from './components/Nav.vue'

</script>

<template>
  <div>
    <!-- <AccountManagement/> -->
    <Nav  />
    <RouterView />
  </div>
  <!-- <Login /> -->
</template>

<style>
/* html {
  width: fit-content;
  min-width: 100%;
} */
::-webkit-scrollbar {
    width: 8px;
}

/* Track */
::-webkit-scrollbar-track {
    /* box-shadow: inset 0 0 5px grey;  */
    border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: gray;
    border-radius: 10px;
}
</style>