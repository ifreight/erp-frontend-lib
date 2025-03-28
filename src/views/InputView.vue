<template>
  <div class="container-input-view">
    <div>normal</div>
    <i-input
      v-model="input1"
      input-id="text"
      name="text"
      label="Input Text"
      class="flex-1"
      clearable
      :maxlength="3"
      placeholder="max 3"
    />
    <div>invalid</div>
    <i-input
      v-model="input1"
      input-id="text"
      name="text"
      label="Input Text"
      class="flex-1"
      clearable
      :invalid="true"
      :maxlength="3"
    />
    <div>disabled</div>
    <i-input
      v-model="input1"
      input-id="text"
      name="text"
      label="Input Text"
      class="flex-1"
      clearable
      :disabled="true"
      :maxlength="3"
      placeholder="disabled placholder"
    />
    <div>normal</div>
    <i-input
      v-model="input1"
      input-id="text"
      name="text"
      label="Input Text"
      class="flex-1"
      clearable
      :maxlength="3"
      placeholder="max 3"
    >
      <template #prepend>x</template>
    </i-input>
  </div>
</template>

<script>
import { ref } from 'vue';
import IInput from '@/components/i-input.vue';

export default {
  components: {
    IInput,
  },
  setup() {
    const input1 = ref('999');
    return {
      input1,
    }
  },
}
</script>

<style scss>
@reference "../assets/global.css";

.container-input-view {
  @apply h-full bg-brown-600;
}
</style>
