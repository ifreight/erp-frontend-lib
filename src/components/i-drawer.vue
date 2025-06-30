<template>
  <Teleport to="body" :disabled="!teleportToBody">
    <Transition
      class="i-drawer"
      name="drawer-fade"
      @before-enter="onBeforeEnter"
      @after-enter="onAfterEnter"
      @after-leave="onAfterLeave"
    >
      <div
        v-if="modelValue"
        class="tw:fixed tw:inset-0 tw:z-3 tw:flex"
        :class="backdropClass"
        @click="handleBackdropClick"
      >
        <Transition :name="`drawer-slide-${direction}`" appear>
          <div
            v-if="modelValue"
            class="tw:relative tw:flex tw:flex-col tw:bg-white tw:shadow-xl"
            :class="[drawerClass]"
            :style="sizeStyle"
            @click.stop
          >
            <div
              v-if="!hideHeader"
              class="tw:flex tw:items-center tw:justify-between tw:px-8 tw:py-6 tw:border-b tw:border-gray-700"
              :class="headerClass"
            >
              <div class="tw:flex tw:items-center">
                <slot name="header">
                  <h3 class="tw:text-xl tw:font-semibold tw:text-gray-900 tw:leading-[28px]">
                    {{ title }}
                  </h3>
                </slot>
              </div>

              <i-button
                v-if="showClose"
                text
                class="tw:w-fit tw:h-auto tw:text-gray-900"
                :class="closeButtonClass"
                @click="handleClose"
              >
                <ic-times />
              </i-button>
            </div>

            <!-- Body -->
            <div class="tw:flex-1 tw:overflow-y-auto" :class="bodyClass">
              <div class="tw:p-8">
                <slot />
              </div>
            </div>

            <!-- Footer -->
            <div
              v-if="$slots.footer"
              class="tw:px-8 tw:py-6 tw:border-t tw:border-gray-700"
              :class="footerClass"
            >
              <slot name="footer" />
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script>
import { computed, watch, nextTick, onUnmounted } from 'vue';

import IButton from '@/components/i-button.vue';
import IcTimes from '@/icons/ic-times.vue';

export default {
  name: 'IDrawer',
  components: {
    IButton,
    IcTimes,
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    direction: {
      type: String,
      default: 'right', // 'left', 'right', 'top', 'bottom'
      validator: (value) => ['left', 'right', 'top', 'bottom'].includes(value),
    },
    size: {
      type: [String, Number],
      default: '30%',
    },
    modal: {
      type: Boolean,
      default: true,
    },
    closeOnClickModal: {
      type: Boolean,
      default: true,
    },
    closeOnPressEscape: {
      type: Boolean,
      default: true,
    },
    showClose: {
      type: Boolean,
      default: true,
    },
    hideHeader: {
      type: Boolean,
      default: false,
    },
    customClass: {
      type: String,
      default: '',
    },
    headerClass: {
      type: String,
      default: '',
    },
    bodyClass: {
      type: String,
      default: '',
    },
    footerClass: {
      type: String,
      default: '',
    },
    closeButtonClass: {
      type: String,
      default: '',
    },
    hideOnPressEscape: {
      type: Boolean,
      default: true,
    },
    teleportToBody: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['update:modelValue', 'open', 'opened', 'close', 'closed'],
  setup(props, { emit }) {
    const backdropClass = computed(() => [
      props.modal ? 'tw:bg-gray-900 tw:bg-gray-900/30' : '',
      props.direction === 'left' ? 'tw:justify-start' : '',
      props.direction === 'right' ? 'tw:justify-end' : '',
      props.direction === 'top' ? 'tw:items-start' : '',
      props.direction === 'bottom' ? 'tw:items-end' : '',
    ]);

    const drawerClass = computed(() => [
      props.customClass,
      props.direction === 'left' || props.direction === 'right' ? 'tw:h-full' : 'tw:w-full',
      props.direction === 'top' || props.direction === 'bottom' ? 'tw:max-h-full' : 'tw:max-w-full',
    ]);

    const sizeStyle = computed(() => {
      const size = typeof props.size === 'number' ? `${props.size}px` : props.size;

      switch (props.direction) {
        case 'left':
        case 'right':
          return { width: size };
        case 'top':
        case 'bottom':
          return { height: size };
        default:
          return { width: size };
      }
    });

    const handleClose = () => {
      emit('update:modelValue', false);
      emit('close');
    };

    const handleBackdropClick = () => {
      if (props.closeOnClickModal) {
        handleClose();
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && props.closeOnPressEscape && props.modelValue) {
        handleClose();
      }
    };

    const onBeforeEnter = () => {
      emit('open');
    };

    const onAfterEnter = () => {
      emit('opened');
    };

    const onAfterLeave = () => {
      emit('closed');
    };

    watch(
      () => props.modelValue,
      (newValue) => {
        if (props.hideOnPressEscape) {
          if (newValue) {
            nextTick(() => {
              document.addEventListener('keydown', handleEscapeKey);
              document.body.style.overflow = 'hidden';
            });
          } else {
            document.removeEventListener('keydown', handleEscapeKey);
            document.body.style.overflow = '';
          }
        }
      },
    );

    onUnmounted(() => {
      if (props.hideOnPressEscape) {
        document.removeEventListener('keydown', handleEscapeKey);
        document.body.style.overflow = '';
      }
    });

    return {
      backdropClass,
      drawerClass,
      sizeStyle,
      handleClose,
      handleBackdropClick,
      onBeforeEnter,
      onAfterEnter,
      onAfterLeave,
    };
  },
};
</script>

<style scoped>
.i-drawer {
  /* Fade transition for backdrop */
  .drawer-fade-enter-active,
  .drawer-fade-leave-active {
    transition: opacity 0.3s ease;
  }

  .drawer-fade-enter-from,
  .drawer-fade-leave-to {
    opacity: 0;
  }

  /* Slide transitions for drawer panel */
  .drawer-slide-right-enter-active,
  .drawer-slide-right-leave-active {
    transition: transform 0.3s ease;
  }

  .drawer-slide-right-enter-from,
  .drawer-slide-right-leave-to {
    transform: translateX(100%);
  }

  .drawer-slide-left-enter-active,
  .drawer-slide-left-leave-active {
    transition: transform 0.3s ease;
  }

  .drawer-slide-left-enter-from,
  .drawer-slide-left-leave-to {
    transform: translateX(-100%);
  }

  .drawer-slide-top-enter-active,
  .drawer-slide-top-leave-active {
    transition: transform 0.3s ease;
  }

  .drawer-slide-top-enter-from,
  .drawer-slide-top-leave-to {
    transform: translateY(-100%);
  }

  .drawer-slide-bottom-enter-active,
  .drawer-slide-bottom-leave-active {
    transition: transform 0.3s ease;
  }

  .drawer-slide-bottom-enter-from,
  .drawer-slide-bottom-leave-to {
    transform: translateY(100%);
  }
}
</style>
