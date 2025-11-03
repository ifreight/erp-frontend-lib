<template>
  <div class="container-dropdown-view">
    <i-dropdown
      v-model:visible="newDropdownVisible"
      width="200px"
      preferenceXPosition="right"
      triggerDisplay="inline-block"
    >
      <ic-filter-bars @click="newDropdownVisible = !newDropdownVisible" class="tw:cursor-pointer" />
      <template #dropdown>
        <div>halo 1</div>
        <div>halo 2</div>
        <div>halo 3</div>
      </template>
    </i-dropdown>
    <div class="tw:fixed tw:bottom-2">
      <i-dropdown
        v-model:visible="dropdownVisible2"
        width="200px"
        :isShowArrow="false"
        rounded="lg"
        :appendToBody="true"
      >
        <i-button @click="dropdownVisible2 = !dropdownVisible2" class="tw:w-[400px]">
          Show Dropdown Top + hide when click outside + :isShowArrow="false" + append to body
        </i-button>
        <template #dropdown>
          <div>halo 1</div>
          <div>halo 2</div>
          <div>halo 3</div>
        </template>
      </i-dropdown>
    </div>
    <div class="tw:fixed tw:bottom-2 tw:right-0">
      <i-dropdown
        v-model:visible="newDropdownVisible4"
        width="200px"
        rounded="lg"
        borderless
        :appendToBody="true"
        preferenceXPosition="right"
      >
        <i-button @click="newDropdownVisible4 = !newDropdownVisible4" class="tw:w-[400px]">
          Borderless + Show Dropdown Top + hide when click outside + append to body
        </i-button>
        <template #dropdown>
          <div>halo 1</div>
          <div>halo 2</div>
          <div>halo 3</div>
        </template>
      </i-dropdown>
    </div>

    <div class="tw:flex tw:justify-between tw:mt-4">
      <div>
        <i-dropdown :visible="newDropdownVisible3" width="400px" :isShowArrow="false">
          <i-button @click="newDropdownVisible3 = !newDropdownVisible3" class="tw:w-[220px]">
            Dropdown custom width : arrow false
          </i-button>
          <template #dropdown>
            <div>halo 1</div>
            <div>halo 2</div>
            <div>halo 3</div>
          </template>
        </i-dropdown>
      </div>
      <div>
        <i-dropdown v-model:visible="newDropdownVisible2" width="400px">
          <i-button @click="newDropdownVisible2 = !newDropdownVisible2" class="tw:w-[250px]">
            NEW Dropdown + right space 0 + custom width
          </i-button>
          <template #dropdown>
            <div>halo 1</div>
            <div>halo 2</div>
            <div>halo 3</div>
          </template>
        </i-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import IButton from '@/components/i-button.vue';
import IcFilterBars from '@/icons/ic-filter-bars.vue';
import IDropdown from '@/components/dropdown/i-dropdown.vue';

export default {
  components: {
    IButton,
    IcFilterBars,

    IDropdown,
  },
  setup() {
    const dropdownVisible = ref(false);
    const dropdownVisible2 = ref(false);
    const dropdownVisible3 = ref(false);
    const dropdownVisible4 = ref(false);

    const newDropdownVisible = ref(false);
    const newDropdownVisible2 = ref(false);
    const newDropdownVisible3 = ref(false);
    const newDropdownVisible4 = ref(false);

    return {
      dropdownVisible,
      dropdownVisible2,
      dropdownVisible3,
      dropdownVisible4,

      newDropdownVisible,
      newDropdownVisible2,
      newDropdownVisible3,
      newDropdownVisible4,
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
