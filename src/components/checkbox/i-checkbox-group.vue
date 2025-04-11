<template>
  <div class="i-checkbox-group">
    <div ref="checkboxGroup">
      <slot />
    </div>
  </div>
</template>

<script>

export default {
  name: 'ICheckboxGroup',
  props: {
    modelValue: {
      type: Array,
      default: () => []
    }
  },
  emits: ['update:modelValue'],
  setup({ emit }) {


    return {

    }
  }
}
</script>
