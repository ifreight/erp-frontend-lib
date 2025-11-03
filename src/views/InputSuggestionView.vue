<template>
  <div>
    <div class="tw:mb-4">
      <div class="tw:font-bold tw:bg-yellow-800 tw:text-xl tw:mb-2">
        small size + dropdown header + clearable
        <span class="tw:text-red-600">
          v-model:
          <span v-if="suggestion === null">ini null</span>
          <span v-else>{{ !suggestion ? 'empty bkn null' : `${suggestion}` }}</span>
        </span>
      </div>
      <i-input-suggestion
        v-model="suggestion"
        input-id="Suggestion1"
        class="package-input-suggestion"
        name="packageType"
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
      <div class="tw:font-bold tw:bg-yellow-800 tw:text-xl tw:mb-2">
        small size + dropdown header + clearable + isNullWhenEmpty false
        <span class="tw:text-red-600">
          v-model:
          <span v-if="suggestion6 === null">ini null</span>
          <span v-else>{{ !suggestion6 ? 'empty bkn null' : `${suggestion6}` }}</span>
        </span>
      </div>
      <i-input-suggestion
        v-model="suggestion6"
        input-id="Suggestion6"
        class="package-input-suggestion"
        name="packageType"
        placeholder="Box, Drum, etc"
        size="sm"
        :options="suggestionList"
        dropdown-max-height="290px"
        clearable
        :isNullWhenEmpty="false"
      >
        <template #dropdownHeader>
          <div class="text-xs text-gray-400 text-right">this is header</div>
        </template>
      </i-input-suggestion>
    </div>
    <div class="tw:mb-4">
      <div class="tw:font-bold tw:bg-yellow-800 tw:text-xl tw:mb-2">
        normal size + error example + hide after 3 input
        <span class="tw:text-red-600">
          v-model:
          <span v-if="suggestion2 === null">ini null</span>
          <span v-else>{{ !suggestion2 ? 'empty bkn null' : `${suggestion2}` }}</span>
        </span>
      </div>
      <i-input-suggestion
        v-model="suggestion2"
        input-id="Suggestion2"
        class="package-input-suggestion"
        name="packageType"
        placeholder="Box, Drum, etc"
        :options="suggestionList"
        :invalid="true"
        :hideAfterInput="3"
        error-message="error message example"
        dropdown-max-height="290px"
      >
      </i-input-suggestion>
    </div>
    <div class="tw:mb-4">
      <div class="tw:font-bold tw:bg-yellow-800 tw:text-xl tw:mb-2">
        normal size + init value
        <span class="tw:text-red-600">
          v-model:
          <span v-if="suggestion3 === null">ini null</span>
          <span v-else>{{ !suggestion3 ? 'empty bkn null' : `${suggestion3}` }}</span>
        </span>
      </div>
      <i-input-suggestion
        v-model="suggestion3"
        input-id="Suggestion3"
        class="package-input-suggestion"
        name="packageType"
        placeholder="Box, Drum, etc"
        :options="suggestionList"
        dropdown-max-height="290px"
        borderless
      >
      </i-input-suggestion>
    </div>
    <div class="tw:mb-4">
      <div class="tw:font-bold tw:bg-yellow-800 tw:text-xl tw:mb-2">
        normal size disabled
        <small class="tw:text-red-400">v : {{ suggestion4 }}</small>
      </div>
      <i-input-suggestion
        v-model="suggestion4"
        input-id="Suggestion4"
        class="package-input-suggestion"
        name="packageType"
        placeholder="Box, Drum, etc"
        :options="suggestionList"
        dropdown-max-height="290px"
        disabled
      >
      </i-input-suggestion>
    </div>
    <div class="tw:mb-4">
      <div class="tw:font-bold tw:bg-yellow-800 tw:text-xl tw:mb-2">
        remote + rounded lg + append option to body
        <span class="tw:text-red-600">
          v-model:
          <span v-if="suggestion5 === null">ini null</span>
          <span v-else>{{ !suggestion5 ? 'empty bkn null' : `${suggestion5}` }}</span>
        </span>
      </div>
      <i-input-suggestion
        v-model="suggestion5"
        input-id="suggestion5"
        class="package-input-suggestion"
        name="packageType"
        placeholder="Box, Drum, etc"
        dropdown-max-height="290px"
        remote
        rounded="lg"
        :remote-method="remoteMethod"
        :remote-text="'Contoh Remote Text Custom'"
        :appendOptionToBody="true"
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
    const suggestion5 = ref();
    const suggestion6 = ref();

    const suggestionList = computed(() => {
      return ['Box(es)', 'Pallet(s)', 'Drum(s)', 'Crate(s)', 'Carton(s)', 'Case(s)', 'Cargo(s)'];
    });

    const remoteMethod = async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            { id: 1, name: 'Indonesia' },
            { id: 2, name: 'India' },
            { id: 3, name: 'Maldives' },
            { id: 4, name: 'Malaysia' },
            { id: 5, name: 'Mali' },
            { id: 6, name: 'Mauritania' },
            { id: 7, name: 'Mauritius' },
          ]);
        }, 1000);
      });
    };

    return {
      suggestion,
      suggestion2,
      suggestion3,
      suggestion4,
      suggestion5,
      suggestion6,
      suggestionList,
      remoteMethod,
    };
  },
};
</script>
