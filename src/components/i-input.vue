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
      />

      <div
        v-if="clearable"
        v-show="filled"
        class="append-container"
      >
        <!-- <ic-times-circle
          class="icon-clear"
          @click.native.stop="onClear"
        /> -->
        x
      </div>
      <div
        v-else
        v-show="!!$slots.append"
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
import { computed, useSlots } from 'vue';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
// import { IMaskComponent } from 'vue-imask';
// import IcTimesCircle from '@/icons/ic-times-circle.vue';

// import IInputLabel from './i-input-label.vue';

export default {
  name: 'IInput',
  components: {
    // IcTimesCircle,
    // IInputLabel,
    // ImaskInput: IMaskComponent,
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
  setup(props, { slots }) {
    const filled = computed(() => props.modelValue != null && props.modelValue !== '');
    const classes = computed(() => {
      return {
        dark: props.dark,
        disabled: props.disabled,
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
        return props.modelValue.toString();
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
    })
    return {
      filled,
      classes,
      isLabelActive,
      displayModelValue,
      maskAttributes,
      inputClasses,
    }
  },
  computed: {
    inputComponent() {
      return 'input';
    },
    // filled() {
    //   return this.value != null && this.value !== '';
    // },
    // classes() {
    //   return {
    //     dark: this.dark,
    //     disabled: this.disabled,
    //     invalid: this.invalid || !!this.errorMessage,
    //     prepend: !!this.$slots.prepend,
    //     append: !!this.$slots.append || this.clearable,
    //     filled: this.filled,
    //     borderless: this.borderless,
    //     sm: this.size === 'sm',
    //   };
    // },
    // isLabelActive() {
    //   return this.filled || !!this.placeholder || !!this.placeholderValue;
    // },
    // displayModelValue() {
    //   if (this.value && this.value instanceof Date) {
    //     return dayjs(this.value).locale(this.dateLocale).format(this.dateFormat);
    //   }
    //   if (typeof this.value === 'number') {
    //     if (Object.is(this.value, -0)) {
    //       return '-0';
    //     }
    //     return this.value.toString();
    //   }

    //   return this.value || '';
    // },
    // maskAttributes() {
    //   switch (this.mask) {
    //     case 'number':
    //       return {
    //         mask: Number,
    //         thousandsSeparator: '.',
    //         radix: ',',
    //         mapToRadix: ['.'],
    //         scale: 0,
    //         unmask: true,
    //         lazy: true,
    //         ...this.maskOptions,
    //       };
    //     case 'decimal':
    //       return {
    //         mask: Number,
    //         thousandsSeparator: '.',
    //         radix: ',',
    //         mapToRadix: ['.'],
    //         scale: 2,
    //         unmask: true,
    //         lazy: true,
    //         ...this.maskOptions,
    //       };
    //     case 'npwp':
    //       return {
    //         mask: '00.000.000.0-000-000',
    //         lazy: true,
    //         ...this.maskOptions,
    //       };
    //     default:
    //       return this.maskOptions;
    //   }
    // },
    // inputClasses() {
    //   return {
    //     input: true,
    //     'placeholder-value': this.placeholderValue,
    //   };
    // },
  },
  watch: {
    displayModelValue: {
      immediate: true,
      handler(value) {
        if (this.$refs.inputRef && !this.mask) {
          this.$refs.inputRef.value = value == null ? '' : value;
        }
      },
    },
  },
  methods: {
    onInput(event) {
      let inputValue = event;

      if (this.mask) {
        switch (this.mask) {
          case 'number':
          case 'decimal':
            inputValue = inputValue != null && inputValue !== '' ? Number(inputValue) : undefined;
            break;
          default:
            break;
        }
      } else {
        inputValue = event.target.value;
      }

      this.$emit('input', inputValue);
    },
    onChange() {
      this.$emit('change', this.value);
    },
    onFocus() {
      this.$emit('focus');
    },
    onBlur() {
      this.$emit('blur');
    },
    onClear() {
      let clearedValue;
      if (typeof this.value === 'string') {
        clearedValue = '';
      }
      this.$emit('input', clearedValue);
      this.$emit('clear');
    },
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

    /* &.sm {
      height: 60px;
    } */

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
        color: var(--gray-400);
        opacity: 1; /* Firefox */
      }

      &.placeholder-value {
        &::placeholder {
          color: var(--gray-900);
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
        color: var(--gray-400);
        cursor: pointer;
      }
    }

    &:focus-within {
      border-color: var(--gray-900);
    }

    &.disabled {
      background-color: var(--gray-500);
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
      height: 66px;
      border: none;

      &.sm {
        height: 58px;
      }
    }
  }

  .i-input-error {
    padding-top: 8px;
    font-size: var(--size-xs);
    line-height: var(--size-sm);
    color: var(--red-400);
  }
}
</style>
