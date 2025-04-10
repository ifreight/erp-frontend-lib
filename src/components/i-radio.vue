<template>
  <label
    class="i-radio"
    :class="{
      checked: modelValue === labelValue,
      disabled
    }"
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
      required: true
    },
    labelValue: {
      type: [Boolean, String, Number],
      default: '',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const onClick = () => {
      emit('update:modelValue', props.labelValue);
    }

    return {
      onClick
    }
  }
}
</script>

<style>
@reference "../assets/global.css";

.i-radio {
  @apply cursor-pointer;

  &.checked {
    @apply font-bold;
  }

  &.disabled {
    @apply text-gray-700 accent-gray-700 cursor-not-allowed;
  }

  .i-radio-input {
    @apply mr-2 accent-gray-900;
  }
}
</style>
