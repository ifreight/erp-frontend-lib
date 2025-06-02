<template>
  <div class="container-input-view">
    <div>Normal + clearable</div>
    <i-input
      v-model="input1"
      input-id="Text1"
      name="text"
      class="tw:flex-1 tw:mb-2"
      clearable
      placeholder="max 3"
    />
    <div>Invalid</div>
    <i-input
      v-model="input2"
      input-id="Text2"
      name="text"
      class="tw:flex-1 tw:mb-2"
      :invalid="true"
      errorMessage="Error Message"
    />
    <div>Disabled</div>
    <i-input
      v-model="input3"
      input-id="Text3"
      name="text"
      class="tw:flex-1 tw:mb-2"
      :disabled="true"
      placeholder="disabled placholder"
    />
    <div>Prepend, append and max length</div>
    <i-input
      v-model="input4"
      input-id="Text4"
      name="text"
      class="tw:flex-1 tw:mb-2"
      clearable
      :maxlength="3"
      placeholder="placeholder max 3"
    >
      <template #prepend><ic-calendar /></template>
      <template #append><ic-calendar /></template>
    </i-input>
    <div>Borderless + password type</div>
    <i-input
      v-model="input5"
      input-id="Text5"
      name="text"
      class="tw:flex-1 tw:mb-2"
      clearable
      type="password"
      borderless
    />
    <div>Decimal type</div>
    <i-input
      v-model="input6"
      input-id="Text6"
      name="text"
      class="tw:flex-1 tw:mb-2"
      clearable
      mask="decimal"
    />
    <div>Number type + rounded (default/xs 2px, sm 4px, lg 8px, xl 12px)</div>
    <i-input
      v-model="input7"
      input-id="Text7"
      name="text"
      class="tw:flex-1 tw:mb-2"
      clearable
      mask="number"
      rounded="lg"
    />
    <div>Date type + readonly + size sm</div>
    <i-input
      v-model="input8"
      input-id="Text8"
      name="text"
      class="tw:flex-1 tw:mb-2"
      size="sm"
      clearable
      readOnly
    />
  </div>
</template>

<script>
import { ref } from 'vue';
import IInput from '@/components/i-input.vue';
import IcCalendar from '@/icons/ic-calendar.vue';

export default {
  components: {
    IInput,
    IcCalendar,
  },
  setup() {
    const input1 = ref('999');
    const input2 = ref('999');
    const input3 = ref('999');
    const input4 = ref('');
    const input5 = ref('password');
    const input6 = ref(Math.round(123.453 * 100) / 100);
    const input7 = ref(100000);
    const input8 = ref(new Date());

    return {
      input1,
      input2,
      input3,
      input4,
      input5,
      input6,
      input7,
      input8,
    };
  },
};
</script>

<style>
@reference "@/assets/global.css";

.container-input-view {
  @apply tw:h-full;
}
</style>
