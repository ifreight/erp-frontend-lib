<template>
  <div
    ref="selectRef"
    class="i-select-multiple"
  >
    <div
      class="i-select-container"
      :class="isVisible ? 'visible' : ''"
    >
      <i-input
        ref="inputRef"
        class="i-select-input"
        type="text"
        v-model="query"
        :label="label"
        :input-id="inputId"
        :name="name"
        :placeholder="placeholder"
        :disabled="disabled"
        :invalid="invalid"
        :dark="dark"
        :rounded="rounded"
        :size="size"
        :error-message="errorMessage"
      >
        <template #prepend><ic-search color="#A8A8A8" /></template>
      </i-input>
    </div>

    <i-dropdown-options
      :visible="isVisible"
      :options="dropdownOptions"
      :option-key="optionKey"
      :option-value="optionValue"
      :current-value="selectedOptionValue"
      :query="query"
      :max-height="dropdownMaxHeight"
      :filterable="filterable"
      :remote="remote"
      :rounded="rounded"
      :is-multiple="true"
      hide-empty-filtered
      @selectedValue="handleSelected"
    >
      <template #header>
        <div class="select-header">
          <i-checkbox
            v-model="modelCheckAll"
            :is-multiple="true"
            name="modelCheckAll"
            label="Pilih Semua"
            size="lg"
            @change="toggleSelectAll"
          />
          <div class="selected-count">
            <div class="tw:w-full tw:text-brown-600">
              {{ selectedOptionValue.length }} dipilih
            </div>
            <span class="tw:text-gray-900 tw:mx-1">•</span>
            <i-button
              text
              size="xs"
              class="btn-clear"
              @click="clearSelection"
            >
              Kosongkan
            </i-button>
          </div>
        </div>
      </template>
      <template #optionsPrepend="{option}">
        <i-checkbox
          :modelValue="cari(option)"
          :name="`list-${option.id}`"
          :is-multiple="true"
          size="lg"
          @update:modelValue="(checked) => handleCheckboxChange(option, checked)"
        />
      </template>
    </i-dropdown-options>
  </div>
</template>

<script>
import {
  computed,
  defineComponent,
  ref,
  watch,
} from 'vue';
import debounce from 'lodash/debounce';
import IcSearch from '@/icons/ic-search.vue';
import IButton from '@/components/i-button.vue';
import ICheckbox from '@/components/checkbox/i-checkbox.vue';
import IDropdownOptions from './dropdown/i-dropdown-options.vue';
import IInput from './i-input.vue';

export default defineComponent({
  name: 'ISelect',
  components: {
    IcSearch,
    IButton,
    ICheckbox,
    IDropdownOptions,
    IInput,
  },
  props: {
    modelValue: {
      type: Array,
      default: () => [],
    },
    valueOption: {
      type: Array,
      default: () => [],
    },
    dropdownMaxHeight: {
      type: String,
      default: '264px',
    },
    inputId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: '',
    },
    options: {
      type: Array,
      default: () => [],
    },
    optionKey: {
      type: String,
      default: 'id',
    },
    optionValue: {
      type: String,
      default: 'name',
    },
    disabled: Boolean,
    remote: Boolean,
    remoteMethod: {
      type: Function,
      default: undefined,
    },
    readOnly: Boolean,
    filterable: Boolean,
    invalid: Boolean,
    errorMessage: {
      type: String,
      default: '',
    },
    loading: Boolean,
    dark: Boolean,
    rounded: {
      type: String,
      default: 'xs',
    },
    size: {
      type: String,
      default: 'base',
      validator(value) {
        return ['sm', 'base'].includes(value);
      },
    },
    dropdownWidth: {
      type: String,
      default: undefined,
    },
  },
  emits: ['update:modelValue', 'update:valueOption', 'change', 'focus', 'blur'],
  setup(props, { emit }) {
    const isVisible = ref(true);
    const remoteLoading = ref(false);
    const modelCheckAll = ref(false);
    const remoteOptions = ref([]);
    const checkedList = ref([]);
    const query = ref('');
    const inputRef = ref();
    const selectRef = ref();
    const selectedOption = ref(Array.isArray(props.valueOption) ? props.valueOption : []);
    const inputValue = ref(Array.isArray(props.modelValue) ? props.modelValue : []);

    const dropdownOptions = computed(() => {
      const rawOptions = props.remote ? remoteOptions.value : props.options || [];
      const normalized = rawOptions.map((opt) =>
        typeof opt === 'object' ? opt : { [props.optionKey]: opt, [props.optionValue]: opt }
      );

      // Include selected options if not present (e.g. async loaded values)
      selectedOption.value.forEach((sel) => {
        if (!normalized.some((o) => o[props.optionKey] === sel[props.optionKey])) {
          normalized.unshift(sel);
        }
      });

      // filter by query if local (not remote)
      if (!props.remote && props.filterable && query.value) {
        return normalized.filter((opt) =>
          String(opt[props.optionValue]).toLowerCase().includes(query.value.toLowerCase())
        );
      }

      return normalized;
    });

    const selectedOptionValue = computed(() => {
      if (selectedOption.value.length < 1) {
        return [];
      }
      return selectedOption.value.map((opt) => opt[props.optionKey]);
    });

    const toggleSelectAll = () => {
      if (!modelCheckAll.value) {
        selectedOption.value = [];
        inputValue.value = [];
      } else {
        selectedOption.value = [...dropdownOptions.value];
        inputValue.value = dropdownOptions.value.map((opt) => opt[props.optionKey]);
      }
      emit('update:modelValue', [...inputValue.value]);
      emit('update:valueOption', [...selectedOption.value]);
      emit('change', [...selectedOption.value]);
    };

    const clearSelection = () => {
      selectedOption.value = [];
      inputValue.value = [];
      modelCheckAll.value = false;
      emit('update:modelValue', []);
      emit('update:valueOption', []);
      emit('change', []);
    };

    const handleSelected = (option) => {
      const index = selectedOption.value.findIndex(
        (item) => item[props.optionKey] === option[props.optionKey]
      );

      if (index >= 0) {
        selectedOption.value.splice(index, 1);
      } else {
        selectedOption.value.push(option);
      }

      inputValue.value = selectedOption.value.map((opt) => opt[props.optionKey]);

      modelCheckAll.value = selectedOption.value.length === dropdownOptions.value.length;

      emit('update:modelValue', [...inputValue.value]);
      emit('update:valueOption', [...selectedOption.value]);
      emit('change', [...selectedOption.value]);
    };

    const handleCheckboxChange = (option, checked) => {
      const index = selectedOption.value.findIndex(
        (item) => item[props.optionKey] === option[props.optionKey]
      );

      if (checked && index === -1) {
        selectedOption.value.push(option);
      } else if (!checked && index >= 0) {
        selectedOption.value.splice(index, 1);
      }

      inputValue.value = selectedOption.value.map((opt) => opt[props.optionKey]);

      modelCheckAll.value = selectedOption.value.length === dropdownOptions.value.length;

      emit('update:modelValue', [...inputValue.value]);
      emit('update:valueOption', [...selectedOption.value]);
      emit('change', [...selectedOption.value]);
    };

    const debouncedQuery = debounce(() => handleQuery(query.value), 300);

    const handleQuery = async (q) => {
      if (!props.remote || typeof props.remoteMethod !== 'function') return;
      remoteOptions.value = await props.remoteMethod(q);
    };

    watch(() => props.modelValue, (newVal) => {
      inputValue.value = Array.isArray(newVal) ? [...newVal] : [];
      selectedOption.value = dropdownOptions.value.filter((opt) =>
        inputValue.value.includes(opt[props.optionKey])
      );
    }, { immediate: true });

    watch(() => props.valueOption, (val) => {
      if (Array.isArray(val)) {
        selectedOption.value = [...val];
        inputValue.value = val.map((opt) => opt[props.optionKey]);
      }
    });

    watch(() => query.value, () => {
      if (props.remote) debouncedQuery();
    });

    const cari = (opt) => {
      return selectedOptionValue.value.some((x) => x === opt.id) ? true : false;
    }

    return {
      selectRef,
      inputRef,
      isVisible,
      remoteLoading,
      modelCheckAll,
      remoteOptions,
      checkedList,
      dropdownOptions,
      inputValue,
      query,
      selectedOptionValue,
      handleQuery,
      handleSelected,
      handleCheckboxChange,
      toggleSelectAll,
      clearSelection,
      cari,
    };
  },
});
</script>

<style>
@reference "@/assets/global.css";

.i-select-multiple {
  @apply tw:relative tw:border tw:border-gray-500 tw:rounded-lg tw:pt-2 tw:pb-2;

  .select-header {
    @apply tw:flex tw:justify-between;
  }

  .selected-count {
    @apply tw:flex tw:items-center;
  }

  .btn-clear {
    @apply tw:text-brown-600 tw:h-fit tw:font-normal;
  }

  .i-select-container {
    @apply tw:px-2;
  }

  &.inside {
    position: relative;

    .i-select-container {
      position: relative;
    }
  }

  .i-select-slot-selected {
    height: 68px;
    padding-right: 16px;
    padding-left: 16px;
    border: 1px solid var(--gray-400);
    border-radius: 10px;

    &.sm {
      height: 60px;
    }

    &.dark {
      color: var(--white);
      background-color: var(--gray-900);
      border-color: var(--white);
    }
  }

  .i-select-arrow-container {
    padding: 4px;
    cursor: pointer;
  }

  .i-input-error {
    padding-top: 8px;
    font-size: var(--size-xs);
    line-height: var(--size-sm);
    color: var(--red-300);
  }
}
</style>
