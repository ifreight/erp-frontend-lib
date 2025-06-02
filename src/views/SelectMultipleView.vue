<template>
  <div>
    <div class="tw:mb-5">Select Multiple</div>
    <div class="tw:flex tw:gap-5">
      <div class="tw:w-1/2">
        <div class="tw:bg-yellow-800">is-normal-select-mode = false</div>
        <div>Multiple First Type</div>
        <div class="tw:mb-4 tw:w-[275px]">
          <span class="tw:text-red-600 tw:text-xs">v-model: {{ select10 }}</span>
          <div class="tw:text-xs">selectedOptions: {{ selectedOptions10 }}</div>
          <div class="tw:border tw:rounded-md">
            <i-select-multiple
              v-model="select10"
              v-model:value-option="selectedOptions10"
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
              :showInputArrow="false"
              noDataText="Custom no data text"
              @change="changeHandler"
            >
              <template #prepend><ic-search class="tw:text-gray-700" /></template>
            </i-select-multiple>
          </div>
        </div>

        <div>Multiple When Clicked</div>
        <div class="tw:mb-4 tw:w-[275px] tw:relative">
          <span class="tw:text-red-600 tw:text-xs">v-model: {{ select11 }}</span>
          <div class="tw:text-xs">selectedOptions: {{ selectedOptions11 }}</div>

          <i-button @click="dropdownVisible3 = !dropdownVisible3">Click Me</i-button>
          <i-dropdown :visible="dropdownVisible3" :isShowArrow="false" rounded="lg">
            <i-select-multiple
              v-model="select11"
              v-model:value-option="selectedOptions11"
              inputId="Select-11"
              name="select-11"
              label="Select"
              size="sm"
              rounded="lg"
              checkbox-color="gray-500"
              placeholder="Cari..."
              dropdown-max-height="128px"
              :options="selectStaticOptions"
              :filterable="true"
              :showInputArrow="false"
            >
              <template #prepend><ic-search class="tw:text-gray-700" /></template>
            </i-select-multiple>
          </i-dropdown>
        </div>
      </div>
      <div class="tw:w-1/2">
        <div class="tw:bg-yellow-800">is-normal-select-mode = true</div>
        <div>Multiple Normal Select + Filterable + init value</div>
        <span class="tw:text-red-600 tw:text-xs">v-model: {{ select12 }}</span>
        <div class="tw:text-xs">selectedOptions: {{ selectedOptions12 }}</div>

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
            :options="selectStaticOptions2"
            :filterable="true"
            :is-normal-select-mode="true"
          >
          </i-select-multiple>
        </div>

        <div>Multiple Normal Select Without Filter</div>
        <span class="tw:text-red-600">v-model: {{ select13 }}</span>
        <div class="tw:text-xs">selectedOptions: {{ selectedOptions13 }}</div>

        <div class="tw:mb-4 tw:w-[275px] tw:relative">
          <i-select-multiple
            v-model="select13"
            v-model:value-option="selectedOptions13"
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
            :is-normal-select-mode="true"
          >
          </i-select-multiple>
        </div>

        <div>Remote Mode + invalid + err message</div>
        <span class="tw:text-red-600">v-model: {{ select14 }}</span>
        <div class="tw:text-xs">selectedOptions: {{ selectedOptions14 }}</div>

        <div class="tw:mb-4 tw:w-[275px] tw:relative">
          <i-select-multiple
            v-model="select14"
            v-model:value-option="selectedOptions14"
            input-id="Select-14"
            name="select-14"
            label="Select"
            size="sm"
            rounded="lg"
            checkbox-rounded="sm"
            checkbox-color="gray-500"
            placeholder="Cari..."
            dropdown-max-height="128px"
            :is-normal-select-mode="true"
            remote
            :remote-method="selectRemoteMethod"
            :invalid="true"
            error-message="contoh error"
          >
          </i-select-multiple>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import IcSearch from '@/icons/ic-search.vue';

import IButton from '@/components/i-button.vue';
import IDropdown from '@/components/dropdown/i-dropdown.vue';

import ISelectMultiple from '@/components/i-select-multiple.vue';

export default {
  components: {
    IcSearch,
    IButton,
    IDropdown,
    ISelectMultiple,
  },
  setup() {
    const select10 = ref([]);
    const select11 = ref([]);
    const select12 = ref([1, 2, 3, 4, 5, 6, 7, 8]);
    const select13 = ref([]);
    const select14 = ref([1, 2, 3, 4]);

    const selectedOptions10 = ref([]);
    const selectedOptions11 = ref([]);
    const selectedOptions12 = ref([]);
    const selectedOptions13 = ref([]);
    const selectedOptions14 = ref([]);

    const dropdownVisible3 = ref(false);

    const selectStaticOptions = computed(() => {
      return ['Asia', 'America', 'Europe', 'Indonesia', 'India', 'Japan', 'Korea', 'Others'];
    });

    const selectStaticOptions2 = computed(() => {
      return [
        {
          id: 1,
          name: 'Asia',
        },
        {
          id: 2,
          name: 'America',
        },
        {
          id: 3,
          name: 'Europe',
        },
        {
          id: 4,
          name: 'Indonesia',
        },
        {
          id: 5,
          name: 'India',
        },
        {
          id: 6,
          name: 'Japan',
        },
        {
          id: 7,
          name: 'England',
        },
        {
          id: 8,
          name: 'Uganda',
        },
      ];
    });

    const selectRemoteMethod = async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            { id: 1, name: 'Asia' },
            { id: 2, name: 'America' },
            { id: 3, name: 'Europe' },
            { id: 4, name: 'Others' },
          ]);
        }, 1000);
      });
    };

    const changeHandler = (e) => {
      alert('handle change', e);
    };

    return {
      select10,
      select11,
      select12,
      select13,
      select14,
      selectedOptions10,
      selectedOptions11,
      selectedOptions12,
      selectedOptions13,
      selectedOptions14,
      selectRemoteMethod,
      selectStaticOptions,
      selectStaticOptions2,
      dropdownVisible3,
      changeHandler,
    };
  },
};
</script>
