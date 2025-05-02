<template>
  <div>
    <!-- Checkbox + Input text -->
    <div class="tw:mb-12">
      <div class="tw:font-bold tw:bg-yellow-800 tw:text-xl">Checkbox + Input text</div>
      <div class="tw:flex tw:mt-6">
        <i-dual-input use-divider>
          <template #first-input>
            <i-checkbox
              name="modelCheckbox"
              label="Click me!"
            />
          </template>
          <template #second-input>
            <i-input />
          </template>
        </i-dual-input>
      </div>
    </div>
  </div>
</template>

<script>
import ICheckbox from '@/components/checkbox/i-checkbox.vue';
import IDualInput from '@/components/i-dual-input.vue';
import IInput from '@/components/i-input.vue';

export default {
  components: {
    ICheckbox,
    IDualInput,
    IInput
  }
}
</script>