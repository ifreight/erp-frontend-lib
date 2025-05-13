<template>
  <div>
    <!-- Normal sticky bar -->
    <div class="tw:mb-12">
      <div class="tw:font-bold tw:bg-yellow-800 tw:text-xl">Normal sticky bar</div>
      <div class="tw:mt-6">
        <i-checkbox-group v-model="checkedList">
          <i-checkbox
            name="modelOne"
            label="One"
          />
          <i-checkbox
            name="modelTwo"
            label="Two"
          />
        </i-checkbox-group>

        <i-sticky-bar
          v-if="checkedList.length > 0"
          width-sidebar="20%"
        >
          <template #content>
            {{ checkedList.length }} option(s) selected
          </template>
          <template #options>
            <div class="tw:flex tw:gap-2.5">
              <i-button text>
                Cancel
              </i-button>

              <i-button class="tw:w-[150px]">
                Click me!
              </i-button>
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
import ICheckbox from '@/components/checkbox/i-checkbox.vue';
import ICheckboxGroup from '@/components/checkbox/i-checkbox-group.vue';
import IStickyBar from '@/components/i-sticky-bar.vue';

export default {
  components: {
    IButton,
    ICheckbox,
    ICheckboxGroup,
    IStickyBar
  },
  setup() {
    const checkedList = ref([])

    return {
      checkedList
    }
  }
}

</script>