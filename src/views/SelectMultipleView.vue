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
        checkbox-color="gray-500"
        placeholder="Cari..."
        dropdown-max-height="128px"
        :options="selectStaticOptions"
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
          checkbox-color="gray-500"
          placeholder="Cari..."
          dropdown-max-height="128px"
          :options="selectStaticOptions"
          :filterable="true"
          :multiple="true"
        >
        </i-select-multiple>
      </i-dropdown>
    </div>

    <div>Multiple Normal Select + Filterable</div>
    <span class="tw:text-red-600">v-model: {{ select12 }}</span>
    <div class="tw:mb-4 tw:w-[275px] tw:relative">
      <i-select-multiple
        v-model="select12"
        v-model:value-option="selectedOptions12"
        input-id="Select-12"
        name="select-12"
        label="Select"
        size="sm"
        rounded="lg"
        checkbox-color="gray-500"
        placeholder="Cari..."
        dropdown-max-height="128px"
        :options="selectStaticOptions"
        :filterable="true"
        :multiple="true"
        :is-normal-select-mode="true"
      >
      </i-select-multiple>
    </div>

    <div>Multiple Normal Select Without Filter</div>
    <span class="tw:text-red-600">v-model: {{ select13 }}</span>
    <div class="tw:mb-4 tw:w-[275px] tw:relative">
      <i-select-multiple
        v-model="select13"
        input-id="Select-13"
        name="select-13"
        label="Select"
        size="sm"
        rounded="lg"
        checkbox-rounded="sm"
        checkbox-color="gray-500"
        placeholder="Cari..."
        dropdown-max-height="128px"
        :options="selectStaticOptions"
        :multiple="true"
        :is-normal-select-mode="true"
      >
      </i-select-multiple>
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
    const select12 = ref([]);
    const select13 = ref([]);
    const selectedOptions = ref([]);
    const selectedOptions12 = ref([]);
    const selectRemote = ref([]);
    const dropdownVisible3 = ref(false);

    const selectStaticOptions = computed(() => {
      return ['Asia', 'America', 'Europe', 'Indonesia', 'India', 'Japan', 'Korea', 'Others'];
    });

    return {
      select10,
      select11,
      select12,
      select13,
      selectedOptions,
      selectedOptions12,
      selectRemote,
      selectStaticOptions,
      dropdownVisible3,
    }
  },
}
</script>
