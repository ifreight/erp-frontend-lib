<template>
  <div class="container-dropdown-view">
    <div class="tw:relative">
      <i-button @click="dropdownVisible = !dropdownVisible" class="tw:w-[200px]">
        Show Dropdown Bottom
      </i-button>
      <i-dropdown :visible="dropdownVisible">
        <div>halo 1</div>
        <div>halo 2</div>
        <div>halo 3</div>
      </i-dropdown>
    </div>
    <div class="tw:fixed tw:bottom-2">
      <div class="tw:relative">
        <i-button @click="dropdownVisible2 = !dropdownVisible2" class="tw:w-[250px]">
          Show Dropdown Top + hide when click outside
        </i-button>
        <i-dropdown v-model:visible="dropdownVisible2">
          <div>halo 1</div>
          <div>halo 2</div>
          <div>halo 3</div>
        </i-dropdown>
      </div>
    </div>
    <div class="tw:relative tw:mt-5">
      <i-button @click="dropdownVisible3 = !dropdownVisible3" class="tw:w-[220px]">
        Dropdown without arrow
      </i-button>
      <i-dropdown :visible="dropdownVisible3" :isShowArrow="false">
        <div>halo 1</div>
        <div>halo 2</div>
        <div>halo 3</div>
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
    const dropdownVisible2 = ref(false);
    const dropdownVisible3 = ref(false);

    return {
      dropdownVisible,
      dropdownVisible2,
      dropdownVisible3,
    };
  },
};
</script>

<style scss>
@reference "@/assets/global.css";

.container-dropdown-view {
  @apply tw:h-full;
}
</style>
