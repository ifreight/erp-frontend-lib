<template>
  <div class="tw:hidden"></div>
</template>

<script>
import { computed, watch } from 'vue';
import { toast } from 'vue3-toastify';

import IcAlertError from "@/icons/ic-alert-error.vue";
import IcAlertSuccess from "@/icons/ic-alert-success.vue";
import IcAlertInfo from "@/icons/ic-alert-info.vue";
import IcAlertWarning from "@/icons/ic-alert-warning.vue";

export default {
  name: 'IAlert',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    autoClose: {
      type: [Boolean, Number],
      default: 5000
    },
    showCloseButton: {
      type: Boolean,
      default: true
    },
    showIconType: {
      type: Boolean,
      default: true
    },
    alertType: {
      type: String,
      default: 'info',
      validator(value) {
        return ['error', 'info', 'success', 'warning'].includes(value)
      }
    },
    title: {
      type: String,
      default: null,
    },
    message: {
      type: String,
      required: true
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const toastObject = computed(() => {
      switch (props.alertType) {
        case 'error':
          return {
            type: toast.TYPE.ERROR,
            icon: props.showIconType ? IcAlertError : false
          }
        case 'success':
          return {
            type: toast.TYPE.SUCCESS,
            icon: props.showIconType ? IcAlertSuccess : false
          }
        case 'warning':
          return {
            type: toast.TYPE.WARNING,
            icon: props.showIconType ? IcAlertWarning : false
          }
        default:
          return {
            type: toast.TYPE.INFO,
            icon: props.showIconType ? IcAlertInfo : false
          }
      }
    })

    watch(() => props.modelValue, (value) => {
      if (value) {
        toast(props.message, {
          ...toastObject.value,
          autoClose: props.autoClose,
          closeButton: props.showCloseButton,
          transition: toast.TRANSITIONS.SLIDE,
          closeOnClick: props.autoClose ? false : true,
          hideProgressBar: true,
          onClose: () => {
            emit('update:modelValue', !value)
          }
        })
      }
    })
  }
}
</script>

<style>
@reference "@/assets/global.css";

.Toastify__toast-container {
  &.Toastify__toast-container--top-right,
  &.Toastify__toast-container--top-left,
  &.Toastify__toast-container--top-center,
  &.Toastify__toast-container--bottom-left,
  &.Toastify__toast-container--bottom-center,
  &.Toastify__toast-container--bottom-right {
    @apply tw:min-w-[400px] tw:max-w-[450px];
  }

  .Toastify__toast {
    @apply tw:min-h-0 tw:max-h-none tw:h-10 tw:pl-4;

    &.Toastify__toast-theme--light {
      &.Toastify__toast--info {
        @apply tw:bg-blue-10 tw:border tw:border-blue-300;
      }

      &.Toastify__toast--success {
        @apply tw:bg-green-10 tw:border tw:border-green-300;
      }

      &.Toastify__toast--warning {
        @apply tw:bg-yellow-100 tw:border tw:border-yellow-400;
      }

      &.Toastify__toast--error {
        @apply tw:bg-red-10 tw:border tw:border-red-300;
      }
    }

    .Toastify__toast-body {
      @apply tw:p-0 tw:text-gray-900 tw:text-sm;

      .Toastify__toast-icon {
        @apply tw:mr-1.5;
      }
    }

    .Toastify__close-button {
      @apply tw:w-[18px] tw:h-[18px];

      &.Toastify__close-button--light {
        @apply tw:text-gray-900 tw:opacity-100;
      }

      svg {
        @apply tw:w-full tw:h-full;
      }
    }
  }
}
</style>