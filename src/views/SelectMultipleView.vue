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
              size="sm"
              rounded="lg"
              checkbox-color="gray-500"
              placeholder="Cari..."
              dropdown-max-height="128px"
              :options="selectStaticOptions"
              :filterable="true"
              :multiple="true"
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

          <i-button @click="dropdownVisible2 = !dropdownVisible2">Click Me</i-button>
          <i-dropdown
            :visible="dropdownVisible2"
            :isShowArrow="false"
            rounded="lg"
          >
            <i-select-multiple
              v-model="select11"
              v-model:value-option="selectedOptions11"
              inputId="Select-11"
              name="select-11"
              size="sm"
              rounded="lg"
              checkbox-color="gray-500"
              placeholder="Cari..."
              dropdown-max-height="128px"
              :options="selectStaticOptions"
              :filterable="true"
            >
              <template #prepend><ic-search class="tw:text-gray-700" /></template>
            </i-select-multiple>
          </i-dropdown>
        </div>

        <div>Slot options + non filterable</div>
        <div class="tw:mb-4 tw:w-[275px] tw:relative">
          <span class="tw:text-red-600 tw:text-xs">v-model: {{ select15 }}</span>
          <div class="tw:text-xs">selectedOptions: {{ selectedOptions15 }}</div>

          <i-button @click="dropdownVisible3 = !dropdownVisible3">Click Me</i-button>
          <i-dropdown
            :visible="dropdownVisible3"
            :isShowArrow="false"
            rounded="lg"
            padding="none"
          >
            <i-select-multiple
              v-model="select15"
              v-model:value-option="selectedOptions15"
              inputId="Select-15"
              name="select-15"
              size="sm"
              rounded="lg"
              checkbox-color="gray-500"
              placeholder="Cari..."
              dropdown-max-height="128px"
              :options="selectStaticOptions2"
            >
              <template #prepend><ic-search class="tw:text-gray-700" /></template>
              <template #options="{ option }">
                <i-chip
                  :showDot="false"
                  :text="option.name"
                  :status="option.status"
                />
              </template>
            </i-select-multiple>
          </i-dropdown>
        </div>
        <div>
          <div>Show New Dropdown</div>
          <div class="tw:mb-4 tw:relative">
            <span class="tw:text-red-600 tw:text-xs">v-model: {{ select16 }}</span>
            <div class="tw:text-xs">selectedOptions: {{ selectedOptions11 }}</div>

            <i-button
              class="tw:w-[275px]"
              @click="dropdownVisible4 = !dropdownVisible4"
            >Click Me</i-button>
            <i-dropdown
              :visible="dropdownVisible4"
              :isShowArrow="false"
              rounded="lg"
              padding="none"
              :width="activeChildOption ? '550px' : '275px'"
            >
              <div class="tw:flex">
                <div class="tw:w-[275px]">
                  <i-select-multiple
                    v-model="select16"
                    v-model:value-option="selectedOptions11"
                    inputId="Select-11"
                    name="select-11"
                    size="sm"
                    rounded="lg"
                    checkbox-color="gray-500"
                    placeholder="Cari tipe transaksi..."
                    disabled
                    dropdown-max-height="128px"
                    :deactivate-wrapper-event="deactivateWrapperEvent"
                    :options="selectStaticOptions3"
                    :filterable="true"
                  >
                    <template #prepend><ic-search class="tw:text-gray-700" /></template>
                    <template #options="{ option }">
                      <div class="tw:flex tw:justify-between tw:items-center tw:pointer-events-auto">
                        <span>{{ option.name }}</span>
                      </div>
                    </template>

                    <template #optionsAppend="{ option }">
                      <div
                        class="btn-hover"
                        :class="{ 'btn-active': activeChildOption && activeChildOption.id === option.id }"
                        @click="openChildSelect(option)"
                      >
                        <span class="tw:bg-yellow-800 tw:rounded-full tw:text-[8px] tw:font-semibold tw:w-3.5 tw:h-3.5 tw:flex tw:items-center tw:justify-center">
                          {{ option.count }}
                        </span>
                        <ic-chevron-left
                          v-if="activeChildOption && activeChildOption.id === option.id"
                          class="tw:w-2.5 tw:h-2.5"
                        />
                        <ic-chevron-right
                          v-else
                          class="tw:w-2.5 tw:h-2.5"
                        />
                      </div>
                    </template>
                  </i-select-multiple>
                </div>
                <div
                  v-if="activeChildOption"
                  class="tw:w-[275px] tw:border-l tw:border-gray-500"
                >
                  <i-select-multiple
                    v-model="select17"
                    v-model:value-option="selectedRef"
                    inputId="child-select"
                    name="child-select"
                    size="sm"
                    rounded="lg"
                    checkbox-color="gray-500"
                    placeholder="Cari tipe referensi..."
                    dropdown-max-height="128px"
                    :options="activeChildOption.subOptions"
                    :filterable="true"
                  >
                    <template #prepend><ic-search class="tw:text-gray-700" /></template>
                  </i-select-multiple>
                </div>
              </div>
            </i-dropdown>
          </div>
        </div>
      </div>
      <div class="tw:w-1/2">
        <div class="tw:bg-yellow-800">is-normal-select-mode = true</div>
        <div>Filterable + init value + clearable</div>
        <span class="tw:text-red-600 tw:text-xs">v-model: {{ select12 }}</span>
        <div class="tw:text-xs">selectedOptions: {{ selectedOptions12 }}</div>

        <div class="tw:mb-4 tw:w-[275px] tw:relative">
          <i-select-multiple
            v-model="select12"
            v-model:value-option="selectedOptions12"
            input-id="Select-12"
            name="select-12"
            size="sm"
            rounded="lg"
            checkbox-color="gray-500"
            placeholder="Cari..."
            dropdown-max-height="128px"
            :options="selectStaticOptions2"
            :filterable="true"
            :is-normal-select-mode="true"
            clearable
          >
          </i-select-multiple>
        </div>

        <div>NON Filterable + clearable</div>
        <span class="tw:text-red-600">v-model: {{ select13 }}</span>
        <div class="tw:text-xs">selectedOptions: {{ selectedOptions13 }}</div>

        <div class="tw:mb-4 tw:w-[275px] tw:relative">
          <i-select-multiple
            v-model="select13"
            v-model:value-option="selectedOptions13"
            input-id="Select-13"
            name="select-13"
            size="sm"
            rounded="lg"
            checkbox-rounded="sm"
            checkbox-color="gray-500"
            placeholder="Cari..."
            dropdown-max-height="128px"
            :options="selectStaticOptions"
            :is-normal-select-mode="true"
            clearable
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
import IcChevronLeft from '@/icons/ic-chevron-left.vue';
import IcChevronRight from '@/icons/ic-chevron-right.vue';
import IcSearch from '@/icons/ic-search.vue';

import IButton from '@/components/i-button.vue';
import IDropdown from '@/components/dropdown/i-dropdown.vue';
import IChip from '@/components/i-chip.vue';
import ISelectMultiple from '@/components/i-select-multiple.vue';

export default {
  components: {
    IcChevronLeft,
    IcChevronRight,
    IcSearch,
    IButton,
    IDropdown,
    IChip,
    ISelectMultiple,
  },
  setup() {
    const select10 = ref([]);
    const select11 = ref([]);
    const select12 = ref([1, 2, 3, 4, 5, 6, 7, 8]);
    const select13 = ref([]);
    const select14 = ref([1, 2, 3, 4]);
    const select15 = ref([]);
    const select16 = ref([]);
    const select17 = ref([]);

    const selectedOptions10 = ref([]);
    const selectedOptions11 = ref([]);
    const selectedOptions12 = ref([]);
    const selectedOptions13 = ref([]);
    const selectedOptions14 = ref([]);
    const selectedOptions15 = ref([]);
    const selectedRef = ref([]);

    const activeChildOption = ref(null);

    const deactivateWrapperEvent = ref(true);
    const dropdownVisible2 = ref(false);
    const dropdownVisible3 = ref(false);
    const dropdownVisible4 = ref(false);

    const selectStaticOptions = computed(() => {
      return ['Asia', 'America', 'Europe', 'Indonesia', 'India', 'Japan', 'Korea', 'Others'];
    });

    const selectStaticOptions2 = computed(() => {
      return [
        {
          id: 1,
          name: 'Asia',
          status: 'error',
        },
        {
          id: 2,
          name: 'America',
          status: 'error',
        },
        {
          id: 3,
          name: 'Europe',
          status: 'info',
        },
        {
          id: 4,
          name: 'Indonesia',
          status: 'neutral',
        },
        {
          id: 5,
          name: 'India',
          status: 'neutral',
        },
        {
          id: 6,
          name: 'Japan',
          status: 'success',
        },
        {
          id: 7,
          name: 'England',
          status: 'info',
        },
        {
          id: 8,
          name: 'Uganda',
          status: 'success',
        },
      ];
    });

    const selectStaticOptions3 = computed(() => {
      return [
        {
          id: 1,
          name: 'Uang Masuk',
          count: 10,
          subOptions: [
            { id: "masuk-1", name: "Transfer Bank" },
            { id: "masuk-2", name: "Tunai" },
          ]
        },
        {
          id: 2,
          name: 'Uang Keluar',
          count: 0,
          subOptions: [
            { id: "masuk-1", name: "XXXXXX" },
            { id: "masuk-2", name: "YYYYYY" }
          ]
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

    const openChildSelect = (option) => {
      activeChildOption.value =
        activeChildOption.value && activeChildOption.value.id === option.id ? null : option;
    };

    return {
      activeChildOption,
      select10,
      select11,
      select12,
      select13,
      select14,
      select15,
      select16,
      select17,
      selectedOptions10,
      selectedOptions11,
      selectedOptions12,
      selectedOptions13,
      selectedOptions14,
      selectedOptions15,
      selectedRef,
      selectStaticOptions,
      selectStaticOptions2,
      selectStaticOptions3,
      deactivateWrapperEvent,
      dropdownVisible2,
      dropdownVisible3,
      dropdownVisible4,
      changeHandler,
      openChildSelect,
      selectRemoteMethod,
    };
  },
};
</script>

<style>
@reference "@/assets/global.css";

.btn-hover {
  @apply tw:hover:bg-yellow-200 tw:flex tw:items-center tw:gap-1 tw:pointer-events-auto tw:p-0.5 tw:rounded-lg;

  &.btn-active {
    @apply tw:bg-yellow-200 tw:p-0.5 tw:rounded-lg;
  }
}
</style>
