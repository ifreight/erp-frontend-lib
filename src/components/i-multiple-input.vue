<template>
  <div ref="wrapperRef" class="i-multiple-input">
    <div class="i-multiple-input-content" :class="multipleInputContentClasses">
      <slot :focused="focused" />
    </div>

    <div v-if="errorMessage" class="i-error-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useFocusWithin } from '@vueuse/core';

export default {
  name: 'IMultipleInput',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    invalid: {
      type: Boolean,
      default: false,
    },
    filled: {
      type: Boolean,
      default: false,
    },
    errorMessage: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const wrapperRef = ref();
    const { focused } = useFocusWithin(wrapperRef);

    const multipleInputContentClasses = computed(() => {
      const classes = ref([]);

      if (props.filled) {
        classes.value.push('filled');
      }

      if (props.disabled) {
        classes.value.push('disabled');
      }

      if (props.invalid) {
        classes.value.push('invalid');
      }

      return classes.value;
    });

    return {
      focused,
      multipleInputContentClasses,
      wrapperRef,
    };
  },
};
</script>

<style>
@reference "@/assets/global.css";

.i-multiple-input {
  .i-multiple-input-content {
    @apply tw:flex tw:items-center tw:w-auto tw:h-12 tw:bg-white tw:border tw:border-gray-500 tw:rounded-lg tw:px-3 tw:py-2;

    &.disabled {
      @apply tw:bg-gray-300;
    }

    &:focus-within {
      @apply tw:border-gray-700;
    }

    &.invalid {
      @apply tw:border-red-300;
    }

    .i-button {
      @apply tw:text-xs tw:h-[41px];

      &.i-button-text {
        @apply tw:text-base;
      }
    }

    .i-select {
      .i-input {
        .i-input-container {
          @apply tw:h-8 tw:rounded-lg;

          .input {
            @apply tw:text-xs;
          }
        }
      }
    }
  }
}
</style>
