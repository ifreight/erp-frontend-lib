<template>
  <div>
    <div class="tw:mb-5">Select Multiple</div>
    <div class="tw:bg-yellow-500">NEW version</div>
    <div class="tw:flex tw:gap-5">
      <div class="tw:w-1/2">
        <div class="tw:bg-yellow-800">is-normal-select-mode = false</div>
        <div>Multiple First Type</div>
        <div class="tw:mb-4 tw:w-[275px]">
          <span class="tw:text-red-600 tw:text-xs">v-model: {{ select1 }}</span>
          <div class="tw:text-xs">selectedOptions: {{ selectedOptions1 }}</div>
          <div class="tw:border tw:rounded-md">
            <i-select-multiple
              v-model="select1"
              v-model:value-option="selectedOptions1"
              input-id="Select-1"
              name="select-1"
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
        <div class="tw:mb-4 tw:w-[275px]">
          <span class="tw:text-red-600 tw:text-xs">v-model: {{ select2 }}</span>
          <div class="tw:text-xs">selectedOptions: {{ selectedOptions2 }}</div>

          <i-dropdown :visible="newDropdownVisible2" :isShowArrow="false" rounded="lg">
            <i-button @click="newDropdownVisible2 = !newDropdownVisible2">Click Me</i-button>
            <template #dropdown>
              <i-select-multiple
                v-model="select2"
                v-model:value-option="selectedOptions2"
                inputId="Select-2"
                name="select-2"
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
            </template>
          </i-dropdown>
        </div>

        <div>Slot options + non filterable</div>
        <div class="tw:mb-4 tw:w-[275px]">
          <span class="tw:text-red-600 tw:text-xs">v-model: {{ select3 }}</span>
          <div class="tw:text-xs">selectedOptions: {{ selectedOptions3 }}</div>

          <i-dropdown
            :visible="newDropdownVisible3"
            :isShowArrow="false"
            rounded="lg"
            padding="none"
          >
            <i-button @click="newDropdownVisible3 = !newDropdownVisible3">Click Me</i-button>
            <template #dropdown>
              <i-select-multiple
                v-model="select3"
                v-model:value-option="selectedOptions3"
                inputId="Select-3"
                name="select-3"
                size="sm"
                rounded="lg"
                checkbox-color="gray-500"
                placeholder="Cari..."
                dropdown-max-height="128px"
                :options="selectStaticOptions2"
              >
                <template #prepend><ic-search class="tw:text-gray-700" /></template>
                <template #options="{ option }">
                  <i-chip :showDot="false" :text="option.name" :status="option.status" />
                </template>
              </i-select-multiple>
            </template>
          </i-dropdown>
        </div>

        <div>Show New Dropdown</div>
        <div class="tw:mb-4">
          <span class="tw:text-red-600 tw:text-xs">v-model: {{ select4 }}</span>
          <div class="tw:text-xs">selectedOptions: {{ selectedOptions4 }}</div>

          <i-dropdown
            :visible="newDropdownVisible4"
            :isShowArrow="false"
            rounded="lg"
            padding="none"
            :width="activeChildOption2 ? '550px' : '275px'"
            preferenceXPosition="center"
            triggerDisplay="inline-block"
          >
            <ic-filter-bars
              class="tw:cursor-pointer"
              @click="newDropdownVisible4 = !newDropdownVisible4"
            />
            <template #dropdown>
              <div class="tw:flex">
                <div class="tw:w-[275px]">
                  <i-select-multiple
                    v-model="select4"
                    v-model:value-option="selectedOptions4"
                    inputId="Select-4"
                    name="select-4"
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
                      <div
                        class="tw:flex tw:justify-between tw:items-center tw:pointer-events-auto"
                      >
                        <span>{{ option.name }}</span>
                      </div>
                    </template>

                    <template #optionsAppend="{ option }">
                      <div
                        class="btn-hover"
                        :class="{
                          'btn-active': activeChildOption2 && activeChildOption2.id === option.id,
                        }"
                        @click="openChildSelect2(option)"
                      >
                        <span
                          class="tw:bg-yellow-800 tw:rounded-full tw:text-[8px] tw:font-semibold tw:w-3.5 tw:h-3.5 tw:flex tw:items-center tw:justify-center"
                        >
                          {{ option.count }}
                        </span>
                        <ic-chevron-left
                          v-if="activeChildOption2 && activeChildOption2.id === option.id"
                          class="tw:w-2.5 tw:h-2.5"
                        />
                        <ic-chevron-right v-else class="tw:w-2.5 tw:h-2.5" />
                      </div>
                    </template>
                  </i-select-multiple>
                </div>
                <div v-if="activeChildOption2" class="tw:w-[275px] tw:border-l tw:border-gray-500">
                  <i-select-multiple
                    v-model="select5"
                    v-model:value-option="selectedOptions5"
                    inputId="child-select"
                    name="child-select"
                    size="sm"
                    rounded="lg"
                    checkbox-color="gray-500"
                    placeholder="Cari tipe referensi..."
                    dropdown-max-height="128px"
                    :options="activeChildOption2.subOptions"
                    :filterable="true"
                  >
                    <template #prepend><ic-search class="tw:text-gray-700" /></template>
                  </i-select-multiple>
                </div>
              </div>
            </template>
          </i-dropdown>
        </div>
      </div>

      <div class="tw:w-1/2">
        <div class="tw:bg-red-500">is-normal-select-mode = true</div>
        <div>Filterable + init value + clearable</div>
        <span class="tw:text-red-600 tw:text-xs">v-model: {{ select12 }}</span>
        <div class="tw:text-xs">selectedOptions: {{ selectedOptions12 }}</div>
        <div class="tw:mb-4 tw:w-[275px]">
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
        <div class="tw:mb-4 tw:w-[275px]">
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

        <div class="tw:mb-4 tw:w-[275px]">
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
import IcFilterBars from '@/icons/ic-filter-bars.vue';

import IButton from '@/components/i-button.vue';
import IDropdown from '@/components/dropdown/i-dropdown.vue';
import IChip from '@/components/i-chip.vue';
import ISelectMultiple from '@/components/i-select-multiple.vue';

export default {
  components: {
    IcChevronLeft,
    IcChevronRight,
    IcFilterBars,
    IcSearch,
    IButton,
    IDropdown,
    IChip,
    ISelectMultiple,
  },
  setup() {
    const select1 = ref([]);
    const select2 = ref([]);
    const select3 = ref([]);
    const select4 = ref([]);
    const select5 = ref([]);
    const selectedOptions1 = ref([]);
    const selectedOptions2 = ref([]);
    const selectedOptions3 = ref([]);
    const selectedOptions4 = ref([]);
    const selectedOptions5 = ref([]);

    const select12 = ref([1, 2, 3, 4, 5, 6, 7, 8]);
    const select13 = ref([]);
    const select14 = ref([1, 2, 3, 4]);

    const selectedOptions12 = ref([]);
    const selectedOptions13 = ref([]);
    const selectedOptions14 = ref([]);

    const activeChildOption2 = ref(null);

    const deactivateWrapperEvent = ref(true);
    const dropdownVisible2 = ref(false);
    const dropdownVisible3 = ref(false);
    const dropdownVisible4 = ref(false);
    const newDropdownVisible2 = ref(false);
    const newDropdownVisible3 = ref(false);
    const newDropdownVisible4 = ref(false);
    const newDropdownVisible5 = ref(false);

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
            { id: 'masuk-1', name: 'Transfer Bank' },
            { id: 'masuk-2', name: 'Tunai' },
          ],
        },
        {
          id: 2,
          name: 'Uang Keluar',
          count: 0,
          subOptions: [
            { id: 'masuk-1', name: 'XXXXXX' },
            { id: 'masuk-2', name: 'YYYYYY' },
          ],
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

    const changeHandler = (e, f, g) => {
      alert('handle change', e);
      console.log('tersisa', e, 'yg ter-click', f, 'ischecked', g);
    };

    const openChildSelect2 = (option) => {
      activeChildOption2.value =
        activeChildOption2.value && activeChildOption2.value.id === option.id ? null : option;
    };

    return {
      activeChildOption2,
      select1,
      select2,
      select3,
      select4,
      select5,
      selectedOptions1,
      selectedOptions2,
      selectedOptions3,
      selectedOptions4,
      selectedOptions5,
      newDropdownVisible2,
      newDropdownVisible3,
      newDropdownVisible4,
      newDropdownVisible5,

      select12,
      select13,
      select14,
      selectedOptions12,
      selectedOptions13,
      selectedOptions14,
      selectStaticOptions,
      selectStaticOptions2,
      selectStaticOptions3,
      deactivateWrapperEvent,

      dropdownVisible2,
      dropdownVisible3,
      dropdownVisible4,
      changeHandler,
      openChildSelect2,
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
