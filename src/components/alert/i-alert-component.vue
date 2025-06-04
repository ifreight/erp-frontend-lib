<template>
  <div class="tw:flex tw:gap-2.5 tw:min-w-[358px] tw:max-w-[408px] tw:w-fit">
    <div v-if="showIcon" class="icon-wrapper">
      <ic-alert-error v-if="type === 'error'" />
      <ic-alert-success v-if="type === 'success'" />
      <ic-alert-warning v-if="type === 'warning'" />
      <ic-alert-info v-if="type === 'info'" />
    </div>
    <div class="toast-message">
      {{ message }}
    </div>
  </div>
</template>

<script>
import IcAlertError from '@/icons/ic-alert-error.vue';
import IcAlertSuccess from '@/icons/ic-alert-success.vue';
import IcAlertInfo from '@/icons/ic-alert-info.vue';
import IcAlertWarning from '@/icons/ic-alert-warning.vue';

export default {
  name: 'IAlert',
  components: {
    IcAlertError,
    IcAlertSuccess,
    IcAlertInfo,
    IcAlertWarning,
  },
  props: {
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'info',
      validator(value) {
        return ['error', 'info', 'success', 'warning'].includes(value);
      },
    },
    showIcon: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style>
@reference "@/assets/global.css";

.Toastify__toast-container {
  @apply tw:w-[450px] tw:flex tw:flex-col tw:items-end;

  .Toastify__toast {
    @apply tw:min-h-0 tw:max-h-none tw:h-10 tw:pl-4 tw:min-w-[400px] tw:max-w-[450px] tw:w-fit tw:cursor-default;

    .toast-message {
      @apply tw:text-gray-900 tw:text-sm tw:truncate;
    }

    &.auto-height {
      @apply tw:h-auto;

      .toast-message {
        overflow: visible !important;
        text-overflow: clip !important;
        white-space: normal !important;
      }
    }

    .icon-wrapper {
      @apply tw:flex tw:items-center;

      svg {
        @apply tw:w-4 tw:h-4 tw:text-white;
      }
    }

    &.Toastify__toast-theme--light {
      &.Toastify__toast--info {
        @apply tw:bg-blue-100 tw:border tw:border-blue-300;
      }

      &.Toastify__toast--success {
        @apply tw:bg-green-100 tw:border tw:border-green-300;
      }

      &.Toastify__toast--warning {
        @apply tw:bg-yellow-70 tw:border tw:border-yellow-400;
      }

      &.Toastify__toast--error {
        @apply tw:bg-red-100 tw:border tw:border-red-300;
      }
    }

    .Toastify__toast-body {
      @apply tw:p-0 tw:grow-0 tw:min-w-0;
    }

    .Toastify__close-button {
      @apply tw:w-[18px] tw:h-[18px];

      &.Toastify__close-button--light {
        @apply tw:text-gray-900 tw:opacity-100 tw:grow-0 tw:shrink-0 tw:my-auto;
      }

      svg {
        @apply tw:w-full tw:h-full;
      }
    }
  }
}
</style>
