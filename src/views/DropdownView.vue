<template>
  <div class="container-dropdown-view">
    <div class="tw:relative tw:w-fit">
      <ic-filter-bars @click="dropdownVisible = !dropdownVisible" class="tw:cursor-pointer" />
      <i-dropdown v-model:visible="dropdownVisible" width="200px">
        <div>halo 1</div>
        <div>halo 2</div>
        <div>halo 3</div>
      </i-dropdown>
    </div>
    <div class="tw:fixed tw:bottom-2">
      <div class="tw:relative">
        <i-button @click="dropdownVisible2 = !dropdownVisible2" class="tw:w-[400px]">
          Show Dropdown Top + hide when click outside + :isShowArrow="false"
        </i-button>
        <i-dropdown v-model:visible="dropdownVisible2" :isShowArrow="false">
          <div>halo 1</div>
          <div>halo 2</div>
          <div>halo 3</div>
        </i-dropdown>
      </div>
    </div>
    <div class="tw:flex tw:justify-between">
      <div class="tw:relative tw:mt-5">
        <i-button @click="dropdownVisible3 = !dropdownVisible3" class="tw:w-[220px]">
          Dropdown custom width
        </i-button>
        <i-dropdown :visible="dropdownVisible3" width="400px">
          <div>halo 1</div>
          <div>halo 2</div>
          <div>halo 3</div>
        </i-dropdown>
      </div>
      <div class="tw:relative tw:mt-5">
        <i-button @click="dropdownVisible4 = !dropdownVisible4" class="tw:w-[250px]">
          Dropdown + right space 0 + custom width
        </i-button>
        <i-dropdown :visible="dropdownVisible4" width="400px">
          <div>halo 1</div>
          <div>halo 2</div>
          <div>halo 3</div>
        </i-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import IButton from '@/components/i-button.vue';
import IDropdown from '@/components/dropdown/i-dropdown.vue';
import IcFilterBars from '@/icons/ic-filter-bars.vue';

export default {
  components: {
    IButton,
    IDropdown,
    IcFilterBars,
  },
  setup() {
    const dropdownVisible = ref(false);
    const dropdownVisible2 = ref(false);
    const dropdownVisible3 = ref(false);
    const dropdownVisible4 = ref(false);

    return {
      dropdownVisible,
      dropdownVisible2,
      dropdownVisible3,
      dropdownVisible4,
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
