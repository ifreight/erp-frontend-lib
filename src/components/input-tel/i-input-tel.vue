<template>
  <div class="i-input-tel">
    <div
      ref="selectCountry"
      class="i-input-tel-country-wrapper"
      tabindex="0"
      @blur="closeCountryDropdown"
    >
      <div class="i-input-tel-country">
        <div
          class="i-input-tel-country-select"
          :class="countryDropdownOpen && 'open'"
          @click="toggleCountryDropdown"
        >
          <div class="i-input-tel-country-flag">
            <span :class="activeCountryFlagClass" />
          </div>

          <div class="i-input-tel-country-code">
            {{ activeCountry && activeCountry.phoneCode }}
          </div>

          <div>
            <ic-chevron-up
              v-if="countryDropdownOpen"
              class="tw:text-gray-700"
            />
            <ic-chevron-down
              v-else
              class="tw:text-gray-700"
            />
          </div>
        </div>
      </div>
      <i-dropdown-options
        :visible="countryDropdownOpen"
        :options="countryList"
        option-key="countryCode"
        option-value="name"
        :current-value="activeCountry && activeCountry.countryCode"
        @selectedValue="onSelectCountry"
      >
        <template #options="{ option }">
          <span
            :class="`fi fi-${option.countryCode.toLowerCase()}`"
            class="i-input-tel-country-icon"
          />
          {{ option.name }}
          ({{ option.phoneCode }})
        </template>
      </i-dropdown-options>
    </div>
    <div class="i-input-tel-wrapper">
      <input-tel />
    </div>
  </div>
</template>

<script>
import InputTel from './index.js'
import IcChevronUp from '@/icons/ic-chevron-up.vue';
import IcChevronDown from '@/icons/ic-chevron-down.vue';

import IDropdownOptions from '@/components/dropdown/i-dropdown-options.vue';

export default {
  name: 'IInputTel',
  components: {
    InputTel: InputTel.component,
    IcChevronUp,
    IcChevronDown,
    IDropdownOptions,
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    autoComplete: {
      type: String,
      default: 'off',
    },
    defaultCountryCode: {
      type: String,
      default: 'ID',
    },
    valid: Boolean,
    invalid: Boolean,
    disabled: Boolean,
    readOnly: Boolean,
    dark: Boolean,
    borderless: Boolean,
    optionWidth: {
      type: String,
      default: '115px',
    },
  },
  emits: ['input', 'update:valid'],
  data() {
    return {
      phone: '',
      countryCode: '',
      countryDropdownOpen: false,
      countryList: [],
    };
  },
  computed: {
    activeCountry() {
      return this.countryList.find((country) => country.countryCode === this.countryCode);
    },
    activeCountryFlagClass() {
      if (!this.activeCountry) {
        return '';
      }
      return `fi fi-${this.activeCountry.countryCode.toLowerCase()}`;
    },
  },
  watch: {
    phone: {
      handler(value) {
        if (value !== this.value) {
          this.$emit('input', value);
        }
      },
    },
  },
  created() {
    this.countryCode = this.defaultCountryCode;

    this.getCountryList();

    if (this.value) {
      this.phone = this.value;
    }
  },
  methods: {
    async getCountryList() {
      this.countryList = await InputTel.store.getCountryList();
    },
    onValidate(value) {
      this.$emit('update:valid', value);
    },
    onSelectCountry(country) {
      this.countryCode = country.countryCode;
      this.$refs.selectCountry.blur();
    },
    toggleCountryDropdown() {
      if (this.disabled || this.readOnly) {
        return;
      }
      this.countryDropdownOpen = !this.countryDropdownOpen;
    },
    closeCountryDropdown() {
      if (!this.countryDropdownOpen) {
        return;
      }
      this.$nextTick(() => {
        this.countryDropdownOpen = false;
      });
    },
  },
};
</script>

<style>
@reference "@/assets/global.css";

.i-input-tel {
  display: flex;
  border: 1px solid var(--gray-500);
  height: 41px;
  position: relative;

  .i-input-tel-country-wrapper {
    .i-input-tel-country {
      padding: 12px;
      border-right: 1px solid var(--gray-500);
      @apply tw:flex tw:items-center tw:h-full;

      .i-input-tel-country-select {
        @apply tw:flex tw:items-center tw:h-full tw:cursor-pointer;

        .i-input-tel-country-flag {
          @apply tw:flex tw:items-center tw:overflow-hidden;
          font-size: 20px;
          box-shadow: 0 0 1px 0 var(--gray-700);
          border-radius: 2px;
        }
        .i-input-tel-country-code {
          @apply tw:text-sm tw:mx-2;
        }
      }
    }
  }
}

.i-input-tel-country-icon {
  @apply tw:flex tw:items-center tw:overflow-hidden;
  margin-right: 4px;
  font-size: 14px;
  box-shadow: 0 0 1px 0 var(--gray-700);
  border-radius: 2px;
}
</style>
