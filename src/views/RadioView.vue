<template>
  <div>
    <!-- Normal Radio - true or false -->
    <div>
      <div class="tw:font-bold tw:bg-yellow-800 tw:text-xl">Normal Radio</div>
      <div class="tw:flex tw:mt-6 tw:gap-6">
        <i-radio v-model="normalRadio" :label-value="false" name="normalRadio"> No </i-radio>
        <i-radio v-model="normalRadio" :label-value="true" name="normalRadio"> Yes </i-radio>
      </div>
    </div>

    <!-- Option Radio - be able to use string or number -->
    <div class="tw:mt-10">
      <div class="tw:font-bold tw:bg-yellow-800 tw:text-xl">Option Radio</div>
      <div class="tw:flex tw:mt-6 tw:gap-6">
        <i-radio v-model="optionRadio" :label-value="'optionA'" name="optionRadio">
          Option A
        </i-radio>
        <i-radio v-model="optionRadio" :label-value="'optionB'" name="optionRadio">
          Option B
        </i-radio>
        <i-radio v-model="optionRadio" :label-value="'optionC'" name="optionRadio">
          Option C
        </i-radio>
        <i-radio v-model="optionRadio" :label-value="'optionD'" name="optionRadio">
          Option D
        </i-radio>
      </div>
    </div>

    <!-- Disabled Radio -->
    <div class="tw:mt-10">
      <div class="tw:font-bold tw:bg-yellow-800 tw:text-xl">Disabled Radio + size sm</div>
      <div class="tw:flex tw:mt-6 tw:gap-6">
        <i-radio
          v-model="disabledRadio"
          :label-value="true"
          disabled
          name="disabledRadio"
          size="sm"
        >
          Yes
        </i-radio>
        <i-radio
          v-model="disabledRadio"
          :label-value="false"
          disabled
          name="disabledRadio"
          size="sm"
        >
          No
        </i-radio>
      </div>
    </div>

    <div class="tw:mt-10">
      <div class="tw:font-bold tw:bg-yellow-800 tw:text-xl">
        Button style [type="button"] v-model {{ radio1 }}
      </div>
      <div>default</div>
      <div class="tw:flex tw:gap-2">
        <i-radio
          v-model="radio1"
          :label-value="'optionA'"
          name="buttonRadio"
          type="button"
          class="tw:w-[242px]"
        >
          Option A
        </i-radio>
        <i-radio
          v-model="radio1"
          :label-value="'optionB'"
          name="buttonRadio"
          type="button"
          class="tw:w-[242px]"
        >
          Option B
        </i-radio>
        <i-radio
          v-model="radio1"
          :label-value="'optionC'"
          name="buttonRadio"
          type="button"
          class="tw:w-[242px]"
        >
          Option C
        </i-radio>
      </div>

      <div class="tw:mt-3">plain</div>
      <div class="tw:flex tw:gap-2">
        <i-radio
          v-model="radio1"
          :label-value="'optionA'"
          name="buttonRadio"
          type="button"
          class="tw:w-[242px]"
          plain
        >
          Option A
        </i-radio>
        <i-radio
          v-model="radio1"
          :label-value="'optionB'"
          name="buttonRadio"
          type="button"
          class="tw:w-[242px]"
          plain
        >
          Option B
        </i-radio>
        <i-radio
          v-model="radio1"
          :label-value="'optionC'"
          name="buttonRadio"
          type="button"
          class="tw:w-[242px]"
          plain
        >
          Option C
        </i-radio>
      </div>
    </div>
    <div class="tw:mt-10">
      <div class="tw:font-bold tw:bg-yellow-800 tw:text-xl">Button style Radio</div>
      <div class="tw:flex tw:mt-6 tw:gap-2">
        <i-radio
          v-model="radio2"
          :label-value="'optionA'"
          name="buttonRadio2"
          type="button"
          size="sm"
          class="tw:w-60"
        >
          size="sm"
        </i-radio>
        <i-radio
          v-model="radio2"
          :label-value="'optionA'"
          name="buttonRadio2"
          type="button"
          button-rounded="none"
          class="tw:w-60"
        >
          button-rounded="none"
        </i-radio>
        <i-radio
          v-model="radio2"
          :label-value="'optionA'"
          name="buttonRadio2"
          type="button"
          button-rounded="lg"
          class="tw:w-60"
        >
          button-rounded="lg"
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
    IRadio,
  },
  setup() {
    const normalRadio = ref(false);
    const optionRadio = ref('optionA');
    const disabledRadio = ref(true);
    const radio1 = ref();
    const radio2 = ref();

    return {
      normalRadio,
      optionRadio,
      disabledRadio,
      radio1,
      radio2,
    };
  },
};
</script>
