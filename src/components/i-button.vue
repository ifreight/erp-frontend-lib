<template>
  <button class="i-button ">
    <slot>Click me</slot>
  </button>
</template>

<style>
.i-button {
  @reference "tailwindcss";

  @apply bg-amber-700;
  padding: 10px 20px;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
