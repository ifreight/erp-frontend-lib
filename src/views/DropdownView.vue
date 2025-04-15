<template>
  <div class="container-dropdown-view">
    <div class="tw:relative">
      <i-button
        @click="clickHere"
        class="tw:w-[200px]"
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
    const clickHere = (() => {
      dropdownVisible.value = !dropdownVisible.value;
    })
    return {
      dropdownVisible,
      clickHere,
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
