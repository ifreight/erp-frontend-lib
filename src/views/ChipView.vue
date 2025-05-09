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
import IChip from '@/components/i-chip.vue';

export default {
  components: {
    IChip,
  },
};
</script>
