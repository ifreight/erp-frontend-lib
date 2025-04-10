<template>
  <div>
    <!-- Normal Radio - true or false -->
    <div>
      <div class="font-bold bg-amber-300 text-xl">Normal Radio</div>
      <div class="flex mt-6 gap-6">
        <i-radio
          v-model="normalRadio"
          :label-value="false"
          name="normalRadio"
        >
          No
        </i-radio>
        <i-radio
          v-model="normalRadio"
          :label-value="true"
          name="normalRadio"
        >
          Yes
        </i-radio>
      </div>
    </div>

    <!-- Option Radio - be able to use string or number -->
    <div class="mt-24">
      <div class="font-bold bg-amber-300 text-xl">Option Radio</div>
      <div class="flex mt-6 gap-6">
        <i-radio
          v-model="optionRadio"
          :label-value="'optionA'"
          name="optionRadio"
        >
          Option A
        </i-radio>
        <i-radio
          v-model="optionRadio"
          :label-value="'optionB'"
          name="optionRadio"
        >
          Option B
        </i-radio>
        <i-radio
          v-model="optionRadio"
          :label-value="'optionC'"
          name="optionRadio"
        >
          Option C
        </i-radio>
        <i-radio
          v-model="optionRadio"
          :label-value="'optionD'"
          name="optionRadio"
        >
          Option D
        </i-radio>
      </div>
    </div>

    <!-- Disabled Radio -->
    <div class="mt-24">
      <div class="font-bold bg-amber-300 text-xl">Disabled Radio</div>
      <div class="flex mt-6 gap-6">
        <i-radio
          v-model="disabledRadio"
          :label-value="true"
          disabled
          name="disabledRadio"
        >
          Yes
        </i-radio>
        <i-radio
          v-model="disabledRadio"
          :label-value="false"
          disabled
          name="disabledRadio"
        >
          No
        </i-radio>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

import IRadio from '@/components/i-radio.vue';

export default {
  components: {
    IRadio
  },
  setup() {
    const normalRadio = ref(false);
    const optionRadio = ref('optionA');
    const disabledRadio = ref(true);

    return {
      normalRadio,
      optionRadio,
      disabledRadio
    }
  }
}
</script>
