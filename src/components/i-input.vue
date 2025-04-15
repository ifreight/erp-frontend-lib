<template>
  <div class="i-input">
    <div
      class="i-input-container"
      :class="classes"
    >
      <div
        v-if="$slots.prepend"
        class="prepend-container"
      >
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

      <div
        v-if="clearable && (!disabled || !readOnly)"
        v-show="filled"
        class="append-container"
      >
        <ic-times-circle
          class="icon-clear"
          @click.once="onClear"
        />
      </div>
      <div
        v-if="!!$slots.append"
        class="append-container"
      >
        <slot name="append" />
      </div>
    </div>

    <div
      v-if="!!errorMessage"
      class="i-input-error"
    >
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import { computed, watch, ref } from 'vue';
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
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: '',
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
  },
  emits: [
    'update:modelValue',
    'clear',
    'change',
    'blur',
    'focus',
    'keyup'
  ],
  setup(props, { slots, emit }) {
    const inputRef = ref();

    const filled = computed(() => props.modelValue != null && props.modelValue !== '');
    const classes = computed(() => {
      return {
        dark: props.dark,
        disabled: props.disabled,
        readonly: props.readOnly,
        invalid: props.invalid || !!props.errorMessage,
        prepend: !!slots.prepend,
        append: !!slots.append || props.clearable,
        filled: props.filled,
        borderless: props.borderless,
        sm: props.size === 'sm',
      }
    });
    const isLabelActive = computed(() => props.filled || !!props.placeholder || !!props.placeholderValue);
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

    const onInput = ((event) => {
      if (!props.mask) {
        emit('update:modelValue', event.target.value);
      }
    });

    const onChange = (() => {
      emit('change', props.modelValue);
    });

    const onFocus = (() => {
      emit('focus');
    });

    const onBlur = (() => {
      emit('blur');
    });

    const onClear = (() => {
      let clearedValue;
      if (typeof props.modelValue === 'string') {
        clearedValue = '';
      }
      emit('update:modelValue', clearedValue);
      emit('clear');
    });

    const onAcceptUnmasked = ((unmaskedValue) => {
      emit('update:modelValue', unmaskedValue ? Number(unmaskedValue) : undefined);
    });

    watch(() => displayModelValue, (value) => {
      if (inputRef.value && !props.mask) {
        inputRef.value.value = value == null ? '' : value;
      }
    },
      {
        immediate: true,
      }
    )
    return {
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
    }
  },
};
</script>

<style>
@reference "tailwindcss";

.i-input {
  .i-input-container {
    height: 41px;
    padding: 0 16px;
    color: var(--gray-900);
    background-color: var(--white);
    border: 1px solid var(--gray-500);
    border-radius: 2px;

    &.sm {
      height: 32px;
    }

    .input {
      width: 100%;
      height: 100%;
      font-size: 14px;
      line-height: 16px;
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
      border-color: var(--gray-900);
    }

    &.disabled {
      background-color: var(--gray-500);
    }

    &.readonly {
      background-color: var(--gray-100);
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

  .i-input-error {
    padding-top: 8px;
    font-size: var(--size-xs);
    line-height: var(--size-sm);
    color: var(--red-300);
  }
}
</style>
