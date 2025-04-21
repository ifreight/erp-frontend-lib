<template>
  <div class="container-input-view">
    <div>Normal + clearable</div>
    <i-input-tel v-model="input1" />
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

    return {
      input1,
    }
  },
}
</script>
