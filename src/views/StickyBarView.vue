<template>
  <div>
    <!-- Normal sticky bar -->
    <div class="tw:mb-12">
      <div class="tw:font-bold tw:bg-yellow-800 tw:text-xl">Normal sticky bar</div>
      <div class="tw:mt-6">
        <!-- <i-checkbox
          v-model="modelOne"
          name="modelOneNormal"
          label="Pilih opsi A"
        /> -->
        <i-sticky-bar />
      </div>
    </div>
  </div>
</template>

<script>
// import ICheckbox from '@/components/checkbox/i-checkbox.vue';
import IStickyBar from '@/components/i-sticky-bar.vue';

export default {
  components: {
    // ICheckbox,
    IStickyBar
  }
}

</script>