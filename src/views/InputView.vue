<template>
  <div>
    <i-input
      v-model="input1"
      input-id="text"
      name="text"
      label="Input Text"
      class="flex-1"
      clearable
      :maxlength="3"
    />
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
    const input1 = ref('');
    return {
      input1,
    }
  },
}
</script>
