<template>
  <div>
    <!-- Normal Checkbox -->
    <div>
      <div class="font-bold bg-amber-300 text-xl">Normal Checkbox</div>
      <div class="flex gap-6 mt-6">
        <i-checkbox
          v-model="modelOne"
          name="modelOneNormal"
          label="Pilih opsi A"
        />
        <i-checkbox
          v-model="modelTwo"
          name="modelTwoNormal"
          label="Pilih opsi B"
        />
      </div>
    </div>

    <!-- Disabled Checkbox -->
    <div class="mt-24">
      <div class="font-bold bg-amber-300 text-xl">Disabled Checkbox</div>
      <div class="flex gap-6 mt-6">
        <i-checkbox
          v-model="modelOneDisabled"
          disabled
          name="modelOneDisabled"
          label="Pilih opsi A"
        />
        <i-checkbox
          v-model="modelTwoDisabled"
          disabled
          name="modelTwoDisabled"
          label="Pilih opsi B"
        />
      </div>
    </div>

    <!-- Invalid Checkbox -->
    <div class="mt-24">
      <div class="font-bold bg-amber-300 text-xl">Invalid Checkbox</div>
      <div class="flex gap-6 mt-6">
        <i-checkbox
          v-model="modelInvalid"
          invalid
          name="modelInvalid"
          label="Klik me"
        />
      </div>
    </div>

    <!-- Indeterminate Checkbox -->
    <div class="mt-24">
      <div class="font-bold bg-amber-300 text-xl">Indeterminate Checkbox</div>
      <div class="flex gap-6 mt-6">
        <i-checkbox
          v-model="modelCheckAll"
          :indeterminate="isIndeterminate"
          name="modelCheckAll"
          label="Check all"
        />
        <i-checkbox-group v-model="checkOptions">
          <i-checkbox
            :model-label="'modelCheckA'"
            name="modelCheckA"
            label="A"
          />
          <i-checkbox
            :model-label="'modelCheckB'"
            name="modelCheckB"
            label="B"
          />
        </i-checkbox-group>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

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
    // const modelCheckA = ref(false)
    // const modelCheckB = ref(false)
    const isIndeterminate = ref(false)
    const checkOptions = ref(['modelCheckA', 'modelCheckB'])

    return {
      modelOne,
      modelTwo,
      modelOneDisabled,
      modelTwoDisabled,
      modelInvalid,
      modelCheckAll,
      // modelCheckA,
      // modelCheckB,
      isIndeterminate,
      checkOptions
    }
  }
}
</script>
