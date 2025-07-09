<template>
  <div>
    <div class="tw:mb-5">Select Types</div>

    <div>select + filterable + empty value + clearable + prepend content</div>
    <div class="tw:mb-4 tw:flex-1">
      <span class="tw:text-red-600">
        v-model:
        <span v-if="select === null">ini null</span>
        <span v-else>{{ !select ? 'empty bkn null' : `${select}` }}</span>
      </span>
      <i-select
        v-model="select"
        input-id="Select-1"
        name="select-1"
        filterable
        :options="selectStaticOptions"
        clearable
      >
        <template #prepend><ic-search class="tw:text-gray-700" /></template>
      </i-select>
    </div>

    <div>
      select + filterable + placeholder + custom empty message + isNullWhenEmpty false (tpi initnya
      null)
    </div>
    <div class="tw:mb-4 tw:flex-1">
      <span class="tw:text-red-600">
        v-model:
        <span v-if="select2 === null">ini null</span>
        <span v-else>{{ !select2 ? 'empty bkn null' : `${select2}` }}</span>
      </span>
      <i-select
        v-model="select2"
        input-id="Select-2"
        name="select-2"
        placeholder="Select..."
        filterable
        :options="selectStaticOptions"
        no-data-text="contoh custom no data text"
        :isNullWhenEmpty="false"
      />
    </div>

    <div>select + filterable + init value + disabled option(s) + borderless</div>
    <div class="tw:mb-4">
      <span class="tw:text-red-600">
        v-model:
        <span v-if="select3 === null">ini null</span>
        <span v-else>{{ !select3 ? 'empty bkn null' : `${select3}` }}</span>
      </span>
      <i-select
        v-model="select3"
        input-id="Select-3"
        name="select-3"
        filterable
        :options="selectStaticOptions2"
        borderless
        placeholder="borderlesss...."
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
      <span class="tw:text-red-600">
        v-model:
        <span v-if="select5 === null">ini null</span>
        <span v-else>{{ !select5 ? 'empty bkn null' : `${select5}` }}</span> </span
      ><br />
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

    <div>select + remote method + isNullWhenEmpty false</div>
    <div class="tw:mb-4">
      <span class="tw:text-red-600">
        v-model:
        <span v-if="select7 === null">ini null</span>
        <span v-else>{{ !select7 ? 'empty bkn null' : `${select7}` }}</span> </span
      ><br />
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
        :isNullWhenEmpty="false"
      />
    </div>

    <div>select + remote method + clearable + value awal</div>
    <div class="tw:mb-4">
      <span class="tw:text-red-600">
        v-model:
        <span v-if="select10 === null">ini null</span>
        <span v-else>{{ !select10 ? 'empty bkn null' : `${select10}` }}</span> </span
      ><br />
      <span class="tw:text-red-600"> value-option: {{ selectRemote2 }} </span>
      <i-select
        v-model="select10"
        v-model:value-option="selectRemote2"
        input-id="Select-10"
        name="select-10"
        :options="selectStaticOptions"
        remote
        :remote-method="selectRemoteMethod"
        :remote-text="'Contoh Remote Text Custom'"
        clearable
      />
    </div>

    <div>select without filterable + clearable</div>
    <div class="tw:mb-4">
      <span class="tw:text-red-600">
        v-model:
        <span v-if="select8 === null">ini null</span>
        <span v-else>{{ !select8 ? 'empty bkn null' : `${select8}` }}</span>
      </span>
      <i-select
        v-model="select8"
        input-id="Select-8"
        name="select-8"
        :options="selectStaticOptions"
        clearable
      />
    </div>

    <div>select with rounded, width and size sm</div>
    <div class="tw:mb-4 tw:w-[350px]">
      <span class="tw:text-red-600">
        v-model:
        <span v-if="select9 === null">ini null</span>
        <span v-else>{{ !select9 ? 'empty bkn null' : `${select9}` }}</span> </span
      ><br />
      <span class="tw:text-red-600"> value-option: {{ selectOptNonRemote }} </span>
      <i-select
        v-model="select9"
        v-model:value-option="selectOptNonRemote"
        input-id="Select-9"
        name="select-9"
        size="sm"
        rounded="lg"
        :options="selectStaticOptions2"
      />
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import ISelect from '@/components/i-select.vue';
import IcSearch from '@/icons/ic-search.vue';

export default {
  components: {
    ISelect,
    IcSearch,
  },
  setup() {
    let customColor = 'red';
    const select = ref(null);
    const select2 = ref(null);
    const select3 = ref('America');
    const select4 = ref('Others');
    const select5 = ref(null);
    const select7 = ref(undefined);
    const select8 = ref(null);
    const select9 = ref(null);
    const select10 = ref(undefined);

    const selectRemote = ref(null);
    const selectRemote2 = ref(null);
    const selectOptNonRemote = ref(null);

    const selectStaticOptions = computed(() => {
      return ['Asia', 'America', 'Europe', 'Others'];
    });

    const selectStaticOptions2 = computed(() => {
      return [
        { id: 1, name: 'Asia', disabled: false },
        { id: 2, name: 'America', disabled: true },
        { id: 3, name: 'Europe', disabled: false },
        { id: 4, name: 'Others', disabled: false },
      ];
    });

    const selectRemoteMethod = async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            { id: 1, name: 'Asia', disabled: false },
            { id: 2, name: 'America', disabled: true },
            { id: 3, name: 'Europe', disabled: false },
            { id: 4, name: 'Others', disabled: false },
          ]);
        }, 1000);
      });
    };
    onMounted(() => {
      select10.value = 1;
      selectRemote2.value = { id: 1, name: 'Asia', disabled: false };

      select9.value = 3;
      selectOptNonRemote.value = { id: 3, name: 'Europe', disabled: false };
    });
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
      select10,
      selectRemote,
      selectRemote2,
      selectStaticOptions,
      selectStaticOptions2,
      selectOptNonRemote,
      selectRemoteMethod,
    };
  },
};
</script>
