<template>
  <div class="i-select-multiple-wrapper">
    <div
      ref="selectRef"
      class="i-select-multiple"
      :class="!isNormalSelectMode ? 'fixed-options-select' : ''"
    >
      <span v-if="!isNormalSelectMode && !filterable"></span>
      <div
        v-else
        class="i-select-container"
        :class="isVisible ? 'visible' : ''"
        @click="toggleDropdown"
      >
        <i-input
          ref="inputRef"
          class="i-select-input"
          type="text"
          :model-value="inputTextValue"
          :input-id="inputId"
          :name="name"
          :placeholder="placeholder"
          :disabled="disabled"
          :read-only="isInputReadOnly"
          :invalid="invalid"
          :dark="dark"
          :rounded="rounded"
          :size="size"
          :height="height"
          @keyup="onInputKeyup"
        >
          <template
            v-if="$slots.prepend"
            #prepend
          >
            <slot name="prepend" />
          </template>
          <template #append>
            <slot name="append">
              <div class="i-select-arrow-container">
                <ic-times
                  v-if="isNormalSelectMode && clearable && filled && (!disabled || !readOnly)"
                  v-show="!isVisible"
                  class="icon-clear tw:w-2.5 tw:h-2.5"
                  @click.stop="clearSelection"
                />
                <ic-chevron-down v-else-if="!filterable && !remote" />
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
        :is-show-arrow="isNormalSelectMode"
        :borderless="!isNormalSelectMode"
        :relative-box="!isNormalSelectMode"
        :deactivate-wrapper-event="deactivateWrapperEvent"
        :padding="isNormalSelectMode ? 'base' : 'none'"
        :width="dropdownWidth"
        @selectedValue="handleSelected"
      >
        <template
          v-if="!remote"
          #header
        >
          <div
            class="select-header"
            :class="{ 'tw:pt-0': !isNormalSelectMode && !filterable }"
          >
            <i-checkbox
              v-model="modelCheckAll"
              :checkbox-rounded="checkboxRounded"
              :checkbox-border-color="checkboxBorderColor"
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
                :disabled="selectedOptionValue.length < 1"
                @click="clearSelection"
              >
                Kosongkan
              </i-button>
            </div>
          </div>
        </template>
        <template #optionsPrepend="{ option }">
          <div class="tw:relative tw:w-5 tw:h-5 tw:ml-[9px] tw:mr-3 tw:pointer-events-auto">
            <i-checkbox
              :modelValue="listValue(option)"
              :name="`list-${option.id}`"
              :checkbox-rounded="checkboxRounded"
              :checkbox-border-color="checkboxBorderColor"
              size="lg"
              light="light"
              class="tw:h-full"
            />
            <div class="tw:absolute tw:z-2 tw:w-full tw:h-full tw:top-0"></div>
          </div>
        </template>

        <template
          v-if="$slots.options"
          #options="{ option, makeBold }"
        >
          <slot
            name="options"
            :option="option"
            :make-bold="makeBold"
          ></slot>
        </template>

        <template
          v-if="$slots.options"
          #optionsAppend="{ option }"
        >
          <slot
            name="optionsAppend"
            :option="option"
          />
        </template>

        <template #optionsPlaceholder>
          <div class="tw:px-2">
            <template v-if="isLoading"> Loading </template>
            <template v-else-if="remote">
              {{ query ? noDataText : remoteText }}
            </template>
            <template v-else>
              {{ noDataText }}
            </template>
          </div>
        </template>
      </i-dropdown-options>
    </div>
    <div
      v-if="errorMessage"
      class="i-error-message"
    >
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, onMounted, onBeforeUnmount, ref, watch, nextTick } from 'vue';
import debounce from 'lodash/debounce';

import IButton from '@/components/i-button.vue';
import ICheckbox from '@/components/checkbox/i-checkbox.vue';
import IDropdownOptions from './dropdown/i-dropdown-options.vue';
import IInput from './i-input.vue';

import IcChevronDown from '@/icons/ic-chevron-down.vue';
import IcTimes from '@/icons/ic-times.vue';

export default defineComponent({
  name: 'ISelectMultiple',
  components: {
    IButton,
    ICheckbox,
    IDropdownOptions,
    IInput,
    IcChevronDown,
    IcTimes,
  },
  props: {
    deactivateWrapperEvent: Boolean,
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
      default: '',
    },
    name: {
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
    checkboxRounded: {
      type: String,
      default: null,
      validator(value) {
        return ['sm', 'md', 'lg'].includes(value);
      },
    },
    checkboxBorderColor: {
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
        return ['sm', 'base', 'lg'].includes(value);
      },
    },
    dropdownWidth: {
      type: String,
      default: '100%',
    },
    isNormalSelectMode: {
      type: Boolean,
      default: false,
    },
    remoteText: {
      type: String,
      default: 'Type to search.',
    },
    noDataText: {
      type: String,
      default: 'No results found.',
    },
    clearable: Boolean,
    height: {
      type: [String, Number],
      default: '41px',
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

    const isLoading = computed(() => {
      return props.remote ? remoteLoading.value : props.loading;
    });
    const filled = computed(() => props.modelValue.length > 0);

    const dropdownOptions = computed(() => {
      const rawOptions = props.remote ? remoteOptions.value : props.options || [];
      const normalized = rawOptions.map((opt) =>
        typeof opt === 'object' ? opt : { [props.optionKey]: opt, [props.optionValue]: opt },
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
          String(opt[props.optionValue]).toLowerCase().includes(query.value.toLowerCase()),
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
      (props.remote ? remoteOptions.value : props.options).map((opt) => opt[props.optionKey]),
    );

    const inputTextValue = computed(() => {
      if (props.isNormalSelectMode && selectedOption.value.length > 0) {
        const find = selectedOption.value.map((y) => y[props.optionValue]);
        if (!isVisible.value && (props.remote || props.filterable)) {
          return find.length > 0 ? find.join(', ') : undefined;
        }
        if (!props.remote && !props.filterable) {
          return find.length > 0 ? find.join(', ') : undefined;
        }

        return query.value;
      } else {
        return query.value;
      }
    });

    const normalizeOptions = (options) => {
      return options.map((opt) =>
        typeof opt === 'object' ? opt : { [props.optionKey]: opt, [props.optionValue]: opt },
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
        (item) => item[props.optionKey] === option[props.optionKey],
      );

      if (index >= 0) {
        selectedOption.value.splice(index, 1);
      } else {
        selectedOption.value.push(option);
      }

      inputValue.value = selectedOption.value.map((opt) => opt[props.optionKey]);

      const rawOptions = props.remote ? remoteOptions.value : props.options;
      const allOptions = normalizeOptions(rawOptions);
      const allOptionIds = allOptions.map((opt) => opt[props.optionKey]);

      modelCheckAll.value = allOptionIds.every((id) => inputValue.value.includes(id));

      emit('update:modelValue', [...inputValue.value]);
      emit('update:valueOption', [...selectedOption.value]);
      emit('change', [...selectedOption.value], option, index < 0);
    };

    const debouncedQuery = debounce(() => handleQuery(query.value), 300);

    const handleQuery = async (value) => {
      if (!props.remote || typeof props.remoteMethod !== 'function') return;

      if (!value) {
        remoteOptions.value = [];
        remoteLoading.value = false;
        return;
      }

      remoteLoading.value = true;
      try {
        remoteOptions.value = await props.remoteMethod(value);
      } catch (ignoreErr) {
        // do nothing
      }
      remoteLoading.value = false;
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
    };

    const toggleDropdown = () => {
      if (!props.isNormalSelectMode) {
        return false;
      }
      isVisible.value ? hideDropdown() : showDropdown();
    };

    const handleClickOutside = (event) => {
      const isClickInside = event.composedPath().includes(selectRef.value);
      if (!isClickInside) {
        hideDropdown();
      }
    };

    const onInputKeyup = (event) => {
      query.value = event.target.value;
    };

    watch(
      () => props.modelValue,
      async (newVal) => {
        inputValue.value = Array.isArray(newVal) ? [...newVal] : [];
        selectedOption.value = dropdownOptions.value.filter((opt) =>
          inputValue.value.includes(opt[props.optionKey]),
        );

        await nextTick();
        if (!props.remote) {
          const rawOptions = props.options;
          const allOptions = normalizeOptions(rawOptions);
          const allOptionIds = allOptions.map((opt) => opt[props.optionKey]);

          modelCheckAll.value = allOptionIds.every((id) => inputValue.value.includes(id));
        }
      },
      { immediate: true },
    );

    watch(
      () => props.valueOption,
      (val) => {
        if (Array.isArray(val)) {
          selectedOption.value = [...val];
          inputValue.value = val.map((opt) => opt[props.optionKey]);
        }
      },
    );

    watch(
      () => query.value,
      () => {
        if (props.remote) debouncedQuery();
      },
    );

    watch(
      () => isVisible.value,
      (val) => {
        if (val) {
          document.addEventListener('click', handleClickOutside);
        } else {
          document.removeEventListener('click', handleClickOutside);
        }
      },
    );

    onMounted(async () => {
      await nextTick();

      if (inputValue.value.length > 0) {
        if (props.valueOption.length === 0) {
          emit('update:valueOption', [...selectedOption.value]);
        }
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
      isLoading,
      selectedOption,
      inputTextValue,
      filled,
      onInputKeyup,

      handleQuery,
      handleSelected,
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
.i-select-multiple-wrapper {
  .i-select-multiple {
    @apply tw:relative;

    &.fixed-options-select {
      @apply tw:pt-2 tw:pb-2;

      .i-select-container {
        @apply tw:px-2;
      }
    }
    .select-header {
      padding: 10px 16px 0px !important;
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
  }
}
</style>
