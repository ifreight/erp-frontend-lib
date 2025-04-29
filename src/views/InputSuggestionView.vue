<template>
  <div>
    <div class="tw:mb-2">
      <span>small size + dropdown header</span>
      <i-input-suggestion
        v-model="suggestion"
        name="packageType"
        label="Package Type"
        placeholder="Box, Drum, etc"
        size="sm"
        :options="suggestionList"
        :invalid="false"
        input-id="Suggestion"
        class="package-input-suggestion"
        dropdown-max-height="290px"
      >
        <template #dropdownHeader>
          <div class="text-xs text-gray-400 text-right">common used</div>
        </template>
      </i-input-suggestion>
    </div>
    <div class="tw:mb-2">
      <span>normal size</span>
      <i-input-suggestion
        v-model="suggestion"
        name="packageType"
        label="Package Type"
        placeholder="Box, Drum, etc"
        :options="suggestionList"
        :invalid="false"
        input-id="Suggestion"
        class="package-input-suggestion"
        dropdown-max-height="290px"
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
    const suggestionList = computed(() => {
      return ['Box(es)', 'Pallet(s)', 'Drum(s)', 'Crate(s)', 'Carton(s)', 'Case(s)'];
    });

    return {
      suggestion,
      suggestionList,
    }
  },
};
</script>
