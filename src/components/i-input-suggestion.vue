<template>
  <div ref="suggestionRef" class="suggestion-wrapper">
    <div tabindex="0" class="suggestion-container" :class="isVisible ? 'visible' : ''">
      <i-input
        ref="inputRef"
        class="suggestion-input"
        type="text"
        :model-value="modelValue"
        :input-id="inputId"
        :name="name"
        :label="label"
        :placeholder="placeholder"
        :disabled="disabled"
        :read-only="readOnly"
        :invalid="invalid"
        :dark-mode="darkMode"
        :borderless="borderless"
        :size="size"
        :error-message="errorMessage"
        :clearable="clearable"
        @clear="resetInputValue"
        @keyup="onInputKeyup"
        @focus="toggleDropdown"
      >
        <template v-if="$slots.prepend" #prepend>
          <slot name="prepend" />
        </template>
      </i-input>
    </div>

    <i-dropdown-options
      :visible="isVisible"
      :options="dropdownOptions"
      :option-key="optionKey"
      :option-value="optionValue"
      :max-height="dropdownMaxHeight"
      :query="modelValue"
      filterable
      hide-empty-filtered
      @selectedValue="handleSelected"
      @onFilteredChanged="onFilteredChanged"
    >
      <template v-if="$slots.dropdownHeader" #header>
        <slot name="dropdownHeader" />
      </template>
    </i-dropdown-options>
  </div>
</template>

<script>
import { ref, computed, watch, onBeforeUnmount, defineComponent, nextTick } from 'vue';

import IDropdownOptions from './dropdown/i-dropdown-options.vue';
import IInput from './i-input.vue';

export default defineComponent({
  name: 'IInputSuggestion',
  components: {
    IInput,
    IDropdownOptions,
  },
  props: {
    modelValue: {
      type: [String, Number],
      default: undefined,
    },
    inputId: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    displayValue: {
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

    size: {
      type: String,
      default: 'base',
      validator(value) {
        return ['sm', 'base'].includes(value);
      },
    },
    hideAfterInput: {
      type: Number,
      default: -1,
    },
    dropdownMaxHeight: {
      type: String,
      default: '264px',
    },
    errorMessage: {
      type: String,
      default: '',
    },
    disabled: Boolean,
    readOnly: Boolean,
    invalid: Boolean,
    borderless: Boolean,
    darkMode: Boolean,
    wide: Boolean,
    clearable: Boolean,
  },
  emits: ['update:modelValue', 'blur', 'change', 'focus', 'input'],
  setup(props, { emit }) {
    const isVisible = ref(false);
    const inputValue = ref();
    const suggestionRef = ref();
    const inputRef = ref();
    const isFilteredOptionsEmpty = ref(false);

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

    const hideDropdown = () => {
      if (isVisible.value) {
        isVisible.value = false;
        emit('blur');
        if (inputRef.value) {
          inputRef.value.$el.querySelector('input').blur();
        }
      }
    };

    const changeSelected = (option) => {
      if (!option) {
        inputValue.value = undefined;

        emit('update:modelValue', undefined);
        emit('change', undefined);
        return;
      }

      inputValue.value = option[props.optionKey];
      emit('update:modelValue', option[props.optionKey]);
      emit('change', option);
    };

    const handleClickOutside = (event) => {
      const isClickInside = event.composedPath().includes(suggestionRef.value);
      if (!isClickInside) {
        hideDropdown();
      }
    };

    const resetInputValue = () => {
      changeSelected(undefined);
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

    const toggleDropdown = () => {
      switch (isVisible.value) {
        case true:
          hideDropdown();
          break;
        default:
          showDropdown();
          break;
      }
    };

    const onFilteredChanged = (val) => {
      isFilteredOptionsEmpty.value = val > 0 ? false : true;
    };

    const onInputKeyup = async (event) => {
      emit('update:modelValue', event.target.value);
      if (props.hideAfterInput > 0 && event.target.value.length >= props.hideAfterInput) {
        isVisible.value = false;
      } else {
        await nextTick();
        isVisible.value = isFilteredOptionsEmpty.value ? false : true;
      }
    };

    const handleSelected = (option) => {
      changeSelected(option);
      hideDropdown();
    };

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

    onBeforeUnmount(() => {
      if (isVisible.value) {
        document.removeEventListener('click', handleClickOutside);
      }
    });

    return {
      isVisible,
      inputValue,
      suggestionRef,
      dropdownOptions,
      resetInputValue,
      showDropdown,
      changeSelected,
      hideDropdown,
      toggleDropdown,
      onInputKeyup,
      onFilteredChanged,
      handleSelected,
    };
  },
});
</script>

<style>
.suggestion-wrapper {
  position: relative;

  .suggestion-container,
  .suggestion-input {
    cursor: pointer;
  }

  .suggestion-container.visible ::v-deep .angle-icon svg {
    transform: rotateZ(180deg);
  }

  .custom-selected {
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

    &.borderless {
      border: none;
    }
  }
}
</style>
