<template>
  <div class="container-input-view">
    <div>
      <div>Normal + clearable</div>
      <span class="tw:text-red-600">
        v-model:
        <span v-if="input1 === null">ini null</span>
        <span v-else>{{ !input1 ? 'empty bkn null' : `${input1}` }}</span>
      </span>
      <i-input-tel v-model="input1" placeholder="input 1 placeholder" clearable />
    </div>
    <div>
      <div>Normal + clearable (not null when empty isNullWhenEmpty: false)</div>
      <span class="tw:text-red-600">
        v-model:
        <span v-if="input5 === null">ini null</span>
        <span v-else>{{ !input5 ? 'empty bkn null' : `${input5}` }}</span>
      </span>
      <i-input-tel
        v-model="input5"
        placeholder="input 5 placeholder"
        clearable
        :isNullWhenEmpty="false"
      />
    </div>
    <div class="tw:mt-2">
      <div>Disabled</div>
      <i-input-tel v-model="input2" disabled />
    </div>
    <div class="tw:mt-2">
      <div>Read Only</div>
      <span>v-model: {{ input3 }}</span>

      <i-input-tel v-model="input3" readOnly />
    </div>
    <div class="tw:mt-2">
      <div>Invalid</div>
      <span class="tw:text-red-600">
        v-model:
        <span v-if="input4 === null">ini null</span>
        <span v-else>{{ !input4 ? 'empty bkn null' : `${input4}` }}</span>
      </span>

      <i-input-tel v-model="input4" v-model:valid="is4Valid" :invalid="!is4Valid" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import IInputTel from '@/components/input-tel/i-input-tel.vue';

export default {
  components: {
    IInputTel,
  },
  setup() {
    const input1 = ref();
    const input2 = ref('+662323223223');
    const input3 = ref('875626262626');
    const input4 = ref('+628727327227');
    const input5 = ref();
    const is4Valid = ref(true);

    return {
      input1,
      input2,
      input3,
      input4,
      input5,
      is4Valid,
    };
  },
};
</script>
