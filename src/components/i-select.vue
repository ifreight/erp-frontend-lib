<template>
  <div
    ref="selectRef"
    class="i-select"
  >
    <div
      class="i-select-container"
      :class="isVisible ? 'visible' : ''"
      @click="toggleDropdown"
    >
      <i-input
        ref="inputRef"
        class="i-select-input"
        type="text"
        :model-value="inputTextValue"
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
      hide-empty-filtered
      @selectedValue="handleSelected"
    >
      <template
        v-if="$slots.dropdownHeader"
        #header
      >
        <slot name="dropdownHeader" />
      </template>
    </i-dropdown-options>
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
import IDropdownOptions from './dropdown/i-dropdown-options.vue';
import IInput from './i-input.vue';

export default defineComponent({
  name: 'ISelect',
  components: {
    IInput,
    IDropdownOptions,
    IcChevronDown,
  },
  props: {
    modelValue: {
      type: [String, Number],
      default: undefined,
    },
    valueOption: {
      type: [String, Object],
      default: () => undefined,
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
  emits: ['update:modelValue', 'update:valueOption', 'input', 'change', 'focus', 'blur'],

  setup(props, { emit }) {
    const isVisible = ref(false);
    const remoteLoading = ref(false);
    const remoteOptions = ref([]);
    const query = ref('');
    const inputRef = ref();
    const selectRef = ref();
    const selectedOption = ref(props.valueOption);
    const inputValue = ref(props.modelValue);

    const dropdownOptions = computed(() => {
      let options = [];
      if (props.remote) {
        options = remoteOptions.value || [];
      } else if (props.options && props.options.length) {
        const [firstOption] = props.options;
        if (typeof firstOption !== 'object') {
          options = props.options.map((option) => ({
            id: option,
            name: option,
          }));
        } else {
          options = [...props.options];
        }
      }

      if (selectedOption.value) {
        const isOptionIncluded = options.some(
          (option) => option[props.optionKey] === selectedOption.value[props.optionKey]
        );

        if (!isOptionIncluded) {
          options.unshift(selectedOption.value);
        }
      }

      return options;
    });

    const selectedOptionValue = computed(() => {
      return selectedOption.value ? selectedOption.value[props.optionKey] : undefined;
    });

    const inputTextValue = computed(() => {
      if (!inputValue.value) {
        return query.value || '';
      }

      return selectedOption.value ? selectedOption.value[props.optionValue] : query.value;
    });

    const isInputReadOnly = computed(() => {
      if (!isVisible.value) {
        return true;
      }
      return !props.filterable && !props.remote;
    });

    const updateSelectedOption = ((option) => {
      selectedOption.value = option || null;
      emit('update:valueOption', option);
    });

    const changeSelected = ((option) => {
      remoteOptions.value = [];

      if (!option) {
        inputValue.value = '';
        updateSelectedOption(undefined);
        emit('input', undefined);
        emit('change', undefined);
        return;
      }

      inputValue.value = option[props.optionKey];
      query.value = option[props.optionValue];
      updateSelectedOption(option);
      emit('input', option[props.optionKey]);
      emit('change', option);
    });

    const resetInputValue = (() => {
      query.value = '';
      changeSelected(undefined);
      remoteOptions.value = [];
    });

    const handleQuery = async (value) => {
      if (!value) {
        remoteOptions.value = [];
        remoteLoading.value = false;
        return;
      }

      try {
        remoteOptions.value = await props.remoteMethod(value);
      } catch (err) {
        console.error(err);
      }
      remoteLoading.value = false;
    };

    const debouncedHandleQuery = debounce(() => {
      handleQuery(query.value);
    }, 300);

    const onInputKeyup = (event) => {
      if (props.filterable || props.remote) {
        if (inputValue.value) {
          resetInputValue();
          if (event.key.length === 1) {
            query.value = event.key;
          }
        } else {
          query.value = event.target.value;
        }

        if (props.remote && typeof debouncedHandleQuery === 'function') {
          remoteLoading.value = true;
          debouncedHandleQuery();
        }
      }
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

    const toggleDropdown = () => {
      isVisible.value ? hideDropdown() : showDropdown();
    };

    const handleSelected = (option) => {
      changeSelected(option);
      query.value = '';
      hideDropdown();
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

    watch(() => props.valueOption, (value) => {
      if ((!value && selectedOptionValue.value) || (value && selectedOptionValue.value !== value[props.optionKey])) {
        selectedOption.value = value;
      }
    });

    watch(
      () => props.modelValue,
      (newValue) => {
        if (newValue !== inputValue.value) {
          inputValue.value = newValue;
        }

        if (!selectedOption.value || selectedOption.value[props.optionKey] !== newValue) {
          const newSelectedOption = dropdownOptions.value.find(
            (item) => item[props.optionKey] === newValue
          );
          updateSelectedOption(newSelectedOption);
        }
      },
      { immediate: true }
    );

    watch(() => dropdownOptions, () => {
      if (inputValue.value && selectedOptionValue.value !== inputValue.value & dropdownOptions.value.length) {
        updateSelectedOption(dropdownOptions.value.find((item) => item[props.optionKey] === props.inputValue));

        const matchedOption = dropdownOptions.value.find(
          (item) => item[props.optionKey] === inputValue.value
        );
        updateSelectedOption(matchedOption);
      }
    }, { deep: true, immediate: true });

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
      remoteOptions,
      dropdownOptions,
      inputValue,
      query,
      selectedOptionValue,
      inputTextValue,
      isInputReadOnly,
      resetInputValue,
      handleQuery,
      showDropdown,
      hideDropdown,
      toggleDropdown,
      handleSelected,
      onInputKeyup,
    };
  },
});
</script>

<style>
@reference "@/assets/global.css";

.i-select {
  position: relative;

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
