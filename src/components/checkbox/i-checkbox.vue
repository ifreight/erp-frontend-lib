<template>
  <label
    class="i-checkbox"
    :class="disabled ? 'disabled' : ''"
  >
    <span
      class="i-checkbox-input"
      :class="{
        checked: modelValue,
        disabled,
        invalid
      }"
    >
      <input
        type="checkbox"
        :name="name"
        :checked="modelValue"
        :disabled="disabled"
        v-on:click="onClick"
      />
      <ic-dash
        v-if="indeterminate"
        class="i-checkbox-icon"
      />
      <ic-check
        v-else
        class="i-checkbox-icon"
      />
    </span>

    <slot>
      <span
        class="ml-6"
        :class="disabled ? 'text-gray-700' : ''"
      >
        {{ label }}
      </span>
    </slot>
  </label>
</template>

<script>
import { inject, provide } from 'vue';

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
      default: false
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
    const onClick = () => {
      emit('update:modelValue', !props.modelValue)
    }

    return {
      onClick
    }
  }
}
</script>

<style>
@reference '../../assets/global.css';

.i-checkbox {
  @apply flex items-center relative cursor-pointer m-0 z-1;

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
