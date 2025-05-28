<template>
  <div
    ref="selectRef"
    class="i-select-multiple"
    :class="!isNormalSelectMode ? 'custom-select' : 'normal-select'"
  >
    <template v-if="isNormalSelectMode">
      <div
        class="i-select-container"
        :class="isVisible ? 'visible' : ''"
        @click="toggleDropdown"
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
          :read-only="isInputReadOnly"
          :invalid="invalid"
          :dark="dark"
          :rounded="rounded"
          :size="size"
          :error-message="errorMessage"
        >
          <template
            v-if="$slots.prepend"
            #prepend
          >
            <slot name="prepend" />
          </template>
          <template #append>
            <slot name="append">
              <div
                class="i-select-arrow-container"
                :style="{ color: arrowColor }"
              >
                <ic-chevron-down />
              </div>
            </slot>
          </template>
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
        :is-normal-select-mode="true"
        :is-show-arrow="true"
        hide-empty-filtered
        @selectedValue="handleSelected"
      >
        <template #header>
          <div class="select-header">
            <i-checkbox
              v-model="modelCheckAll"
              :is-multiple="true"
              :checkbox-rounded="checkboxRounded"
              :checkbox-color="checkboxColor"
              name="modelCheckAll"
              label="Pilih Semua"
              size="lg"
              light="light"
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
            :modelValue="listValue(option)"
            :name="`list-${option.id}`"
            :is-multiple="true"
            :checkbox-rounded="checkboxRounded"
            :checkbox-color="checkboxColor"
            size="lg"
            light="light"
            @update:modelValue="(checked) => handleCheckboxChange(option, checked)"
          />
        </template>
      </i-dropdown-options>
    </template>
    <template v-else>
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
          <template #prepend><ic-search class="tw:text-gray-700" /></template>
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
        :is-show-arrow="false"
        hide-empty-filtered
        @selectedValue="handleSelected"
      >
        <template #header>
          <div class="select-header">
            <i-checkbox
              v-model="modelCheckAll"
              :is-multiple="true"
              :checkbox-rounded="checkboxRounded"
              :checkbox-color="checkboxColor"
              name="modelCheckAll"
              label="Pilih Semua"
              size="lg"
              light="light"
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
            :modelValue="listValue(option)"
            :name="`list-${option.id}`"
            :is-multiple="true"
            :checkbox-rounded="checkboxRounded"
            :checkbox-color="checkboxColor"
            size="lg"
            light="light"
            @update:modelValue="(checked) => handleCheckboxChange(option, checked)"
          />
        </template>
      </i-dropdown-options>
    </template>
  </div>
</template>

<script>
import {
  computed,
  defineComponent,
  onBeforeUnmount,
  ref,
  watch,
} from 'vue';
import debounce from 'lodash/debounce';
import IcChevronDown from '@/icons/ic-chevron-down.vue';
import IcSearch from '@/icons/ic-search.vue';
import IButton from '@/components/i-button.vue';
import ICheckbox from '@/components/checkbox/i-checkbox.vue';
import IDropdownOptions from './dropdown/i-dropdown-options.vue';
import IInput from './i-input.vue';

export default defineComponent({
  name: 'ISelectMultiple',
  components: {
    IcChevronDown,
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
    arrowColor: {
      type: String,
      default: '#2d2d2d',
    },
    rounded: {
      type: String,
      default: 'xs',
    },
    checkboxRounded: {
      type: String,
      default: null,
      validator(value) {
        return ['sm', 'md', 'lg'].includes(value);
      },
    },
    checkboxColor: {
      type: String,
      default: null,
      validator(value) {
        return ['gray-300', 'gray-500', 'gray-700'].includes(value);
      },
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
    isNormalSelectMode: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue', 'update:valueOption', 'change', 'focus', 'blur'],
  setup(props, { emit }) {
    const isVisible = props.isNormalSelectMode ? ref(false) : ref(true);
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

    const isInputReadOnly = computed(() => {
      if (!isVisible.value) {
        return true;
      }
      return !props.filterable && !props.remote;
    });

    const allOptionIds = computed(() =>
      (props.remote ? remoteOptions.value : props.options).map(opt => opt[props.optionKey])
    );

    const normalizeOptions = (options) => {
      return options.map(opt =>
        typeof opt === 'object'
          ? opt
          : { [props.optionKey]: opt, [props.optionValue]: opt }
      );
    };

    const toggleSelectAll = () => {
      const rawOptions = props.remote ? remoteOptions.value : props.options;
      const allOptions = normalizeOptions(rawOptions);

      if (!modelCheckAll.value) {
        selectedOption.value = [];
        inputValue.value = [];
      } else {
        selectedOption.value = [...allOptions];
        inputValue.value = allOptions.map((opt) => opt[props.optionKey]);
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

      const rawOptions = props.remote ? remoteOptions.value : props.options;
      const allOptions = normalizeOptions(rawOptions);
      const allOptionIds = allOptions.map(opt => opt[props.optionKey]);

      modelCheckAll.value = allOptionIds.every(id => inputValue.value.includes(id));

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

      const rawOptions = props.remote ? remoteOptions.value : props.options;
      const allOptions = normalizeOptions(rawOptions);
      const allOptionIds = allOptions.map(opt => opt[props.optionKey]);

      modelCheckAll.value = allOptionIds.every(id => inputValue.value.includes(id));

      emit('update:modelValue', [...inputValue.value]);
      emit('update:valueOption', [...selectedOption.value]);
      emit('change', [...selectedOption.value]);
    };

    const debouncedQuery = debounce(() => handleQuery(query.value), 300);

    const handleQuery = async (q) => {
      if (!props.remote || typeof props.remoteMethod !== 'function') return;
      remoteOptions.value = await props.remoteMethod(q);
    };

    const showDropdown = () => {
      if (!props.disabled && !props.readOnly && !props.isVisible) {
        isVisible.value = true;
        emit('focus');

        if (inputRef.value) {
          inputRef.value.$el.querySelector('input').focus();
        }
      }
    };

    const hideDropdown = () => {
      if (isVisible.value) {
        isVisible.value = false;
        emit('blur');

        if (inputRef.value) {
          inputRef.value.$el.querySelector('input').blur();
        }
      }
    };

    const listValue = (opt) => {
      return selectedOptionValue.value.some((x) => x === opt.id) ? true : false;
    }

    const toggleDropdown = () => {
      isVisible.value ? hideDropdown() : showDropdown();
    };

    const handleClickOutside = ((event) => {
      const isClickInside = event.composedPath().includes(selectRef.value);
      if (!isClickInside) {
        const typedValue = typeof inputValue.value === 'string' ? inputValue.value.trim() : '';

        if (typedValue) {
          const matchingOption = dropdownOptions.value.find(option =>
            option[props.optionValue]?.toString().toLowerCase() === typedValue.toLowerCase()
          );

          if (!matchingOption) {
            inputValue.value = '';
            query.value = '';
            emit('update:modelValue', '');
          }
        }

        hideDropdown();
      }
    });

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

    watch(() => isVisible.value, (val) => {
      if (val) {
        document.addEventListener('click', handleClickOutside);
      } else {
        document.removeEventListener('click', handleClickOutside);
      }
    });

    onBeforeUnmount(() => {
      if (isVisible.value) {
        document.removeEventListener('click', handleClickOutside);
      }
    });

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
      isInputReadOnly,
      allOptionIds,
      handleQuery,
      handleSelected,
      handleCheckboxChange,
      normalizeOptions,
      toggleSelectAll,
      clearSelection,
      listValue,
      showDropdown,
      hideDropdown,
      toggleDropdown,
    };
  },
});
</script>

<style>
@reference "@/assets/global.css";

.i-select-multiple.custom-select {
  @apply tw:border tw:border-gray-500 tw:rounded-lg tw:pt-2 tw:pb-2;

  .i-select-container {
    @apply tw:px-2;
  }
}

.i-select-multiple {
  @apply tw:relative;

  .select-header {
    @apply tw:flex tw:justify-between;
  }

  .selected-count {
    @apply tw:flex tw:items-center;
  }

  .btn-clear {
    @apply tw:text-brown-600 tw:h-fit tw:font-normal;
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
