<template>
  <div class="i-tab-pane">
    <slot v-if="isActive" />
  </div>
</template>

<script>
import { inject } from 'vue'; // computed

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
  },
  setup() { // props
    const tab = inject('rootTab');
    // const isActive = computed(() => tab.activeTab === props.name);

    return {
      tab,
      // isActive
    }
  },
}
</script>