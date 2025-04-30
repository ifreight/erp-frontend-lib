<template>
  <div class="i-checkbox-group">
    <div ref="checkboxGroup">
      <slot />
    </div>
  </div>
</template>

<script>
import { onUnmounted, provide, ref, useTemplateRef, watch, watchEffect } from 'vue'

export default {
  name: 'ICheckboxGroup',
  props: {
    modelValue: {
      type: Array,
      default: () => []
    }
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const checkedList = ref(props.modelValue)
    const checkboxGroupRef = useTemplateRef('checkboxGroup')

    provide('rootCheckbox', checkedList)

    watch(() => props.modelValue, (value) => {
      checkedList.value = value;
    })

    watchEffect(() => {
      if (checkboxGroupRef.value) {
        checkboxGroupRef.value.addEventListener('click', clickCheckHandler)
      }
    })

    const clickCheckHandler = (e) => {
      const isCheckbox = e.target.type === 'checkbox';
      if (isCheckbox) {
        const targetName = ref(e.target.name)
        if (targetName.value) {
          if (checkedList.value.includes(targetName.value)) {
            const selectedValue = checkedList.value.indexOf(targetName.value)
            checkedList.value.splice(selectedValue, 1)
            emit('update:modelValue', checkedList.value)
          } else {
            checkedList.value.push(targetName.value)
            emit('update:modelValue', checkedList.value)
          }
          emit('change', targetName.value, checkedList.value)
        }
      }
    }

    onUnmounted(() => {
      if (checkboxGroupRef.value) {
        checkboxGroupRef.value.removeEventListener('click', clickCheckHandler)
      }
    })

    return {
      checkboxGroupRef
    }
  }
}
</script>
