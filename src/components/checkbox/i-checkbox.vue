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
        'text-gray-700': disabled,
        'ml-2.5': indeterminate,
        'ml-6': !indeterminate
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
  @apply flex items-center relative cursor-pointer m-0 z-1;

  .i-checkbox-dash-icon {
    @apply opacity-100 text-white bg-gray-900 w-3.5 h-3.5 rounded-xs p-0.5;
  }

  .i-checkbox-input {
    @apply border border-gray-900 rounded-xs w-3.5 h-3.5 absolute;

    .i-checkbox-icon {
      @apply opacity-0 w-3.5 h-3.5;
    }

    input[type='checkbox'] {
      @apply hidden;

      &:checked {
        + .i-checkbox-icon {
          @apply opacity-100 text-white bg-gray-900 rounded-xs p-0.5;
        }
      }

      &:disabled {
        + .i-checkbox-icon {
          @apply bg-gray-700;
        }
      }
    }

    &.checked {
      @apply border-none;
    }

    &.disabled {
      @apply border-gray-700 cursor-not-allowed;
    }

    &.invalid {
      @apply border-red-300;
    }
  }

  &.disabled {
    @apply cursor-not-allowed;
  }
}
</style>
