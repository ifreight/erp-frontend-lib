<template>
  <div class="container-input-view">
    <div>
      Normal + clearable
      <span class="tw:text-red-400 tw:ml-1">
        v-model:
        <span v-if="input1 === null">ini null</span>
        <span v-else>{{ !input1 ? 'empty bkn null' : `${input1}` }}</span>
      </span>
    </div>
    <i-input
      v-model="input1"
      input-id="Text1"
      name="text"
      class="tw:flex-1 tw:mb-2"
      clearable
      placeholder="max 3"
    />
    <div>
      Normal + clearable (not null if empty)
      <span class="tw:text-red-400 tw:ml-1">
        v-model:
        <span v-if="input10 === null">ini null</span>
        <span v-else>{{ !input10 ? 'empty bkn null' : `${input10}` }}</span>
      </span>
    </div>
    <i-input
      v-model="input10"
      input-id="Text10"
      name="text"
      class="tw:flex-1 tw:mb-2"
      clearable
      placeholder="max 3"
      :isNullWhenEmpty="false"
    />
    <div>
      Contoh Invalid
      <span class="tw:text-red-400 tw:ml-1">
        v-model:
        <span v-if="input2 === null">ini null</span>
        <span v-else>{{ !input2 ? 'empty bkn null' : `${input2}` }}</span>
      </span>
    </div>
    <i-input
      v-model="input2"
      input-id="Text2"
      name="text"
      class="tw:flex-1 tw:mb-2"
      :invalid="true"
      errorMessage="Error Message"
    />
    <div>Disabled</div>
    <span>v-model: {{ input3 }}</span>
    <i-input
      v-model="input3"
      input-id="Text3"
      name="text"
      class="tw:flex-1 tw:mb-2"
      :disabled="true"
      placeholder="disabled placholder"
    />
    <div>
      Prepend, append and max length
      <span class="tw:text-red-400 tw:ml-1">
        v-model:
        <span v-if="input4 === null">ini null</span>
        <span v-else>{{ !input4 ? 'empty bkn null' : `${input4}` }}</span>
      </span>
    </div>
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
    <div>
      Borderless + password type
      <span class="tw:text-red-400 tw:ml-1">
        v-model:
        <span v-if="input5 === null">ini null</span>
        <span v-else>{{ !input5 ? 'empty bkn null' : `${input5}` }}</span>
      </span>
    </div>
    <i-input
      v-model="input5"
      input-id="Text5"
      name="text"
      class="tw:flex-1 tw:mb-2"
      clearable
      type="password"
      borderless
    />
    <div>
      Decimal type
      <span class="tw:text-red-400 tw:ml-1">
        v-model:
        <span v-if="input6 === null">ini null</span>
        <span v-else>{{ !input6 ? 'empty bkn null' : `${input6}` }}</span>
      </span>
    </div>
    <i-input
      v-model="input6"
      input-id="Text6"
      name="text"
      class="tw:flex-1 tw:mb-2"
      clearable
      mask="decimal"
    />
    <div>
      Number type + rounded (default/xs 2px, sm 4px, lg 8px, xl 12px)
      <span class="tw:text-red-400 tw:ml-1">
        v-model:
        <span v-if="input7 === null">ini null</span>
        <span v-else>{{ !input7 ? 'empty bkn null' : `${input7}` }}</span>
      </span>
    </div>
    <i-input
      v-model="input7"
      input-id="Text7"
      name="text"
      class="tw:flex-1 tw:mb-2"
      clearable
      mask="number"
      rounded="lg"
    />
    <div>
      Date type + readonly + size sm
      <span class="tw:text-red-400 tw:ml-1">
        v-model:
        <span v-if="input8 === null">ini null</span>
        <span v-else>{{ !input8 ? 'empty bkn null' : `${input8}` }}</span>
      </span>
    </div>
    <i-input
      v-model="input8"
      input-id="Text8"
      name="text"
      class="tw:flex-1 tw:mb-2"
      size="sm"
      clearable
      readOnly
    />

    <div>Number mask NPWP + rounded (default/xs 2px, sm 4px, lg 8px, xl 12px)</div>
    <span>v-model: {{ input9 }}</span>
    <i-input
      v-model="input9"
      input-id="Text9"
      name="text"
      class="tw:flex-1 tw:mb-2"
      clearable
      mask="npwp"
      rounded="lg"
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
    const input2 = ref('');
    const input3 = ref('999');
    const input4 = ref(undefined);
    const input5 = ref('password');
    const input6 = ref(Math.round(123.453 * 100) / 100);
    const input7 = ref(0);
    // const input7 = ref(null);
    const input8 = ref(new Date());
    // const input8 = ref(null);
    const input9 = ref(null);
    const input10 = ref('');

    return {
      input1,
      input2,
      input3,
      input4,
      input5,
      input6,
      input7,
      input8,
      input9,
      input10,
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
