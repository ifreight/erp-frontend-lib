<template>
  <div class="i-textarea-wrapper">
    <div class="i-textarea" :class="classes">
      <textarea
        v-if="preventEnterKey"
        v-bind="$attrs"
        :id="inputId"
        ref="textAreaRef"
        :name="name"
        v-model="localModel"
        :disabled="disabled"
        :placeholder="placeholder"
        :readonly="readOnly"
        :autocomplete="autoComplete"
        class="textarea"
        @blur="onBlur"
        @focus="onFocus"
        @input="onInput"
        @keydown.enter.exact.prevent="pressKeyEnter"
        @keydown.enter.shift.exact.prevent="pressKeyEnterShift"
      />
      <textarea
        v-else
        v-bind="$attrs"
        :id="inputId"
        ref="textAreaRef"
        :name="name"
        v-model="localModel"
        :disabled="disabled"
        :placeholder="placeholder"
        :readonly="readOnly"
        :autocomplete="autoComplete"
        class="textarea"
        @blur="onBlur"
        @focus="onFocus"
        @input="onInput"
      />

      <span v-if="isTextLimitVisible" class="i-textarea-limit">
        {{ textLength }}/{{ maxTextLength }}
      </span>
    </div>
    <div v-if="errorMessage" class="i-error-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import { computed, toRefs, useAttrs, ref } from 'vue';

export default {
  name: 'ITextArea',
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    inputId: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: '',
    },
    autoComplete: {
      type: String,
      default: 'off',
    },
    size: {
      type: String,
      default: 'base',
      validator(value) {
        return ['base', 'lg'].includes(value);
      },
    },
    readOnly: Boolean,
    invalid: Boolean,
    errorMessage: {
      type: String,
      default: '',
    },
    dark: Boolean,
    borderless: Boolean,
    showTextLimit: Boolean,
    preventEnterKey: {
      type: Boolean,
      default: false,
    },
    isNullWhenEmpty: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['update:modelValue', 'focus', 'blur', 'pressEnter', 'pressEnterShift'],
  setup(props, { emit }) {
    const attrs = useAttrs();
    const {
      size,
      disabled,
      readOnly,
      errorMessage,
      invalid,
      dark,
      borderless,
      placeholder,
      showTextLimit,
    } = toRefs(props);

    const localModel = ref(props.modelValue);

    const filled = computed(() => props.modelValue != null && props.modelValue !== '');

    const classes = computed(() => {
      const classObject = {
        dark: dark.value,
        disabled: disabled.value,
        invalid: invalid.value || !!errorMessage.value,
        filled: filled.value,
        borderless: borderless.value,
        sm: size.value === 'sm',
      };

      if (size.value !== 'base') {
        classObject[size.value] = true;
      }

      return classObject;
    });

    const textLength = computed(() => (props.modelValue || '').length);

    const maxTextLength = computed(() => attrs.maxlength);
    const emptyVal = computed(() => (props.isNullWhenEmpty ? null : ''));

    const isTextLimitVisible = computed(
      () => showTextLimit.value && maxTextLength.value && !disabled.value && !readOnly.value,
    );

    const isLabelActive = computed(() => filled.value || !!placeholder.value);

    const onInput = (event) => {
      let val = event.target.value;
      if (val.length > 0) {
        val = event.target.value.trimStart();
      }
      emit('update:modelValue', val.length > 0 ? val : emptyVal.value);

      if (event.target.value.length > 0) {
        localModel.value = event.target.value.trimStart();
      }
    };

    const onFocus = () => emit('focus');
    const onBlur = () => {
      if (props.modelValue) {
        emit('update:modelValue', props.modelValue.trim());
        localModel.value = localModel.value.trim();
      }
      emit('blur');
    };
    const pressKeyEnter = () => emit('pressEnter');
    const pressKeyEnterShift = () => emit('pressEnterShift');

    return {
      filled,
      classes,
      textLength,
      maxTextLength,
      isTextLimitVisible,
      isLabelActive,
      localModel,
      onInput,
      onFocus,
      onBlur,
      pressKeyEnter,
      pressKeyEnterShift,
    };
  },
};
</script>

<style>
@reference "@/assets/global.css";
.i-textarea-wrapper {
  .i-textarea {
    @apply tw:relative tw:h-[120px] tw:bg-white tw:border tw:border-gray-500 tw:rounded-xs tw:px-4 tw:pt-4;

    &.disabled {
      @apply tw:bg-gray-300 tw:text-gray-600;
    }

    &.invalid,
    &.invalid.filled,
    &.invalid.dark {
      border-color: var(--red-300) !important;
    }

    .i-textarea-limit {
      position: absolute;
      right: 10px;
      bottom: 5px;
      font-size: var(--size-xs);
      color: var(--gray-400);
    }

    &:focus-within {
      @apply tw:border-gray-700;
    }

    .textarea {
      @apply tw:w-full tw:h-[90px] tw:p-0 tw:text-sm tw:text-gray-900 tw:text-ellipsis tw:resize-none tw:border-none;

      &:focus-visible,
      &:focus {
        outline: none;
      }

      &::placeholder {
        @apply tw:text-gray-700;
        opacity: 1; /* Firefox */
      }

      &:-webkit-input-placeholder {
        /* Internet Explorer 10-11 */
        @apply tw:text-gray-700;
      }

      &::-webkit-input-placeholder {
        /* Microsoft Edge */
        @apply tw:text-gray-700;
      }

      &:disabled {
        @apply tw:text-gray-600 tw:bg-transparent;
      }
    }
  }
}
</style>
