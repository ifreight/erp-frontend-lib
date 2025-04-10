<template>
  <div class="container-input-view">
    <div>normal + clearable</div>
    <i-input
      v-model="input1"
      input-id="Text1"
      name="text"
      label="Input Text"
      class="flex-1 mb-2"
      clearable
      placeholder="max 3"
    />
    <div>invalid</div>
    <i-input
      v-model="input2"
      input-id="Text2"
      name="text"
      label="Input Text"
      class="flex-1 mb-2"
      :invalid="true"
      errorMessage="Error Message"
    />
    <div>disabled</div>
    <i-input
      v-model="input3"
      input-id="Text3"
      name="text"
      label="Input Text"
      class="flex-1 mb-2"
      :disabled="true"
      placeholder="disabled placholder"
    />
    <div>prepend, append and max length</div>
    <i-input
      v-model="input4"
      input-id="Text4"
      name="text"
      label="Input Text"
      class="flex-1 mb-2"
      clearable
      :maxlength="3"
      placeholder="placeholder max 3"
    >
      <template #prepend><ic-calendar /></template>
      <template #append><ic-calendar /></template>
    </i-input>
    <div>borderless + password type</div>
    <i-input
      v-model="input5"
      input-id="Text5"
      name="text"
      label="Input Text"
      class="flex-1 mb-2"
      clearable
      type="password"
      borderless
    />
    <div>number type</div>
    <i-input
      v-model="input6"
      input-id="Text6"
      name="text"
      label="Input Number"
      class="flex-1 mb-2"
      clearable
      type="number"
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
    const input6 = ref(123123);

    return {
      input1,
      input2,
      input3,
      input4,
      input5,
      input6,
    }
  },
}
</script>

<style scss>
@reference "../assets/global.css";

.container-input-view {
  @apply h-full;
}
</style>
