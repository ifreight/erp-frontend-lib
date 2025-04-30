<template>
  <div>
    <div class="tw:mb-4">
      <div class="tw:font-bold tw:bg-yellow-800 tw:text-xl tw:mb-2">small size + dropdown header + clearable</div>
      <i-input-suggestion
        v-model="suggestion"
        input-id="Suggestion1"
        class="package-input-suggestion"
        name="packageType"
        label="Package Type"
        placeholder="Box, Drum, etc"
        size="sm"
        :options="suggestionList"
        dropdown-max-height="290px"
        clearable
      >
        <template #dropdownHeader>
          <div class="text-xs text-gray-400 text-right">this is header</div>
        </template>
      </i-input-suggestion>
    </div>
    <div class="tw:mb-4">
      <div class="tw:font-bold tw:bg-yellow-800 tw:text-xl tw:mb-2">normal size</div>
      <i-input-suggestion
        v-model="suggestion2"
        input-id="Suggestion2"
        class="package-input-suggestion"
        name="packageType"
        label="Package Type"
        placeholder="Box, Drum, etc"
        :options="suggestionList"
        :invalid="true"
        error-message="error message example"
        dropdown-max-height="290px"
      >
      </i-input-suggestion>
    </div>
    <div class="tw:mb-4">
      <div class="tw:font-bold tw:bg-yellow-800 tw:text-xl tw:mb-2">normal size + init value</div>
      <i-input-suggestion
        v-model="suggestion3"
        input-id="Suggestion3"
        class="package-input-suggestion"
        name="packageType"
        label="Package Type"
        placeholder="Box, Drum, etc"
        :options="suggestionList"
        dropdown-max-height="290px"
      >
      </i-input-suggestion>
    </div>
    <div class="tw:mb-4">
      <div class="tw:font-bold tw:bg-yellow-800 tw:text-xl tw:mb-2">normal size disabled</div>
      <i-input-suggestion
        v-model="suggestion4"
        input-id="Suggestion4"
        class="package-input-suggestion"
        name="packageType"
        label="Package Type"
        placeholder="Box, Drum, etc"
        :options="suggestionList"
        dropdown-max-height="290px"
        disabled
      >
      </i-input-suggestion>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import IInputSuggestion from '@/components/i-input-suggestion.vue';

export default {
  components: {
    IInputSuggestion,
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
