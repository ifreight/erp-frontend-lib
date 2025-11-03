<template>
  <div class="i-input">
    <div class="i-input-container" :class="classes" :style="heightStyle">
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
        @keydown.enter.exact="onEnterKeyHandler"
      />

      <div v-if="isShowClearable" @click.stop v-show="filled" class="append-container">
        <ic-times class="icon-clear" @click="onClear" />
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
import { computed, watch, ref } from 'vue';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import { IMaskComponent } from 'vue-imask';

import IcTimes from '@/icons/ic-times.vue';

export default {
  name: 'IInput',
  components: {
    IcTimes,
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
    isUppercase: {
      type: Boolean,
      default: false,
    },
    isTextNumberOnly: {
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
        return ['sm', 'base', 'lg'].includes(value);
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
    height: {
      type: [String, Number],
      default: '41px',
    },
  },
  emits: ['update:modelValue', 'clear', 'change', 'blur', 'focus', 'keyup'],
  setup(props, { slots, emit }) {
    const inputRef = ref();

    const isShowClearable = computed(() => {
      if (!props.clearable || props.disabled) {
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
      if (typeof props.modelValue === 'string' && props.isUppercase) {
        return props.modelValue.toUpperCase();
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

    const heightStyle = computed(() => {
      const height = typeof props.height === 'number' ? `${props.height}px` : props.height;

      return { height: height };
    });

    const onInput = (event) => {
      if (!props.mask) {
        let val = event.target.value;
        if (props.isUppercase && typeof val === 'string') {
          val = val.toUpperCase();
          event.target.value = val;
        }
        if (props.isTextNumberOnly && props.type === 'text') {
          val = event.target.value.replace(/[^0-9]/g, '');
          event.target.value = val;
        }
        emit('update:modelValue', val.length > 0 ? val : emptyVal.value);
      }
    };

    const onChange = () => {
      emit('change', props.modelValue);
    };

    const onFocus = () => {
      emit('focus');
    };

    const onBlur = () => {
      if (props.modelValue) {
        let val = props.modelValue;
        if (typeof props.modelValue === 'string') {
          val = props.modelValue.trim();
        }
        emit('update:modelValue', val || emptyVal.value);
      }
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

    const onEnterKeyHandler = () => {
      if (props.modelValue) {
        let val = props.modelValue;
        if (typeof props.modelValue === 'string') {
          val = props.modelValue.trim();
        }
        emit('update:modelValue', val || emptyVal.value);
      }
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
      heightStyle,
      onInput,
      onChange,
      onFocus,
      onBlur,
      onClear,
      onAcceptUnmasked,
      onEnterKeyHandler,
    };
  },
};
</script>

<style>
@reference "@/assets/global.css";

.i-input {
  .i-input-container {
    padding: 0 12px;
    color: var(--gray-900);
    background-color: var(--white);
    border: 1px solid var(--gray-500);

    &.sm {
      .input {
        font-size: 12px;
        line-height: 14px;
      }
    }
    &.base {
      .input {
        font-size: 14px;
        line-height: 16px;
      }
    }
    &.lg {
      .input {
        font-size: 16px;
        line-height: 18px;
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

      .i-input-container {
        padding-left: 0px !important;
        border-left: 0px !important;
      }
    }

    &.append .append-container {
      margin-left: 12px;

      .icon-clear {
        color: var(--gray-900);
        cursor: pointer;
        height: 12px;
        width: 12px;
      }
      .i-input-container {
        padding-right: 0px !important;
        border-right: 0px !important;
      }
    }

    &:focus-within {
      border-color: var(--gray-700);
      &.append .append-container,
      &.prepend .prepend-container {
        .i-input-container {
          border-top-color: var(--gray-700);
          border-bottom-color: var(--gray-700);
        }
      }
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

      &.prepend .prepend-container,
      &.append .append-container {
        .i-input-container {
          border-top-color: var(--red-300);
          border-bottom-color: var(--red-300);
          border-radius: 0px;
        }
      }
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
