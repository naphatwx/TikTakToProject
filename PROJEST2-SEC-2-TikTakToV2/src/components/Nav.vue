<script setup>
import { RouterLink } from "vue-router"
</script>

<template>
  <div class="w-full">
    <div class="bg-yellow-400  border-b-2 border-black p-2 opacity-85">
      <RouterLink :to="{ name: 'AccountManagement' }" active-class="active" class="m-3 text-xl font-extrabold">ACCOUNT</RouterLink>
      |
      <RouterLink :to="{ name: 'Slot' }" active-class="active" class="m-3 text-xl font-extrabold">SLOT</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.active {
  color: white;
  background-color: black;
  padding: 4px;
  border-radius: 4px;
}
</style>
