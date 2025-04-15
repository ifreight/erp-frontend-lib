<template>
  <label
    class="i-checkbox"
    :class="disabled ? 'disabled' : ''"
  >
    <span
      class="i-checkbox-input"
      :class="{
        checked: isChecked,
        disabled,
        invalid
      }"
    >
      <input
        type="checkbox"
        :name="name"
        :checked="isChecked"
        :disabled="disabled"
        v-on:click="onClick"
      />
      <ic-check class="i-checkbox-icon" />
    </span>

    <ic-dash
      v-if="indeterminate"
      class="i-checkbox-dash-icon"
    />

    <slot>
      <span :class="{
        'tw:text-gray-700': disabled,
        'tw:ml-2.5': indeterminate,
        'tw:ml-6': !indeterminate
      }">
        {{ label }}
      </span>
    </slot>
  </label>
</template>

<script>
import { inject, onMounted, ref, watch } from 'vue';

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
      required: true
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
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const isChecked = ref(false)
    const rootChecked = inject('rootCheckbox', null)

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
    @apply tw:opacity-100 tw:text-white tw:bg-gray-900 tw:w-3.5 tw:h-3.5 tw:rounded-xs tw:p-0.5;
  }

  .i-checkbox-input {
    @apply tw:border tw:border-gray-900 tw:rounded-xs tw:w-3.5 tw:h-3.5 tw:absolute;

    .i-checkbox-icon {
      @apply tw:opacity-0 tw:w-3.5 tw:h-3.5;
    }

    input[type='checkbox'] {
      @apply tw:hidden;

      &:checked {
        + .i-checkbox-icon {
          @apply tw:opacity-100 tw:text-white tw:bg-gray-900 tw:rounded-xs tw:p-0.5;
        }
      }

      &:disabled {
        + .i-checkbox-icon {
          @apply tw:bg-gray-700;
        }
      }
    }

    &.checked {
      @apply tw:border-none;
    }

    &.disabled {
      @apply tw:border-gray-700 tw:cursor-not-allowed tw:bg-transparent;
    }

    &.invalid {
      @apply tw:border-red-300;
    }
  }

  &.disabled {
    @apply tw:cursor-not-allowed tw:bg-transparent;
  }
}
</style>
