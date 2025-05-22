<template>
  <div class="tw:grid tw:grid-cols-6 tw:gap-2">
    <div
      class="tw:w-auto tw:text-center tw:border tw:p-2 tw:rounded-2xl"
      v-for="(icon, key) in iconComponents"
      :key="icon.name"
    >
      <component class="tw:w-[50px] tw:h-[50px] tw:m-auto" :is="icon"></component>
      <p>{{ key }}</p>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent, defineComponent } from 'vue';
const icons = import.meta.glob(`../icons/*.vue`);
const iconComponents = {};
Object.entries(icons).forEach(([path]) => {
  // Get name of component, based on filename
  // "./components/Fruits.vue" will become "Fruits"
  const componentName = path
    .split('/')
    .pop()
    .replace(/\.\w+$/, '');

  // Register component on this Vue instance
  iconComponents[componentName] = defineAsyncComponent(() => import(/* @vite-ignore */ path));
});

export default defineComponent({
  components: { ...iconComponents },
  setup() {
    return {
      iconComponents,
    };
  },
});
</script>
