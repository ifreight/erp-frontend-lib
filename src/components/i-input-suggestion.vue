<template>
  <div class="i-suggestion-wrapper">
    <div ref="suggestionRef" class="i-suggestion">
      <div tabindex="0" class="suggestion-container" :class="isVisible ? 'visible' : ''">
        <i-input
          ref="inputRef"
          class="suggestion-input"
          type="text"
          :model-value="modelValue"
          :input-id="inputId"
          :name="name"
          :placeholder="placeholder"
          :disabled="disabled"
          :read-only="readOnly"
          :invalid="invalid"
          :dark-mode="darkMode"
          :borderless="borderless"
          :size="size"
          :clearable="clearable"
          :rounded="rounded"
          @clear="resetInputValue"
          @keyup="onInputKeyup"
          @focus="toggleDropdown"
          @blur="isFocus = false"
        >
          <template v-if="$slots.prepend" #prepend>
            <slot name="prepend" />
          </template>
        </i-input>
      </div>
      <i-dropdown-options
        ref="dropdownRef"
        v-model:visible="isVisible"
        :is-hide-on-empty-options="isFocus && hideAfterInput < 1"
        :options="dropdownOptions"
        :option-key="optionKey"
        :max-height="dropdownMaxHeight"
        :query="modelValue"
        :width="dropdownWidth"
        :is-show-arrow="isShowArrow"
        :remote="remote"
        :remote-text="remoteText"
        :no-data-text="noDataText"
        :loading="isLoading"
        :rounded="rounded"
        filterable
        @selectedValue="handleSelected"
      >
        <template v-if="$slots.dropdownHeader" #header>
          <slot name="dropdownHeader" />
        </template>
      </i-dropdown-options>
    </div>
    <div v-if="!!errorMessage" class="i-suggestion-error">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import { ref, computed, watch, onBeforeUnmount, defineComponent } from 'vue';
import debounce from 'lodash/debounce';

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
      default: 0,
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
    clearable: Boolean,
    rounded: {
      type: String,
      default: 'xs',
    },
    dropdownWidth: {
      type: String,
      default: '100%',
    },
    isShowArrow: {
      type: Boolean,
      default: true,
    },
    remote: Boolean,
    remoteMethod: {
      type: Function,
      default: undefined,
    },
    remoteText: {
      type: String,
      default: 'Type to search.',
    },
    noDataText: {
      type: String,
      default: 'No results found.',
    },
  },
  emits: ['update:modelValue', 'blur', 'change', 'focus', 'input'],
  setup(props, { emit }) {
    const dropdownRef = ref();
    const isVisible = ref(false);
    const isFocus = ref(false);

    const suggestionRef = ref();
    const inputRef = ref();

    const remoteLoading = ref(false);
    const remoteOptions = ref([]);

    const isLoading = computed(() => {
      return props.remote ? remoteLoading.value : props.loading;
    });

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
        emit('update:modelValue', undefined);
        emit('change', undefined);
        return;
      }

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
      isFocus.value = true;
      switch (isVisible.value) {
        case true:
          hideDropdown();
          break;
        default:
          if (!props.modelValue) {
            showDropdown();
          }
          break;
      }
    };

    const handleQuery = async (value) => {
      if (!value) {
        remoteOptions.value = [];
        remoteLoading.value = false;
        return;
      }

      try {
        remoteOptions.value = await props.remoteMethod(value);
      } catch (ignoreErr) {
        // do nothing
      }
      remoteLoading.value = false;
    };

    const debouncedHandleQuery = debounce(() => {
      handleQuery(props.modelValue);
    }, 300);

    const onInputKeyup = (event) => {
      emit('update:modelValue', event.target.value);
      if (props.hideAfterInput > 0 && event.target.value.length >= props.hideAfterInput) {
        isVisible.value = false;
      }

      if (props.remote && typeof debouncedHandleQuery === 'function') {
        remoteLoading.value = true;
        debouncedHandleQuery();
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
      dropdownRef,
      isVisible,
      isLoading,
      isFocus,

      suggestionRef,
      dropdownOptions,
      resetInputValue,
      showDropdown,
      changeSelected,
      hideDropdown,
      toggleDropdown,
      onInputKeyup,
      handleSelected,
    };
  },
});
</script>

<style>
.i-suggestion-wrapper {
  .i-suggestion {
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
  .i-suggestion-error {
    padding-top: 8px;
    font-size: var(--size-xs);
    line-height: var(--size-sm);
    color: var(--red-300);
  }
}
</style>
