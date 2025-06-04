<template>
  <div>
    <!-- Normal sticky bar -->
    <div class="tw:mb-12">
      <div class="tw:font-bold tw:bg-yellow-800 tw:text-xl">Normal sticky bar</div>
      <div class="tw:mt-6">
        <i-checkbox-group v-model="checkedList">
          <i-checkbox model-label="modelOne" name="modelOne" label="One" />
          <i-checkbox model-label="modelTwo" name="modelTwo" label="Two" />
        </i-checkbox-group>
        <span>set left offset (ex: 200px , 10%, 20rem)</span>
        <i-input v-model="leftOffset" />

        <i-sticky-bar v-if="checkedList.length > 0" :left-offset="leftOffset">
          <template #content> {{ checkedList.length }} option(s) selected </template>
          <template #options>
            <div class="tw:flex tw:gap-2.5">
              <i-button text> Cancel </i-button>

              <i-button class="tw:w-[200px]" @click="hideHandler"> Click to hide! </i-button>
            </div>
          </template>
        </i-sticky-bar>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

import IButton from '@/components/i-button.vue';
import IInput from '@/components/i-input.vue';
import ICheckbox from '@/components/checkbox/i-checkbox.vue';
import ICheckboxGroup from '@/components/checkbox/i-checkbox-group.vue';
import IStickyBar from '@/components/i-sticky-bar.vue';

export default {
  components: {
    IButton,
    IInput,
    ICheckbox,
    ICheckboxGroup,
    IStickyBar,
  },
  setup() {
    const checkedList = ref([]);
    const leftOffset = ref('20%');

    const hideHandler = () => {
      checkedList.value.splice(0, checkedList.value.length);
    };

    return {
      checkedList,
      hideHandler,
      leftOffset,
    };
  },
};
</script>
