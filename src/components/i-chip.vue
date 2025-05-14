<template>
  <div class="i-chip-wrapper">
    <div
      class="i-chip"
      :class="status"
    >
      <span class="status-dot tw:mr-2"></span>
      <span class="tw:text-xs">{{ text }}</span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'IChip',
  props: {
    text: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: 'neutral',
      validator(value) {
        return ['error', 'success', 'info', 'neutral'].includes(value);
      },
    },
  },
};
</script>

<style>
@reference "@/assets/global.css";

.i-chip-wrapper {
  .i-chip {
    @apply tw:flex tw:items-center tw:w-fit tw:py-1 tw:px-2 tw:rounded-[54px];

    .status-dot {
      @apply tw:w-[7px] tw:h-[7px] tw:rounded-[50%];
    }

    &.error {
      @apply tw:bg-red-100 tw:text-red-600;

      .status-dot {
        @apply tw:bg-red-600;
      }
    }

    &.success {
      @apply tw:bg-green-100 tw:text-green-600;

      .status-dot {
        @apply tw:bg-green-600;
      }
    }

    &.info {
      @apply tw:bg-blue-100 tw:text-blue-600;

      .status-dot {
        @apply tw:bg-blue-600;
      }
    }

    &.neutral {
      @apply tw:bg-gray-500 tw:text-gray-900;

      .status-dot {
        @apply tw:bg-gray-900;
      }
    }
  }
}
</style>
