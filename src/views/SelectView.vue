<template>
  <div>
    <div class="tw:mb-5">Select Types</div>

    <div>select + filterable + empty value</div>
    <div class="tw:mb-4 tw:flex-1">
      <span class="tw:text-red-600">v-model: {{ select }}</span>
      <i-select
        v-model="select"
        input-id="Select-1"
        name="select-1"
        filterable
        :options="selectStaticOptions"
      />
    </div>

    <div>select + filterable + placeholder + custom empty message</div>
    <div class="tw:mb-4 tw:flex-1">
      <span class="tw:text-red-600">v-model: {{ select2 }}</span>
      <i-select
        v-model="select2"
        input-id="Select-2"
        name="select-2"
        placeholder="Select..."
        filterable
        :options="selectStaticOptions"
        no-data-text="contoh custom no data text"
      />
    </div>

    <div>select + filterable + init value</div>
    <div class="tw:mb-4">
      <span class="tw:text-red-600">v-model: {{ select3 }}</span>
      <i-select
        v-model="select3"
        input-id="Select-3"
        name="select-3"
        filterable
        :options="selectStaticOptions"
      />
    </div>

    <div>select + disabled + value</div>
    <div class="tw:mb-4">
      <span class="tw:text-red-600">v-model: {{ select4 }}</span>
      <i-select
        v-model="select4"
        input-id="Select-4"
        name="select-4"
        :options="selectStaticOptions"
        disabled
      />
    </div>

    <div>select + empty value + error</div>
    <div class="tw:mb-4">
      <span class="tw:text-red-600">v-model: {{ select5 }}</span>
      <i-select
        v-model="select5"
        input-id="Select-5"
        name="select-5"
        filterable
        :options="selectStaticOptions"
        :invalid="true"
        error-message="Error message"
      />
    </div>

    <div>select + remote method</div>
    <div class="tw:mb-4">
      <span class="tw:text-red-600">v-model: {{ select7 }}</span> <br />
      <span class="tw:text-red-600">value-option: {{ selectRemote }}</span>
      <i-select
        v-model="select7"
        v-model:value-option="selectRemote"
        input-id="Select-7"
        name="select-7"
        :options="selectStaticOptions"
        remote
        :remote-method="selectRemoteMethod"
        :remote-text="'Contoh Remote Text Custom'"
      />
    </div>

    <div>select without filterable</div>
    <div class="tw:mb-4">
      <span class="tw:text-red-600">v-model: {{ select8 }}</span>
      <i-select
        v-model="select8"
        input-id="Select-8"
        name="select-8"
        :options="selectStaticOptions"
      />
    </div>

    <div>select with rounded, width, custom arrow color and size sm</div>
    <div class="tw:mb-4 tw:w-[350px]">
      <span class="tw:text-red-600">v-model: {{ select9 }}</span>
      <i-select
        v-model="select9"
        input-id="Select-9"
        name="select-9"
        size="sm"
        rounded="lg"
        :arrowColor="customColor"
        :options="selectStaticOptions"
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
    let customColor = 'red';
    const select = ref(null);
    const select2 = ref(null);
    const select3 = ref('America');
    const select4 = ref('Others');
    const select5 = ref(null);
    const select7 = ref(null);
    const select8 = ref(null);
    const select9 = ref(null);
    const selectRemote = ref(null);

    const selectStaticOptions = computed(() => {
      return ['Asia', 'America', 'Europe', 'Others'];
    });

    const selectRemoteMethod = async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            { id: 1, name: 'Asia' },
            { id: 2, name: 'America' },
            { id: 3, name: 'Europe' },
            { id: 4, name: 'Others' },
          ]);
        }, 1000);
      });
    };

    return {
      customColor,
      select,
      select2,
      select3,
      select4,
      select5,
      select7,
      select8,
      select9,
      selectRemote,
      selectStaticOptions,
      selectRemoteMethod,
    };
  },
};
</script>
