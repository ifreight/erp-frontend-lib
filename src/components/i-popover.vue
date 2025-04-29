<template>
  <popper
    :arrow="arrow"
    :placement="placement"
    :hover="hover"
    :disable-click-away="disableClickAway"
    :show="show"
    class="i-popover"
    :class="poppersClass"
  >
    <template #content="props">
      <div
        class="i-popover-content"
        :class="{
          'with-flex': showCloseButton
        }"
      >
        <slot name="content" />

        <div
          v-if="showCloseButton"
          class="i-popover-close-button"
          @click="props.close"
        >
          <ic-times class="i-popover-close-icon" />
        </div>
      </div>
    </template>

    <slot />
  </popper>
</template>

<script>
import { computed } from 'vue';
import Popper from "vue3-popper";

import IcTimes from '@/icons/ic-times.vue';

export default {
  name: 'IPopover',
  components: {
    Popper,
    IcTimes
  },
  props: {
    light: {
      type: Boolean,
      default: false
    },
    placement: {
      type: String,
      default: 'bottom'
    },
    arrow: {
      type: Boolean,
      default: false
    },
    hover: {
      type: Boolean,
      default: false
    },
    show: {
      type: Boolean,
      default: null
    },
    showCloseButton: {
      type: Boolean,
      default: false
    },
    disableClickAway: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const poppersClass = computed(() => ({
      'tw:cursor-pointer': !props.hover,
      'light': props.light
    }))

    return {
      poppersClass
    }
  }
}
</script>

<style scoped>
@reference "@/assets/global.css";

.i-popover {
  .i-popover-content {
    &.with-flex {
      @apply tw:flex tw:justify-between tw:gap-3.5;
    }

    .i-popover-close-button {
      @apply tw:h-3 tw:cursor-pointer;

      .i-popover-close-icon {
        @apply tw:w-2.5 tw:h-2.5;
      }
    }
  }

  &.light {
    &:deep(.popper) {
      @apply tw:bg-white tw:border tw:border-gray-300 tw:rounded-lg tw:text-gray-900 tw:p-3 tw:text-3xs;

      box-shadow: 0 6px 30px -6px rgba(45, 45, 45, 0.25);
    }

    &:deep(.popper #arrow::before) {
      @apply tw:bg-white tw:border-t tw:border-gray-300;
    }

    &:deep(.popper:hover),
    :deep(.popper:hover > #arrow::before) {
      @apply tw:bg-white tw:border-t tw:border-gray-300;
    }
  }
}

:deep(.popper) {
  @apply tw:bg-gray-900 tw:rounded-lg tw:text-white tw:p-3 tw:text-3xs;

  box-shadow: 0 6px 30px -6px rgba(45, 45, 45, 0.25);
}

:deep(.popper #arrow::before) {
  @apply tw:bg-gray-900;
}

:deep(.popper:hover),
:deep(.popper:hover > #arrow::before) {
  @apply tw:bg-gray-900;
}
</style>