<template>
  <label
    class="i-checkbox"
    :class="disabled ? 'disabled' : ''"
  >
    <span
      class="i-checkbox-input"
      :class="checkboxInputClass"
    >
      <input
        type="checkbox"
        :name="name"
        :checked="isChecked"
        :disabled="disabled"
        :class="elementInputClass"
        v-on:click="onClick"
      />
      <ic-check
        class="i-checkbox-icon"
        :class="checkboxInputClass"
      />
    </span>

    <ic-dash
      v-if="indeterminate"
      class="i-checkbox-dash-icon"
      :class="checkboxInputClass"
    />

    <slot>
      <span :class="spanClass">
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
    IcDash
  },
  props: {
    modelValue: {
      type: Boolean,
      default: null,
      required: false
    },
    modelLabel: {
      type: String,
      default: null,
      required: false
    },
    label: {
      type: String,
      required: false
    },
    name: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    indeterminate: {
      type: Boolean,
      default: false
    },
    invalid: {
      type: Boolean,
      default: false,
      required: false
    },
    size: {
      type: String,
      default: 'base',
      validator(value) {
        return ['base', 'lg'].includes(value)
      }
    },
    light: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const isChecked = ref(false)
    const rootChecked = inject('rootCheckbox', null)

    const checkboxInputClass = computed(() => {
      const classes = ref([])

      if (isChecked.value) {
        classes.value.push('checked')
      }
      if (props.disabled) {
        classes.value.push('disabled')
      }
      if (props.invalid) {
        classes.value.push('invalid')
      }
      if (props.size !== 'base') {
        classes.value.push(`${props.size}`)
      }
      if (props.light) {
        classes.value.push('light')
      }

      return classes.value
    })

    const elementInputClass = computed(() => {
      const classes = ref([])

      if (props.size !== 'base') {
        classes.value.push(`${props.size}`)
      }
      if (props.light) {
        classes.value.push('light')
      }

      return classes.value
    })

    const spanClass = computed(() => {
      const classes = ref([])

      if (props.size == 'base') {
        classes.value.push({
          'tw:text-gray-700': props.disabled,
          'tw:ml-2.5': props.indeterminate,
          'tw:ml-6': !props.indeterminate
        })
      } else {
        classes.value.push({
          'tw:text-gray-700': props.disabled,
          'tw:ml-3': props.indeterminate,
          'tw:ml-8': !props.indeterminate
        })
      }

      return classes.value
    })

    watch(() => props.modelValue, (value) => {
      if (!props.modelLabel) {
        isChecked.value = value
      }
    }, { immediate: true })

    watch(() => rootChecked, (value) => {
      if (value) {
        if (props.modelLabel) {
          if (value.value.includes(props.modelLabel)) {
            isChecked.value = true
          } else {
            isChecked.value = false
          }
        }
      }
    }, { deep: true })

    onMounted(() => {
      if (props.modelLabel) {
        if (rootChecked && rootChecked.value.includes(props.modelLabel)) {
          isChecked.value = true
        }
      }
    })

    const onClick = () => {
      emit('update:modelValue', !isChecked.value)
    }

    return {
      isChecked,
      rootChecked,
      checkboxInputClass,
      elementInputClass,
      spanClass,
      onClick
    }
  }
}
</script>

<style>
@reference '@/assets/global.css';

.i-checkbox {
  @apply tw:flex tw:items-center tw:relative tw:cursor-pointer tw:m-0 tw:z-1;

  .i-checkbox-dash-icon {
    @apply tw:opacity-100 tw:bg-gray-900 tw:text-white tw:w-3.5 tw:h-3.5 tw:rounded-xs tw:p-0.5;

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
    @apply tw:border tw:border-gray-900 tw:rounded-xs tw:w-3.5 tw:h-3.5 tw:absolute;

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
