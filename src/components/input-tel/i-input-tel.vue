<template>
  <div class="i-input-tel-wrapper">
    <div class="i-input-tel" :class="classes">
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
              <ic-chevron-up v-if="countryDropdownOpen" class="tw:text-gray-700" />
              <ic-chevron-down v-else class="tw:text-gray-700" />
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
      <div class="i-input-tel-input-wrapper">
        <input-tel
          v-model="phone"
          v-model:country="countryCode"
          :name="name"
          :placeholder="placeholder"
          :auto-complete="autoComplete"
          :disabled="disabled"
          :read-only="readOnly"
          @validate="onValidate"
        />
        <div v-if="clearable && (!disabled || !readOnly)" v-show="filled" class="append-container">
          <ic-times class="icon-clear" @click.once="onClear" />
        </div>
      </div>
    </div>
    <div v-if="errorMessage" class="i-error-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import { computed, nextTick, onMounted, ref, watch } from 'vue';

import InputTel from './index.js';
import IcChevronUp from '@/icons/ic-chevron-up.vue';
import IcChevronDown from '@/icons/ic-chevron-down.vue';
import IcTimes from '@/icons/ic-times.vue';

import IDropdownOptions from '@/components/dropdown/i-dropdown-options.vue';

export default {
  name: 'IInputTel',
  components: {
    InputTel: InputTel.component,
    IcChevronUp,
    IcChevronDown,
    IcTimes,
    IDropdownOptions,
  },
  props: {
    modelValue: {
      type: String,
      default: undefined,
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
    clearable: Boolean,
    optionWidth: {
      type: String,
      default: '115px',
    },
    errorMessage: {
      type: String,
      default: '',
    },
    isNullWhenEmpty: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['update:modelValue', 'update:valid', 'clear'],
  setup(props, { emit }) {
    const selectCountry = ref();
    const phone = ref('');
    const countryCode = ref('');
    const countryDropdownOpen = ref(false);
    const countryList = ref([]);

    const filled = computed(() => props.modelValue != null && props.modelValue !== '');
    const activeCountry = computed(() =>
      countryList.value.find((country) => country.countryCode === countryCode.value),
    );
    const emptyVal = computed(() => (props.isNullWhenEmpty ? null : ''));

    const activeCountryFlagClass = computed(() => {
      if (!activeCountry.value) {
        return '';
      }
      return `fi fi-${activeCountry.value.countryCode.toLowerCase()}`;
    });
    const classes = computed(() => {
      return {
        disabled: props.disabled,
        readonly: props.readOnly,
        invalid: props.invalid,
        filled: props.filled,
      };
    });
    watch(
      () => phone.value,
      (val) => {
        if (val !== props.modelValue) {
          emit('update:modelValue', val ? val : emptyVal.value);
        } else if (!val) {
          emit('update:modelValue', emptyVal.value);
        }
      },
    );

    const onClear = () => {
      let clearedValue;
      if (typeof props.modelValue === 'string') {
        clearedValue = emptyVal.value;
      }
      phone.value = '';
      emit('update:modelValue', clearedValue);
      emit('clear');
    };

    const getCountryList = async () => {
      countryList.value = await InputTel.store.getCountryList();
    };

    const onValidate = (value) => {
      emit('update:valid', value);
    };

    const onSelectCountry = (country) => {
      countryCode.value = country.countryCode;
      selectCountry.value.blur();
    };

    const toggleCountryDropdown = () => {
      if (props.disabled || props.readOnly) {
        return;
      }
      countryDropdownOpen.value = !countryDropdownOpen.value;
    };
    const closeCountryDropdown = async () => {
      if (!countryDropdownOpen.value) {
        return;
      }
      await nextTick();
      countryDropdownOpen.value = false;
    };

    onMounted(() => {
      countryCode.value = props.defaultCountryCode;

      getCountryList();

      if (props.modelValue) {
        phone.value = props.modelValue;
      }
    });
    return {
      phone,
      countryCode,
      countryDropdownOpen,
      countryList,
      classes,
      filled,
      activeCountry,
      activeCountryFlagClass,
      selectCountry,
      onClear,
      onValidate,
      onSelectCountry,
      toggleCountryDropdown,
      closeCountryDropdown,
    };
  },
};
</script>

<style>
@reference "@/assets/global.css";
.i-input-tel-wrapper {
  .i-input-tel {
    display: flex;
    border: 1px solid var(--gray-500);
    height: 41px;
    align-items: center;
    position: relative;

    .i-input-tel-country-wrapper {
      height: 100%;
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
    .i-input-tel-input-wrapper {
      @apply tw:w-full tw:flex tw:items-center;
    }

    .append-container {
      margin-left: 12px;
      margin-right: 16px;

      .icon-clear {
        color: var(--gray-900);
        cursor: pointer;
        height: 12px;
        width: 12px;
      }
    }
    &.disabled {
      @apply tw:bg-gray-300 tw:text-gray-600;
      .i-input-tel-country-wrapper {
        .i-input-tel-country {
          .i-input-tel-country-select {
            @apply tw:cursor-not-allowed;
          }
        }
      }
      input {
        @apply tw:cursor-not-allowed;
      }
    }
    &.readonly {
      background-color: var(--gray-100);
      input {
        cursor: default;
      }
      .i-input-tel-country-wrapper {
        .i-input-tel-country {
          .i-input-tel-country-select {
            @apply tw:cursor-default;
          }
        }
      }
    }
    &.invalid {
      border-color: var(--red-300);
    }
    &:focus-within {
      border-color: var(--gray-700);

      .i-input-tel-country {
        border-color: var(--gray-700);
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
}
</style>
