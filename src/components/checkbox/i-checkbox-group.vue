<template>
  <div class="i-checkbox-group">
    <div ref="checkboxGroup">
      <slot />
    </div>
  </div>
</template>

<script>
// import { onMounted, ref, useSlots, useTemplateRef, watchEffect } from 'vue';

export default {
  name: 'ICheckboxGroup',
  props: {
    modelValue: {
      type: Array,
      default: () => []
    }
  },
  setup() {
    // const checkAll = ref(false)
    // const checkList = ref([])
    // const checked = ref([])
    // const checkboxGroupRef = useTemplateRef('checkboxGroup')

    // const loadCheckList = () => {
    //   const filterCheckList = useSlots().default().filter((item) => item.type.name && item.type.name === 'ICheckbox' && item.props.indeterminate !== '')
    //   const propsCheckList = filterCheckList.map((item) => item.props.name)
    //   checkList.value = propsCheckList

    //   const filterCheckAll = useSlots().default().filter((item) => item.type.name && item.type.name === 'ICheckbox' && item.props.indeterminate === '')
    //   checkAll.value = filterCheckAll[0].props.modelValue
    // }

    // watchEffect(() => {
    //   if (checkboxGroupRef.value) {
    //     checkboxGroupRef.value.addEventListener('click', clickCheckHandler)
    //   }
    // })

    // onMounted(() => {
    //   loadCheckList();
    // })

    // const clickCheckHandler = (e) => {
    //   if (e.target.name) {
    //     if (e.target.name.includes(checkList.value) && !e.target.name.includes(checked.value)) {
    //       checked.value.push(e.target.name)
    //       checkAll.value = true
    //     }
    //   }
    // }

    // return {
    //   checkList,
    //   clickCheckHandler,
    // }
  }
}
</script>
