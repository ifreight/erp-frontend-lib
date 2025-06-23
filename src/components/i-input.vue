<template>
  <div class="i-input">
    <div class="i-input-container" :class="classes">
      <div v-if="$slots.prepend" class="prepend-container">
        <slot name="prepend" />
      </div>
      <component
        v-bind="maskAttributes"
        :is="inputComponent"
        :id="inputId"
        ref="inputRef"
        :name="name"
        :value="displayModelValue"
        :type="type"
        :placeholder="placeholder || placeholderValue"
        :disabled="disabled"
        :readonly="readOnly"
        :autocomplete="autoComplete"
        :maxlength="maxlength"
        :class="inputClasses"
        @input="onInput"
        @keyup="$emit('keyup', $event)"
        @change="onChange"
        @focus="onFocus"
        @blur="onBlur"
        @accept:unmasked="onAcceptUnmasked"
      />

      <div v-if="isShowClearable" v-show="filled" class="append-container">
        <ic-times-circle class="icon-clear" @click="onClear" />
      </div>
      <div v-if="!!$slots.append" class="append-container">
        <slot name="append" />
      </div>
    </div>

    <div v-if="errorMessage" class="i-error-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import { computed, watch, onMounted, ref } from 'vue';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import { IMaskComponent } from 'vue-imask';

import IcTimesCircle from '@/icons/ic-times-circle.vue';

export default {
  name: 'IInput',
  components: {
    IcTimesCircle,
    'imask-input': IMaskComponent,
  },
  props: {
    modelValue: {
      type: [String, Number, Date, Object],
      default: undefined,
    },
    inputId: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'text',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: '',
    },
    placeholderValue: {
      type: String,
      default: '',
    },
    autoComplete: {
      type: String,
      default: 'off',
    },
    currency: {
      type: Boolean,
      default: false,
    },
    readOnly: Boolean,
    invalid: Boolean,
    errorMessage: {
      type: String,
      default: '',
    },
    dark: Boolean,
    borderless: Boolean,
    dateLocale: {
      type: String,
      default: 'en',
    },
    dateFormat: {
      type: String,
      default: 'dddd, D MMM, YYYY', // format follow dayjs
    },
    mask: {
      type: String,
      default: undefined,
      validator(value) {
        return ['number', 'decimal', 'npwp'].includes(value);
      },
    },
    maskOptions: {
      type: Object,
      default: () => null,
    },
    size: {
      type: String,
      default: 'base',
      validator(value) {
        return ['sm', 'base'].includes(value);
      },
    },
    maxlength: {
      type: Number,
      default: null,
    },
    clearable: Boolean,
    rounded: {
      type: String,
      default: 'xs',
    },
    isNullWhenEmpty: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['update:modelValue', 'clear', 'change', 'blur', 'focus', 'keyup'],
  setup(props, { slots, emit }) {
    const inputRef = ref();

    const isShowClearable = computed(() => {
      if (!props.clearable) {
        return false;
      }
      if (props.disabled && (props.readOnly || !props.readOnly)) {
        return false;
      }
      if (props.readOnly && (props.disabled || !props.disabled)) {
        return false;
      }
      return true;
    });
    const emptyVal = computed(() => (props.isNullWhenEmpty ? null : ''));

    const filled = computed(() => props.modelValue != null && props.modelValue !== '');
    const classes = computed(() => {
      return [
        `rounded-${props.rounded}`,
        props.size,
        {
          dark: props.dark,
          disabled: props.disabled,
          readonly: props.readOnly,
          invalid: props.invalid || !!props.errorMessage,
          prepend: !!slots.prepend,
          append: !!slots.append || props.clearable,
          filled: props.filled,
          borderless: props.borderless,
        },
      ];
    });
    const isLabelActive = computed(
      () => props.filled || !!props.placeholder || !!props.placeholderValue,
    );
    const displayModelValue = computed(() => {
      if (props.modelValue && props.modelValue instanceof Date) {
        return dayjs(props.modelValue).locale(props.dateLocale).format(props.dateFormat);
      }
      if (typeof props.modelValue === 'number') {
        if (Object.is(props.modelValue, -0)) {
          return '-0';
        }
        return props.modelValue.toLocaleString('id-ID');
      }
      return props.modelValue || '';
    });
    const maskAttributes = computed(() => {
      switch (props.mask) {
        case 'number':
          return {
            mask: Number,
            thousandsSeparator: '.',
            radix: ',',
            mapToRadix: ['.'],
            scale: 0,
            unmask: true,
            lazy: true,
            ...props.maskOptions,
          };
        case 'decimal':
          return {
            mask: Number,
            thousandsSeparator: '.',
            radix: ',',
            mapToRadix: ['.'],
            scale: 2,
            unmask: true,
            lazy: true,
            ...props.maskOptions,
          };
        case 'npwp':
          return {
            mask: '00.000.000.0-000-000',
            lazy: true,
            ...props.maskOptions,
          };
        default:
          return props.maskOptions;
      }
    });
    const inputClasses = computed(() => {
      return {
        input: true,
        'placeholder-value': props.placeholderValue,
      };
    });
    const inputComponent = computed(() => {
      return props.mask ? 'imask-input' : 'input';
    });

    const onInput = (event) => {
      if (!props.mask) {
        emit(
          'update:modelValue',
          event.target.value.length > 0 ? event.target.value : emptyVal.value,
        );
      }
    };

    const onChange = () => {
      emit('change', props.modelValue);
    };

    const onFocus = () => {
      emit('focus');
    };

    const onBlur = () => {
      emit('blur');
    };

    const onClear = () => {
      let clearedValue;
      if (typeof props.modelValue === 'string') {
        clearedValue = emptyVal.value;
      }
      emit('update:modelValue', clearedValue);
      emit('clear');
      emit('change');
    };

    const onAcceptUnmasked = (unmaskedValue) => {
      emit('update:modelValue', unmaskedValue ? Number(unmaskedValue) : emptyVal.value);
    };

    watch(
      () => displayModelValue,
      (value) => {
        if (inputRef.value && !props.mask) {
          inputRef.value.value = value == null ? null : value;
        }
      },
      { immediate: true },
    );

    onMounted(() => {
      if (props.isNullWhenEmpty) {
        if (
          !props.modelValue &&
          props.modelValue !== null &&
          (props.modelValue === undefined || typeof props.modelValue === 'string')
        ) {
          emit('update:modelValue', null);
        }
      }
    });

    return {
      isShowClearable,
      filled,
      classes,
      isLabelActive,
      displayModelValue,
      maskAttributes,
      inputClasses,
      inputComponent,
      inputRef,
      onInput,
      onChange,
      onFocus,
      onBlur,
      onClear,
      onAcceptUnmasked,
    };
  },
};
</script>

<style>
@reference "@/assets/global.css";

.i-input {
  .i-input-container {
    height: 41px;
    padding: 0 12px;
    color: var(--gray-900);
    background-color: var(--white);
    border: 1px solid var(--gray-500);

    &.base {
      .input {
        font-size: 14px;
        line-height: 16px;
      }
    }
    &.sm {
      height: 32px;
      .input {
        font-size: 12px;
        line-height: 14px;
      }
    }
    &.rounded-xs {
      border-radius: 2px;
    }
    &.rounded-sm {
      border-radius: 4px;
    }
    &.rounded-lg {
      border-radius: 8px;
    }
    &.rounded-xl {
      border-radius: 12px;
    }
    .input {
      width: 100%;
      height: 100%;
      color: var(--gray-900);
      text-overflow: ellipsis;
      border: none;

      &:focus-visible,
      &:focus {
        outline: none;
      }

      &::placeholder {
        color: var(--gray-700);
        opacity: 1; /* Firefox */
      }

      &.placeholder-value {
        &::placeholder {
          color: var(--gray-700);
        }

        &:focus:not(:read-only)::placeholder {
          opacity: 0;
        }
      }

      &:disabled {
        color: var(--gray-600);
        background-color: transparent;
        cursor: not-allowed;
      }
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        appearance: none;
        margin: 0;
      }

      &[type='number'] {
        appearance: textfield;
      }
    }

    /* modifier to parent div */
    &.append,
    &.prepend {
      display: flex;

      .append-container,
      .prepend-container {
        align-self: center;
      }
    }

    &.prepend .prepend-container {
      margin-right: 12px;
    }

    &.append .append-container {
      margin-left: 12px;

      .icon-clear {
        color: var(--gray-600);
        cursor: pointer;
        height: 12px;
        width: 12px;
      }
    }

    &:focus-within {
      border-color: var(--gray-700);
    }

    &.disabled {
      background-color: var(--gray-500);
      cursor: not-allowed;

      svg {
        color: var(--gray-600);
      }
    }

    &.readonly {
      input {
        cursor: default;
      }
    }

    &.filled:not(.disabled) {
      border-color: var(--gray-900);
    }

    &.invalid,
    &.invalid.filled,
    &.invalid.dark {
      border-color: var(--red-300);
    }

    &.invalid {
      svg {
        color: var(--red-300);
      }
    }

    &.dark {
      color: var(--white);
      background-color: var(--gray-900);
      border-color: var(--white);

      .input {
        color: var(--white);
        background-color: var(--gray-900);
      }
    }

    &.borderless {
      border: none;

      &.sm {
        height: 32px;
      }
    }
  }
}
</style>
