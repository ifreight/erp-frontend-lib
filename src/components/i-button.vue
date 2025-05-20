<template>
  <button
    class="i-button"
    :class="buttonClasses"
    :disabled="disabled"
    @click.stop="$emit('click')"
  >
    <slot name="prepend" />
    <slot />
    <slot name="append" />
  </button>
</template>

<script>
export default {
  name: 'IButton',
  props: {
    plain: Boolean,
    disabled: Boolean,
    error: Boolean,
    text: Boolean,
    size: {
      type: String,
      default: 'base',
      validator(value) {
        return ['xs', 'sm', 'base', 'lg'].includes(value);
      },
    },
    badge: Boolean,
  },
  emits: ['click'],
  computed: {
    buttonClasses() {
      const classes = [];

      if (this.text) {
        classes.push('i-button-text');
      } else {
        classes.push('i-button');

        if (this.plain) {
          classes.push('plain');
        }
        if (this.badge) {
          classes.push('badge');
        }
      }

      if (this.disabled) {
        classes.push('disabled');
      }
      if (this.error) {
        classes.push('error');
      }

      if (this.size !== 'base') {
        classes.push(`${this.size}`);
      }

      return classes;
    },
  },
};
</script>

<style>
@reference "@/assets/global.css";

.i-button {
  @apply tw:w-full tw:rounded-md tw:bg-yellow-800 tw:border tw:border-yellow-800 tw:h-[46px] tw:p-2 tw:cursor-pointer;
  @apply tw:relative tw:font-semibold tw:text-base tw:text-gray-900 tw:flex tw:justify-center tw:items-center;

  &.disabled {
    @apply tw:bg-gray-200 tw:text-gray-400 tw:border-gray-200 tw:pointer-events-none;
  }

  &.error {
    @apply tw:border-2 tw:border-red-400;
  }

  &.plain {
    @apply tw:bg-white;
  }

  &.badge::before {
    position: absolute;
    top: -2px;
    right: -2px;
    width: 8px;
    height: 8px;
    content: '';
    background-color: var(--red-400);
    border-radius: 4px;
  }

  &:hover,
  &:active {
    @apply tw:text-red-700;
  }

  &.lg {
    @apply tw:text-lg;
  }

  &.sm {
    @apply tw:text-sm tw:leading-4 tw:h-[41px];
  }

  &.xs {
    @apply tw:text-xs tw:h-[41px];
  }
}

.i-button-text {
  @apply tw:flex tw:justify-center tw:items-center tw:p-0 tw:border-0 tw:text-yellow-700 tw:font-medium tw:bg-transparent tw:cursor-pointer;

  &.disabled {
    @apply tw:bg-transparent tw:text-gray-400 tw:pointer-events-none;
  }

  &.lg {
    @apply tw:text-lg;
  }

  &.sm {
    @apply tw:text-sm;
  }

  &.xs {
    @apply tw:text-xs;
  }

  &:hover,
  &:active {
    @apply tw:underline;
  }
}
</style>
