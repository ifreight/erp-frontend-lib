<template>
  <div
    class="i-tab-pane"
    :class="{ active: isActive }"
  >
    <slot v-if="isActive" />
  </div>
</template>

<script>
import { inject, computed } from 'vue';

export default {
  name: 'ITabPane',
  props: {
    label: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const tab = inject('rootTab');
    const isActive = computed(() => {
      return tab.value === props.name;
    });

    return {
      tab,
      isActive,
    };
  },
};
</script>

<style>
@reference "@/assets/global.css";

.i-tab-pane {
  @apply tw:hidden;

  &.active {
    @apply tw:block;
  }
}
</style>
