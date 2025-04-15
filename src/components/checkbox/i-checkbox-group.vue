<template>
  <div class="i-checkbox-group">
    <div ref="checkboxGroup">
      <slot />
    </div>
  </div>
</template>

<script>
import { onMounted, provide, ref, useTemplateRef, watch, watchEffect } from 'vue'

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

    onMounted(() => {
      emit('change')
    })

    const clickCheckHandler = (e) => {
      if (e.target.name) {
        const targetName = ref(e.target.name)
        if (checkedList.value.includes(targetName.value)) {
          const selectedValue = checkedList.value.indexOf(targetName.value)
          checkedList.value.splice(selectedValue, 1)
          emit('update:modelValue', checkedList.value)
        } else {
          checkedList.value.push(targetName.value)
          emit('update:modelValue', checkedList.value)
        }
      }
      emit('change')
    }
  }
}
</script>
