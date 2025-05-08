<template>
  <div>
    <div class="tw:mb-5">
      Select Types
    </div>
    <div class="tw:mb-4 tw:flex-1">
      <i-select
        v-model="select"
        input-id="Select-1"
        name="select-1"
        label="Select"
        :options="selectStaticOptions"
      />
    </div>
    <div class="tw:mb-4 tw:flex-1">
      <i-select
        v-model="select2"
        input-id="Select-2"
        name="select-2"
        label="Select"
        placeholder="Select..."
        :options="selectStaticOptions"
      />
    </div>
    <div class="tw:mb-4">
      <i-select
        v-model="select3"
        input-id="Select-3"
        name="select-3"
        label="Select"
        :options="selectStaticOptions"
      />
    </div>
    <div class="tw:mb-4">
      <i-select
        v-model="select4"
        input-id="Select-4"
        name="select-4"
        label="Select"
        :options="selectStaticOptions"
        disabled
      />
    </div>
    <div class="tw:mb-4">
      <i-select
        v-model="select5"
        input-id="Select-5"
        name="select-5"
        label="Select"
        :options="selectStaticOptions"
        :invalid="true"
        error-message="Error message"
      />
    </div>
    <div class="tw:mb-4">
      <i-select
        v-model="select6"
        input-id="Select-6"
        name="select-6"
        label="Select"
        :options="selectStaticOptions"
        :invalid="true"
        error-message="Error message"
      />
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import ISelect from '@/components/i-select.vue';

export default {
  components: {
    ISelect,
  },
  setup() {
    const select = ref(null);
    const select2 = ref(null);
    const select3 = ref('America');
    const select4 = ref('Others');
    const select5 = ref(null);
    const select6 = ref('Ikan');

    const selectStaticOptions = computed(() => {
      return ['Asia', 'America', 'Europe', 'Others'];
    });

    return {
      select,
      select2,
      select3,
      select4,
      select5,
      select6,
      selectStaticOptions,
    }
  },
}
</script>
