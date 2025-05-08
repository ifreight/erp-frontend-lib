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
        :model-value="modelValue"
        :label="label"
        :input-id="inputId"
        :name="name"
        :placeholder="placeholder"
        :disabled="disabled"
        :read-only="readOnly"
        :invalid="invalid"
        :dark="dark"
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
            <div class="i-select-arrow-container">
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
      :max-height="dropdownMaxHeight"
      :query="query"
      filterable
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
  toRefs,
} from 'vue';
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
    noDataText: {
      type: String,
      default: 'No results found.',
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
    size: {
      type: String,
      default: 'base',
      validator(value) {
        return ['sm', 'base'].includes(value);
      },
    },
    clearable: Boolean,
    dropdownWidth: {
      type: String,
      default: undefined,
    },
  },
  emits: ['update:modelValue', 'input', 'change', 'focus', 'blur', 'clear'],

  setup(props, { emit }) {
    const {
      modelValue,
    } = toRefs(props);

    const isVisible = ref(false);
    const query = ref('');
    const inputRef = ref();
    const selectRef = ref();
    const inputValue = ref(modelValue.value);

    const dropdownOptions = computed(() => {
      let options = [];
      if (props.options && props.options.length) {
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

      return options;
    });


    const changeSelected = ((option) => {
      if (!option) {
        inputValue.value = '';
        emit('update:modelValue', '');
        emit('change', '');
        return;
      }

      query.value = '';
      inputValue.value = option[props.optionKey];
      emit('update:modelValue', option[props.optionKey]);
      emit('change', option);
    });

    const resetInputValue = (() => {
      query.value = '';
      changeSelected(undefined);
    });

    const onInputKeyup = (event) => {
      console.log(' on input');

      const typedValue = event.target.value.trim();
      inputValue.value = typedValue;
      query.value = typedValue;
      emit('update:modelValue', typedValue);
    };

    const showDropdown = () => {
      if (!props.disabled && !props.readOnly) {
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
      hideDropdown();
    };

    const handleClickOutside = ((event) => {
      const isClickInside = event.composedPath().includes(selectRef.value);
      if (!isClickInside) {
        const typedValue = inputValue.value?.trim();

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
      dropdownOptions,
      inputValue,
      query,
      resetInputValue,
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
