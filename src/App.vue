<template>
  <div class="tw:flex tw:min-h-dvh">
    <div class="tw:bg-gray-100 tw:min-h-full tw:w-1/5 tw:pl-2">
      <h2 class="tw:text-center tw:mb-2 tw:font-bold">Menu</h2>
      <div class="tw:flex tw:flex-col">
        <router-link to="/" class="tw:font-bold tw:mb-3">home</router-link>
        <router-link to="/alert">alert</router-link>
        <router-link to="/button">button</router-link>
        <router-link to="/checkbox">checkbox</router-link>
        <router-link to="/chip">chip</router-link>
        <router-link to="/datepicker">date picker</router-link>
        <router-link to="/dialog">dialog</router-link>
        <router-link to="/dropdown">dropdown</router-link>
        <router-link to="/file-list">file list</router-link>
        <router-link to="/icons">icons</router-link>
        <router-link to="/input">input</router-link>
        <router-link to="/multiple-input">multiple input</router-link>
        <router-link to="/multiple-select">multiple select</router-link>
        <router-link to="/pagination">pagination</router-link>
        <router-link to="/popover">popover</router-link>
        <router-link to="/progress-bar">progress bar</router-link>
        <router-link to="/radio">radio</router-link>
        <router-link to="/select">select</router-link>
        <router-link to="/sort-caret">sort caret</router-link>
        <router-link to="/sticky-bar">sticky bar</router-link>
        <router-link to="/suggestion">suggestion</router-link>
        <router-link to="/table">table</router-link>
        <router-link to="/tabs">tabs</router-link>
        <router-link to="/textarea">textarea</router-link>
        <router-link to="/input-tel">tel input</router-link>
        <router-link to="/upload">upload</router-link>
      </div>
    </div>
    <div class="tw:flex-1 tw:py-5 tw:px-6">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>
