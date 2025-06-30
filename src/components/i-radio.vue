<template>
  <label
    class="i-radio"
    :class="[
      type,
      size,
      `rounded-${buttonRounded}`,
      {
        checked: modelValue === labelValue,
        disabled,
        plain: plain,
      },
    ]"
  >
    <input
      type="radio"
      :name="name"
      :checked="modelValue === labelValue"
      :disabled="disabled"
      class="i-radio-input"
      v-on:click="onClick"
    />
    <slot />
  </label>
</template>

<script>
export default {
  name: 'IRadio',
  props: {
    modelValue: {
      type: [Boolean, String, Number],
      default: '',
      required: true,
    },
    labelValue: {
      type: [Boolean, String, Number],
      default: '',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'default',
      validator(value) {
        return ['default', 'button'].includes(value);
      },
    },
    size: {
      type: String,
      default: 'base',
      validator(value) {
        return ['sm', 'base'].includes(value);
      },
    },
    buttonRounded: {
      type: String,
      default: 'base',
      validator(value) {
        // none 0, base 4, lg 8
        return ['none', 'base', 'lg'].includes(value);
      },
    },
    plain: Boolean,
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const onClick = () => {
      emit('update:modelValue', props.labelValue);
    };

    return {
      onClick,
    };
  },
};
</script>

<style>
@reference "@/assets/global.css";

.i-radio {
  @apply tw:cursor-pointer tw:text-sm tw:flex tw:items-center;

  &.sm {
    @apply tw:text-xs;
  }

  &.checked {
    @apply tw:font-bold;
  }

  &.disabled {
    @apply tw:text-gray-700 tw:accent-gray-700 tw:bg-transparent tw:cursor-not-allowed;
  }

  .i-radio-input {
    @apply tw:mr-2 tw:accent-gray-900;
  }

  &.button {
    position: relative;
    @apply tw:h-11.5 tw:font-bold tw:border tw:border-gray-500 tw:flex tw:items-center tw:justify-center tw:rounded-sm;

    &.sm {
      @apply tw:h-10;
    }

    &.rounded-none {
      @apply tw:rounded-none;
    }

    &.rounded-lg {
      @apply tw:rounded-lg;
    }

    &.checked {
      @apply tw:border-yellow-800;
    }

    &:not(.plain) {
      &.checked {
        @apply tw:bg-yellow-800;
      }
    }

    .i-radio-input {
      @apply tw:hidden;
    }
  }
}
</style>
