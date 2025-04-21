<template>
  <div class="tw:flex tw:h-dvh">
    <div class="tw:bg-gray-100 tw:h-full tw:w-1/5">
      <h2 class="tw:text-center tw:mb-2 tw:font-bold">Menu</h2>
      <div class="tw:flex tw:flex-col">
        <router-link to="/">home</router-link>
        <router-link to="/input">input</router-link>
        <router-link to="/button">button</router-link>
        <router-link to="/textarea">textarea</router-link>
        <router-link to="/dialog">dialog</router-link>
        <router-link to="/tabs">tabs</router-link>
        <router-link to="/dropdown">dropdown</router-link>
        <router-link to="/input-tel">tel input</router-link>
        <router-link to="/radio">radio</router-link>
        <router-link to="/checkbox">checkbox</router-link>
        <router-link to="/pagination">pagination</router-link>
      </div>
    </div>
    <div class="tw:flex-1 tw:py-5 tw:px-6">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>
