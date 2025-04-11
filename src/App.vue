<template>
  <div class="flex h-dvh">
    <div class="bg-gray-100 h-full w-1/5">
      <h2 class="text-center mb-2 font-bold">Menu</h2>
      <div class="flex flex-col">
        <router-link to="/">home</router-link>
        <router-link to="/input">input</router-link>
        <router-link to="/button">button</router-link>
        <router-link to="/tabs">tabs</router-link>
        <router-link to="/radio">radio</router-link>
        <router-link to="/checkbox">checkbox</router-link>
      </div>
    </div>
    <div class="flex-1 py-5 px-6">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>
