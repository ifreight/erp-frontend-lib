<template>
  <transition name="i-dialog-fade">
    <div v-show="show" class="i-dialog-wrapper" @click.self="handleClickSelf">
      <transition name="i-dialog-slide" @after-enter="$emit('opened')" @after-leave="afterLeave">
        <div
          v-show="show"
          :key="key"
          role="dialog"
          aria-modal="true"
          aria-labelledby="dialog"
          :class="['i-dialog', { 'show-header': showHeader }]"
          :style="dialogStyle"
        >
          <div v-if="showHeader" class="i-dialog-header">
            <slot name="header" />
          </div>

          <button v-if="showClose" class="i-dialog-close" @click="handleClose">
            <ic-times />
          </button>

          <div class="i-dialog-body" :class="bodyClasses">
            <slot />
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue';
import IcTimes from '@/icons/ic-times.vue';

export default {
  name: 'IDialog',
  components: { IcTimes },
  props: {
    show: Boolean,
    showClose: Boolean,
    showHeader: Boolean,
    bodyClasses: { type: String, default: '' },
    top: { type: String, default: '15vh' },
    width: { type: String, default: '50%' },
    appendToBody: Boolean,
    destroyOnClose: Boolean,
    ignoreClickOutside: { type: Boolean, default: false },
  },
  emits: ['update:show', 'close', 'closed', 'open', 'opened'],
  setup(props, { emit }) {
    const key = ref(0);
    const dialogElement = ref(null);

    const dialogStyle = computed(() => ({
      width: props.width,
      marginTop: props.top,
    }));

    const open = () => {
      emit('open');
      document.body.style.overflow = 'hidden';
      if (props.appendToBody && dialogElement.value) {
        document.body.appendChild(dialogElement.value);
      }
    };

    const close = () => {
      emit('close');
      emit('update:show', false);
    };

    const afterLeave = () => {
      document.body.style.overflow = 'auto';
      if (props.destroyOnClose) {
        nextTick(() => key.value++);
      }
      emit('closed');
    };

    const handleClickSelf = () => {
      if (!props.ignoreClickOutside) {
        close();
      }
    };

    watch(
      () => props.show,
      (val) => {
        if (val) open();
      },
    );

    onMounted(() => {
      if (props.show) open();
    });

    onUnmounted(() => {
      document.body.style.overflow = 'auto';
    });

    return {
      key,
      dialogStyle,
      dialogElement,
      handleClose: close,
      handleClickSelf,
      afterLeave,
    };
  },
};
</script>

<style>
@reference "@/assets/global.css";

@keyframes i-dialog-fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes i-dialog-fade-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.i-dialog-fade-enter-active {
  animation: i-dialog-fade-in 0.1s;
}
.i-dialog-fade-leave-active {
  animation: i-dialog-fade-out 0.1s;
}

@keyframes i-dialog-slide-in {
  0% {
    transform: translateY(-2.5rem);
  }
  100% {
    transform: translateY(0);
  }
}
@keyframes i-dialog-slide-out {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-2.5rem);
  }
}

.i-dialog-slide-enter-active {
  animation: i-dialog-slide-in 0.2s;
}
.i-dialog-slide-leave-active {
  animation: i-dialog-slide-out 0.2s;
}

.i-dialog-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  margin: 0;
  overflow: auto;
  background-color: rgb(0 0 0 / 50%);
}

.i-dialog {
  position: relative;
  margin: 0 auto 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 0 20px rgb(0 0 0 / 25%);
}

.i-dialog-header {
  @apply tw:text-xl tw:font-bold tw:px-8 tw:pt-6 tw:pb-0 tw:w-full;
}

.i-dialog-body {
  @apply tw:p-8 tw:w-full;
}

.i-dialog-close {
  @apply tw:absolute tw:top-7 tw:right-7 tw:bg-transparent tw:cursor-pointer;
}
</style>
