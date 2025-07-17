<template>
  <div>
    <!-- Checkbox + Input text with divider -->
    <div class="tw:mb-12">
      <div class="tw:font-bold tw:bg-yellow-800 tw:text-xl">Checkbox + Input text with divider</div>
      <div class="tw:mt-6">
        <i-multiple-input class="tw:w-[800px]">
          <i-checkbox
            v-model="modelCheck"
            name="modelCheckbox"
            label="Checked me!"
            class="tw:w-1/2"
          />

          <div class="tw:border-l tw:border-gray-500 tw:h-8" />
          <!-- add divider itself -->

          <i-input borderless name="text" placeholder="Search..." class="tw:w-1/2" />
        </i-multiple-input>
      </div>
    </div>

    <!-- Input text + Input text without divider and filled -->
    <div class="tw:mb-12">
      <div class="tw:font-bold tw:bg-yellow-800 tw:text-xl">
        Input text + Input text without divider and filled
      </div>
      <div class="tw:mt-6">
        <i-multiple-input :filled="!!modelInputOne" class="tw:w-[650px]">
          <i-input
            borderless
            name="text"
            placeholder="this input doesn't have a icon at the left side"
            class="tw:w-[340px]"
          />

          <i-input
            v-model="modelInputOne"
            borderless
            name="text"
            placeholder="this input have a icon at the left side"
            class="tw:w-[310px]"
          >
            <template #prepend><ic-search class="tw:text-gray-700" /></template>
          </i-input>
        </i-multiple-input>
      </div>
    </div>

    <!-- Radio + Input text with divider and disabled (only style) -->
    <div class="tw:mb-12">
      <div class="tw:font-bold tw:bg-yellow-800 tw:text-xl">
        Radio + Input text with divider and disabled (only style)
      </div>
      <div class="tw:mt-6">
        <i-multiple-input disabled class="tw:w-[400px]">
          <div class="tw:w-1/2 tw:flex">
            <i-radio v-model="modelRadio" :label-value="false" name="modelRadio"> No </i-radio>
            <i-radio v-model="modelRadio" :label-value="true" name="modelRadio" class="tw:ml-3">
              Yes
            </i-radio>
          </div>

          <div class="tw:border-l tw:border-gray-500 tw:h-8" />
          <!-- add divider itself -->

          <i-input borderless name="text" placeholder="Search..." class="tw:w-1/2" />
        </i-multiple-input>
      </div>
    </div>

    <!-- Input text + Button with divider and invalid -->
    <div class="tw:mb-12">
      <div class="tw:font-bold tw:bg-yellow-800 tw:text-xl">
        Input text + Button with divider and invalid
      </div>
      <div class="tw:mt-6">
        <i-multiple-input
          :invalid="modelInputTwo === ''"
          error-message="ini adalah error"
          class="tw:w-[400px]"
        >
          <i-input
            v-model="modelInputTwo"
            borderless
            name="text"
            placeholder="Search..."
            class="tw:w-1/2"
          />

          <div class="tw:border-l tw:border-gray-500 tw:h-8" />
          <!-- add divider itself -->

          <div class="tw:w-1/2 tw:flex tw:justify-center">
            <i-button class="tw:w-[150px]" @click="clickHandler"> Clear search text! </i-button>
          </div>
        </i-multiple-input>
      </div>
    </div>

    <!-- Dropdown + Input text + Input text with divider (more than 2 component) -->
    <div class="tw:mb-12">
      <div class="tw:font-bold tw:bg-yellow-800 tw:text-xl">
        Dropdown + Input text + Input text with divider (more than 2 component) + focused slotProps
      </div>
      <div class="tw:mt-6">
        <i-multiple-input>
          <template #default="{ focused }">
            <i-button text class="tw:w-1/3" @click="modelDropdown = !modelDropdown">
              Show dropdown!
            </i-button>
            <i-dropdown :visible="modelDropdown">
              <div>halo 1</div>
              <div>halo 2</div>
            </i-dropdown>

            <div
              class="tw:border-l tw:border-gray-500 tw:h-8"
              :class="{ 'tw:border-gray-700': focused }"
            />
            <!-- add divider itself -->

            <i-input borderless name="text" placeholder="Search..." class="tw:w-1/3" />

            <div
              class="tw:border-l tw:border-gray-500 tw:h-8"
              :class="{ 'tw:border-gray-700': focused }"
            />
            <!-- add divider itself -->

            <i-input borderless name="text" placeholder="Search..." class="tw:w-1/3" />
          </template>
        </i-multiple-input>
      </div>
    </div>

    <!-- Select + Input text without divider -->
    <div class="tw:mb-12">
      <div class="tw:font-bold tw:bg-yellow-800 tw:text-xl">
        Select + Input text without divider
      </div>
      <div class="tw:mt-6">
        <i-multiple-input>
          <i-select
            v-model="modelSelect"
            input-id="select"
            name="select"
            label="Select"
            placeholder="Select..."
            filterable
            :options="selectOptions"
            class="tw:w-1/4"
          />

          <i-input borderless name="text" placeholder="Search..." class="tw:w-3/4">
            <template #prepend><ic-search class="tw:text-gray-700" /></template>
          </i-input>
        </i-multiple-input>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';

import IButton from '@/components/i-button.vue';
import ICheckbox from '@/components/checkbox/i-checkbox.vue';
import IDropdown from '@/components/dropdown/i-dropdown.vue';
import IInput from '@/components/i-input.vue';
import IMultipleInput from '@/components/i-multiple-input.vue';
import IRadio from '@/components/i-radio.vue';
import ISelect from '@/components/i-select.vue';

import IcSearch from '@/icons/ic-search.vue';

export default {
  components: {
    IButton,
    ICheckbox,
    IDropdown,
    IInput,
    IMultipleInput,
    IRadio,
    ISelect,
    IcSearch,
  },
  setup() {
    const modelCheck = ref(false);
    const modelInputOne = ref('this input have a icon at the left side');
    const modelRadio = ref(false);
    const modelInputTwo = ref('');
    const modelDropdown = ref(false);
    const modelSelect = ref('America');

    const selectOptions = computed(() => ['Asia', 'America', 'Europe', 'Others']);

    const clickHandler = () => {
      modelInputTwo.value = '';
    };

    return {
      modelCheck,
      modelInputOne,
      modelRadio,
      modelInputTwo,
      modelDropdown,
      modelSelect,
      selectOptions,
      clickHandler,
    };
  },
};
</script>
