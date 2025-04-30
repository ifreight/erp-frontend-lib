<template>
  <popper
    :arrow="showArrow"
    :placement="placement"
    :hover="hover"
    :show="isShow"
    :disabled="disabled"
    class="i-popover"
    :class="poppersClass"
  >
    <template #content>
      <div
        ref="popperContentRef"
        class="i-popover-content"
        :class="customClass"
      >
        <slot name="content" />

        <div
          v-if="showCloseButton"
          class="i-popover-close-button"
          @click="() => isShow = false"
        >
          <ic-times class="i-popover-close-icon" />
        </div>
      </div>
    </template>

    <span ref="popperSlotRef">
      <slot />
    </span>
  </popper>
</template>

<script>
import { computed, ref, onMounted, watch, onUnmounted } from 'vue';
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
    showArrow: {
      type: Boolean,
      default: false
    },
    hover: {
      type: Boolean,
      default: false
    },
    showCloseButton: {
      type: Boolean,
      default: false
    },
    ignoreClickOutside: {
      type: Boolean,
      default: false
    },
    customClass: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const popperSlotRef = ref()
    const popperContentRef = ref()
    const isShow = ref(false)

    const poppersClass = computed(() => ({
      'tw:cursor-pointer': !props.hover,
      'light': props.light
    }))

    const togglePopover = () => {
      isShow.value = !isShow.value
    }

    const clickOutsidePopover = (e) => {
      const popperRefArray = ref([popperSlotRef.value, popperContentRef.value])
      const isClickInside = popperRefArray.value.some((item) => e.composedPath().includes(item))
      if (!isClickInside) {
        isShow.value = false
      }
    }

    watch(() => isShow.value, (val) => {
      if (props.ignoreClickOutside || props.hover) {
        return false
      }

      if (val) {
        document.addEventListener('click', clickOutsidePopover, true);
      } else {
        document.removeEventListener('click', clickOutsidePopover, true);
      }
    });

    onMounted(() => {
      if (props.hover) {
        popperSlotRef.value.addEventListener('mouseenter', togglePopover)
        popperSlotRef.value.addEventListener('mouseleave', togglePopover)
      } else {
        popperSlotRef.value.addEventListener('click', togglePopover, true)
      }
    });

    onUnmounted(() => {
      popperSlotRef.value.removeEventListener('mouseenter', togglePopover)
      popperSlotRef.value.removeEventListener('mouseleave', togglePopover)
      popperSlotRef.value.removeEventListener('click', togglePopover, true)
    })

    return {
      poppersClass,
      popperContentRef,
      popperSlotRef,
      isShow
    }
  }
}
</script>

<style scoped>
@reference "@/assets/global.css";

.i-popover {
  .i-popover-content {
    .i-popover-close-button {
      @apply tw:h-3 tw:cursor-pointer tw:absolute tw:right-3 tw:top-3;

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