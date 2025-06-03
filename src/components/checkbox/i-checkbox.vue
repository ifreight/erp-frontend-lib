<template>
  <label class="i-checkbox" :class="disabled ? 'disabled' : ''">
    <span class="i-checkbox-input" :class="checkboxInputClass">
      <input
        type="checkbox"
        :name="name"
        :checked="isChecked"
        :disabled="disabled"
        :class="elementInputClass"
        @click="onClick"
        @change="onChange"
      />
      <ic-check class="i-checkbox-icon" :class="checkboxInputClass" />
    </span>

    <ic-dash v-if="indeterminate" class="i-checkbox-dash-icon" :class="checkboxInputClass" />

    <slot>
      <span v-if="label" :class="spanClass">
        {{ label }}
      </span>
    </slot>
  </label>
</template>

<script>
import { computed, inject, onMounted, ref, watch } from 'vue';

import IcCheck from '@/icons/ic-check.vue';
import IcDash from '@/icons/ic-dash.vue';

export default {
  name: 'ICheckbox',
  components: {
    IcCheck,
    IcDash,
  },
  props: {
    modelValue: {
      type: Boolean,
      default: null,
      required: false,
    },
    modelLabel: {
      type: String,
      default: null,
      required: false,
    },
    label: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    indeterminate: {
      type: Boolean,
      default: false,
    },
    invalid: {
      type: Boolean,
      default: false,
      required: false,
    },
    size: {
      type: String,
      default: 'base',
      validator(value) {
        return ['base', 'lg'].includes(value);
      },
    },
    light: {
      type: Boolean,
      default: false,
    },
    checkboxRounded: {
      type: String,
      default: null,
      validator(value) {
        return ['sm', 'md', 'lg'].includes(value);
      },
    },
    checkboxBorderColor: {
      type: String,
      default: null,
      validator(value) {
        return ['gray-300', 'gray-500', 'gray-700'].includes(value);
      },
    },
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const isChecked = ref(false);
    const rootChecked = inject('rootCheckbox', null);

    const checkboxInputClass = computed(() => {
      const classes = [
        `rounded-${props.checkboxRounded}`,
        `border-color-${props.checkboxBorderColor}`,
      ];

      if (isChecked.value) {
        classes.push('checked');
      }
      if (props.disabled) {
        classes.push('disabled');
      }
      if (props.invalid) {
        classes.push('invalid');
      }
      if (props.size !== 'base') {
        classes.push(props.size);
      }
      if (props.light) {
        classes.push('light');
      }

      return classes;
    });

    const elementInputClass = computed(() => {
      const classes = ref([]);

      if (props.size !== 'base') {
        classes.value.push(`${props.size}`);
      }
      if (props.light) {
        classes.value.push('light');
      }

      return classes.value;
    });

    const spanClass = computed(() => {
      const classes = ref([]);

      if (props.size == 'base') {
        classes.value.push('tw:ml-2.5', {
          'tw:text-gray-700': props.disabled,
        });
      } else {
        classes.value.push('tw:ml-3', {
          'tw:text-gray-700': props.disabled,
        });
      }

      return classes.value;
    });

    watch(
      () => props.modelValue,
      (value) => {
        if (!props.modelLabel) {
          isChecked.value = value;
        }
      },
      { immediate: true },
    );

    watch(
      () => rootChecked,
      (value) => {
        if (value) {
          if (props.modelLabel) {
            if (value.value.includes(props.modelLabel)) {
              isChecked.value = true;
            } else {
              isChecked.value = false;
            }
          }
        }
      },
      { deep: true },
    );

    onMounted(() => {
      if (props.modelLabel) {
        if (rootChecked && rootChecked.value.includes(props.modelLabel)) {
          isChecked.value = true;
        }
      }
    });

    const onClick = () => {
      emit('update:modelValue', !isChecked.value);
    };

    const onChange = (event) => {
      emit('change', event, isChecked.value);
    };

    return {
      isChecked,
      rootChecked,
      checkboxInputClass,
      elementInputClass,
      spanClass,
      onClick,
      onChange,
    };
  },
};
</script>

<style>
@reference '@/assets/global.css';

.i-checkbox {
  @apply tw:flex tw:items-center tw:relative tw:cursor-pointer tw:m-0 tw:z-1;

  .i-checkbox-dash-icon {
    @apply tw:opacity-100 tw:bg-gray-900 tw:text-white tw:w-3.5 tw:h-3.5 tw:rounded-xs tw:p-0.5 tw:absolute;

    &.disabled {
      @apply tw:bg-gray-700;

      &.light {
        @apply tw:text-gray-700 tw:bg-transparent;
      }
    }

    &.lg {
      @apply tw:w-5 tw:h-5;
    }

    &.light {
      @apply tw:bg-transparent tw:text-gray-900;
    }
  }

  .i-checkbox-input {
    @apply tw:border tw:border-gray-900 tw:rounded-xs tw:w-3.5 tw:h-3.5;

    &.rounded-sm {
      @apply tw:rounded-sm;
    }

    &.rounded-md {
      @apply tw:rounded-md;
    }

    &.rounded-lg {
      @apply tw:rounded-lg;
    }

    &.border-color-gray-300 {
      @apply tw:border-gray-300;
    }

    &.border-color-gray-500 {
      @apply tw:border-gray-500;
    }

    &.border-color-gray-700 {
      @apply tw:border-gray-700;
    }

    .i-checkbox-icon {
      @apply tw:opacity-0 tw:w-3.5 tw:h-3.5;

      &.lg {
        @apply tw:w-5 tw:h-5;
      }
    }

    input[type='checkbox'] {
      @apply tw:hidden;

      &:checked {
        + .i-checkbox-icon {
          @apply tw:opacity-100 tw:text-white tw:bg-gray-900 tw:rounded-xs tw:p-0.5;
        }

        &.light {
          + .i-checkbox-icon {
            @apply tw:opacity-100 tw:text-gray-900 tw:rounded-xs tw:p-0.5 tw:border tw:border-gray-700 tw:bg-transparent;
          }
        }
      }

      &:disabled {
        + .i-checkbox-icon {
          @apply tw:bg-gray-700;
        }

        &.light {
          + .i-checkbox-icon {
            @apply tw:text-gray-700 tw:bg-transparent;
          }
        }
      }
    }

    &.checked {
      @apply tw:border-none;
    }

    &.disabled,
    &.disabled.light {
      @apply tw:cursor-not-allowed tw:bg-transparent tw:border-gray-700;
    }

    &.invalid,
    &.invalid.light {
      @apply tw:border-red-300;
    }

    &.lg {
      @apply tw:w-5 tw:h-5;
    }

    &.light {
      @apply tw:border-gray-700;
    }
  }

  &.disabled {
    @apply tw:cursor-not-allowed tw:bg-transparent;
  }
}
</style>
