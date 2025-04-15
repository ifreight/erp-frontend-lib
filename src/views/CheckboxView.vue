<template>
  <div>
    <!-- Normal Checkbox -->
    <div>
      <div class="tw:font-bold tw:bg-yellow-800 tw:text-xl">Normal Checkbox</div>
      <div class="tw:flex tw:gap-6 tw:mt-6">
        <i-checkbox
          v-model="modelOne"
          theme="dark"
          name="modelOneNormal"
          label="Pilih opsi A"
        />
        <i-checkbox
          v-model="modelTwo"
          theme="dark"
          name="modelTwoNormal"
          label="Pilih opsi B"
        />
      </div>
    </div>

    <!-- Disabled Checkbox -->
    <div class="tw:mt-24">
      <div class="tw:font-bold tw:bg-yellow-800 tw:text-xl">Disabled Checkbox</div>
      <div class="tw:flex tw:gap-6 tw:mt-6">
        <i-checkbox
          v-model="modelOneDisabled"
          disabled
          theme="dark"
          name="modelOneDisabled"
          label="Pilih opsi A"
        />
        <i-checkbox
          v-model="modelTwoDisabled"
          disabled
          theme="dark"
          name="modelTwoDisabled"
          label="Pilih opsi B"
        />
      </div>
    </div>

    <!-- Invalid Checkbox -->
    <div class="tw:mt-24">
      <div class="tw:font-bold tw:bg-yellow-800 tw:text-xl">Invalid Checkbox</div>
      <div class="tw:flex tw:gap-6 tw:mt-6">
        <i-checkbox
          v-model="modelInvalid"
          invalid
          theme="dark"
          name="modelInvalid"
          label="Klik me"
        />
      </div>
    </div>

    <!-- Indeterminate Checkbox -->
    <div class="tw:mt-24">
      <div class="tw:font-bold tw:bg-yellow-800 tw:text-xl">Indeterminate Checkbox</div>
      <div class="tw:flex tw:gap-6 tw:mt-6">
        <!-- Check all checkbox (use indeterminate) -->
        <i-checkbox
          v-model="modelCheckAll"
          :indeterminate="isIndeterminate"
          theme="dark"
          name="modelCheckAll"
          label="Check all"
          @change="changeCheckAllHandler"
        />
        <!-- checkbox group is required -->
        <i-checkbox-group
          v-model="checkedList"
          @change="changeCheckedHandler"
        >
          <!-- use model-label instead (string) -->
          <i-checkbox
            model-label="modelCheckA"
            theme="dark"
            name="modelCheckA"
            label="A"
          />
          <i-checkbox
            model-label="modelCheckB"
            theme="dark"
            name="modelCheckB"
            label="B"
          />
        </i-checkbox-group>
      </div>
    </div>

    <!-- Style Checkbox -->
    <div class="tw:mt-24">
      <div class="tw:font-bold tw:bg-yellow-800 tw:text-xl">Style Checkbox</div>
      <div class="tw:flex tw:gap-16 tw:mt-6">
        <i-checkbox
          v-model="modelStyleA"
          theme="dark"
          name="modelStyleA"
          label="Dark and default size"
        />
        <i-checkbox
          v-model="modelStyleB"
          theme="light"
          size="lg"
          name="modelStyleB"
          label="Light and large size"
        />
        <i-checkbox
          v-model="modelStyleA"
          disabled
          theme="dark"
          size="lg"
          name="modelStyleA"
          label="Dark and large size (disabled)"
        />
        <i-checkbox
          v-model="modelStyleB"
          disabled
          theme="light"
          name="modelStyleB"
          label="Light and default size (disabled)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'

import ICheckbox from '@/components/checkbox/i-checkbox.vue';
import ICheckboxGroup from '@/components/checkbox/i-checkbox-group.vue';

export default {
  components: {
    ICheckbox,
    ICheckboxGroup
  },
  setup() {
    const modelOne = ref(true)
    const modelTwo = ref(false)

    const modelOneDisabled = ref(true)
    const modelTwoDisabled = ref(false)

    const modelInvalid = ref(false)

    const modelCheckAll = ref(false)
    const isIndeterminate = ref(false)
    const checkboxOptions = computed(() => ['modelCheckA', 'modelCheckB'])
    const checkedList = ref(['modelCheckA'])

    const modelStyleA = ref(true)
    const modelStyleB = ref(true)

    const changeCheckAllHandler = () => {
      checkedList.value = modelCheckAll.value ? checkboxOptions.value : []
      isIndeterminate.value = false
    }

    const changeCheckedHandler = () => {
      const checkedCount = checkedList.value.length
      modelCheckAll.value = checkedCount === checkboxOptions.value.length
      isIndeterminate.value = checkedCount > 0 && checkedCount < checkboxOptions.value.length
    }

    return {
      modelOne,
      modelTwo,
      modelOneDisabled,
      modelTwoDisabled,
      modelInvalid,
      modelCheckAll,
      isIndeterminate,
      modelStyleA,
      modelStyleB,
      checkedList,
      changeCheckAllHandler,
      changeCheckedHandler
    }
  }
}
</script>
