<template>
  <div class="container-dropdown-view">
    <div class="relative">
      <i-button
        @click="dropdownVisible = !dropdownVisible"
        class="tw:w-2.5"
      >
        Click Here
      </i-button>
      <i-dropdown :visible="dropdownVisible">
        <div>
          halo 1
        </div>
        <div>
          halo 2
        </div>
        <div>
          halo 3
        </div>
      </i-dropdown>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import IButton from '@/components/i-button.vue';
import IDropdown from '@/components/dropdown/i-dropdown.vue';

export default {
  components: {
    IButton,
    IDropdown,
  },
  setup() {
    const dropdownVisible = ref(false);

    return {
      dropdownVisible
    }
  }
}
</script>

<style scss>
@reference "@/assets/global.css";

.container-dropdown-view {
  @apply tw:h-full;
}
</style>
