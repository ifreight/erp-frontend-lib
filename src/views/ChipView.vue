<template>
  <div>
    <div class="tw:mb-4">
      <i-chip
        :text="'Error'"
        :status="'error'"
      />
    </div>
    <div class="tw:mb-4">
      <i-chip
        :text="'Success'"
        :status="'success'"
      />
    </div>
    <div class="tw:mb-4">
      <i-chip
        :text="'Info'"
        :status="'info'"
      />
    </div>
    <div class="tw:mb-4">
      <i-chip
        :text="'Neutral'"
        :status="'neutral'"
      />
    </div>
  </div>
</template>


<script>
import { ref, computed } from 'vue';
import IChip from '@/components/i-chip.vue';

export default {
  components: {
    IChip,
  },
  setup() {
    const suggestion = ref();
    const suggestion2 = ref();
    const suggestion3 = ref('Carton(s)');
    const suggestion4 = ref();

    const suggestionList = computed(() => {
      return ['Box(es)', 'Pallet(s)', 'Drum(s)', 'Crate(s)', 'Carton(s)', 'Case(s)'];
    });

    return {
      suggestion,
      suggestion2,
      suggestion3,
      suggestion4,
      suggestionList,
    }
  },
};
</script>
