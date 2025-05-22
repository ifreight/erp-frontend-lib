<template>
  <div>
    <div class="tw:mb-5">
      Select Multiple
    </div>

    <div>Multiple First Type</div>
    <div class="tw:mb-4 tw:w-[275px]">
      <span class="tw:text-red-600">v-model: {{ select10 }}</span>
      <i-select-multiple
        v-model="select10"
        v-model:value-option="selectedOptions"
        input-id="Select-10"
        name="select-10"
        label="Select"
        size="sm"
        rounded="lg"
        placeholder="Cari..."
        dropdown-max-height="128px"
        :options="selectStaticOptions"
        :visibleDefault="true"
        :filterable="true"
        :multiple="true"
      />
    </div>

    <div>Multiple When Clicked</div>
    <div class="tw:mb-4 tw:w-[275px] tw:relative">
      <i-button @click="dropdownVisible3 = !dropdownVisible3">v-model: {{ select11 }}</i-button>
      <i-dropdown
        :visible="dropdownVisible3"
        :isShowArrow="false"
      >
        <i-select-multiple
          v-model="select11"
          v-model:value-option="selectedOptions"
          input-id="Select-11"
          name="select-11"
          label="Select"
          size="sm"
          rounded="lg"
          placeholder="Cari..."
          dropdown-max-height="128px"
          :options="selectStaticOptions"
          :visibleDefault="true"
          :filterable="true"
          :multiple="true"
        >
        </i-select-multiple>
      </i-dropdown>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import IButton from '@/components/i-button.vue';
import IDropdown from '@/components/dropdown/i-dropdown.vue';

import ISelectMultiple from '@/components/i-select-multiple.vue';

export default {
  components: {
    IButton,
    IDropdown,
    ISelectMultiple,
  },
  setup() {
    const select10 = ref([]);
    const select11 = ref([]);
    const selectedOptions = ref([]);
    const selectRemote = ref([]);
    const dropdownVisible3 = ref(false);

    const selectStaticOptions = computed(() => {
      return ['Asia', 'America', 'Europe', 'Indonesia', 'India', 'Japan', 'Korea', 'Others'];
    });

    return {
      select10,
      select11,
      selectedOptions,
      selectRemote,
      selectStaticOptions,
      dropdownVisible3,
    }
  },
}
</script>
