<template>
  <input
    v-model="phone"
    class="input-tel"
    type="tel"
    maxlength="20"
    :name="name"
    :disabled="disabled"
    :readonly="readOnly"
    :placeholder="placeholder"
    :autocomplete="autoComplete"
    @focus="onFocus"
    @blur="onBlur"
  />
</template>

<script>
import { nextTick, onMounted, ref, watch } from 'vue';

import { parsePhoneNumberFromString } from 'libphonenumber-js';
import store from './store';

export default {
  name: 'InputTel',
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    country: {
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
    disabled: Boolean,
    readOnly: Boolean,
  },
  emits: ['update:country', 'update:modelValue', 'validate', 'focus', 'blur'],
  setup(props, { emit }) {
    const phone = ref('');
    const phoneObject = ref({});
    const activeCountry = ref(undefined);
    const activeCountryCode = ref('');

    const onFocus = () => {
      emit('focus');
    };
    const onBlur = () => {
      emit('blur');
    };

    const testCharacters = (value) => {
      return /^[()\-+0-9\s]*$/.test(value);
    };

    const parseInputValue = (value) => {
      let inputValue = value;
      if (inputValue && activeCountry.value) {
        const cleanValue = value.replace(/\s+/g, '');
        if (cleanValue.startsWith(activeCountry.value.phoneCode)) {
          let dialCodeEndIndex = 0;
          let dialCodeCheckIndex = 0;
          for (dialCodeEndIndex; dialCodeEndIndex < value.length; dialCodeEndIndex += 1) {
            if (dialCodeCheckIndex === activeCountry.value.phoneCode.length) {
              break;
            }

            if (
              value.charAt(dialCodeEndIndex) ===
              activeCountry.value.phoneCode.charAt(dialCodeCheckIndex)
            ) {
              dialCodeCheckIndex += 1;
            }
          }

          inputValue = inputValue.slice(dialCodeEndIndex).trim();
        }
      }

      return inputValue;
    };

    const parseModelValue = (val) => {
      let parsedValue = val;

      if (parsedValue && parsedValue[0] !== '+' && activeCountry.value) {
        parsedValue = `${activeCountry.value.phoneCode}${val}`;
      }
      return parsedValue;
    };

    const findCountry = async (countryCode) => {
      if (!countryCode) {
        return undefined;
      }

      const countryList = await store.getCountryList();
      return countryList.find((country) => country.countryCode === countryCode);
    };

    const setActiveCountry = async () => {
      activeCountry.value = await findCountry(activeCountryCode.value);
    };

    const setPhoneObject = async () => {
      let result;
      if (phone.value && phone.value[0] === '+') {
        result = parsePhoneNumberFromString(phone.value);
      } else {
        result = parsePhoneNumberFromString(phone.value, activeCountryCode.value);
      }
      let internationalNumber = '';
      if (testCharacters(phone.value)) {
        internationalNumber = parseModelValue(phone.value);
      }

      const obj = {
        valid: false,
        countryCode: activeCountryCode.value,
        number: internationalNumber,
        nationalNumber: null,
        formatted: internationalNumber,
      };

      if (!result) {
        phoneObject.value = obj;
        return;
      }

      const country = await findCountry(result.country);

      if (result && country) {
        activeCountry.value = country;
        Object.assign(obj, {
          valid: result.isValid(),
          countryCode: result.country,
          number: result.number,
          nationalNumber: result.nationalNumber,
          formatted: result.formatInternational(),
        });
      }

      phoneObject.value = obj;
    };

    watch(
      () => props.country,
      (val) => {
        if (val) {
          activeCountryCode.value = val;
        }
      },
    );
    watch(
      () => activeCountryCode.value,
      (val) => {
        if (val !== props.country) {
          emit('update:country', val);
        }
        if (!activeCountry.value || activeCountry.value.countryCode !== val) {
          setActiveCountry();
          setPhoneObject();
        }
      },
    );
    watch(
      () => activeCountry.value,
      (val, oldVal) => {
        if (!val && oldVal && oldVal.countryCode) {
          this.activeCountryCode = oldVal.countryCode;
        }
      },
    );
    watch(
      () => phoneObject.value.countryCode,
      (val) => {
        activeCountryCode.value = val || '';
      },
    );
    watch(
      () => phoneObject.value.valid,
      (val) => {
        emit('validate', val);
      },
    );
    watch(
      () => phoneObject.value.formatted,
      (val) => {
        nextTick(() => {
          phone.value = parseInputValue(val);
        });
      },
    );
    watch(
      () => phoneObject.value.number,
      (val) => {
        emit('update:modelValue', val || '');
      },
    );
    watch(
      () => phone.value,
      (val, oldVal) => {
        if (!testCharacters(val)) {
          nextTick(() => {
            phone.value = oldVal;
          });
        } else {
          setPhoneObject();
        }
      },
    );
    watch(
      () => props.modelValue,
      (val) => {
        if (val !== phoneObject.value.number) {
          phone.value = val;
        }
      },
    );
    onMounted(() => {
      if (props.modelValue) {
        phone.value = props.modelValue;
      }
      if (props.country) {
        activeCountryCode.value = props.country;
      }
    });
    return {
      phone,
      phoneObject,
      activeCountry,
      activeCountryCode,
      onFocus,
      onBlur,
      findCountry,
    };
  },
};
</script>

<style>
@reference "@/assets/global.css";

.input-tel {
  outline: none;
  @apply tw:pl-3 tw:w-full tw:bg-transparent tw:text-sm;

  &:focus-visible {
    outline: none;
  }
  &::placeholder {
    color: var(--gray-700);
    opacity: 1; /* Firefox */
  }
}
</style>
