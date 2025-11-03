<template>
  <div class="i-dropdown-wrapper">
    <!-- Trigger -->
    <span ref="triggerRef" class="i-dropdown-trigger" :style="{ display: triggerDisplay }">
      <slot />
    </span>

    <!-- Teleport dropdown ke body -->
    <template v-if="!appendToBody">
      <transition name="fade-dropdown">
        <div
          v-if="visible"
          ref="dropdownWrapper"
          class="i-dropdown"
          :class="[openDirection, xPosition, ...dropdownClass]"
          style="position: absolute; z-index: 100"
        >
          <!-- Arrow -->
          <div
            v-if="isShowArrow"
            ref="dropdownArrow"
            class="i-dropdown-arrow"
            :style="arrowStylePosition"
          >
            <span class="i-dropdown-arrow-icon"></span>
          </div>

          <!-- Box -->
          <div
            ref="dropdownBox"
            class="i-dropdown-box"
            :class="boxClasses"
            :style="{ width: boxWidth }"
          >
            <slot name="dropdown" />
          </div>
        </div>
      </transition>
    </template>
    <teleport v-else to="body">
      <transition name="fade-dropdown">
        <div
          v-if="visible"
          ref="dropdownWrapper"
          class="i-dropdown"
          :class="[openDirection, xPosition, ...dropdownClass]"
          style="position: absolute; z-index: 100"
        >
          <!-- Arrow -->
          <div
            v-if="isShowArrow"
            ref="dropdownArrow"
            class="i-dropdown-arrow"
            :style="arrowStylePosition"
          >
            <span class="i-dropdown-arrow-icon"></span>
          </div>

          <!-- Box -->
          <div
            ref="dropdownBox"
            class="i-dropdown-box"
            :class="boxClasses"
            :style="{ width: boxWidth }"
          >
            <slot name="dropdown" />
          </div>
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount, nextTick, watch, computed } from 'vue';

export default {
  name: 'IDropdown',
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    width: {
      type: String,
      default: '100%',
    },
    isShowArrow: {
      type: Boolean,
      default: true,
    },
    rounded: {
      type: String,
      default: 'xs',
    },
    relativeBox: {
      type: Boolean,
      default: false,
    },
    borderless: {
      type: Boolean,
      default: false,
    },
    padding: {
      type: String,
      default: 'base',
      validator(value) {
        return ['none', 'base', 'lg'].includes(value);
      },
    },
    preferenceXPosition: {
      type: String,
      default: 'left',
      validator(value) {
        return ['left', 'right', 'center'].includes(value);
      },
    },
    triggerDisplay: {
      type: String,
      default: 'block',
    },
    dropdownClass: {
      type: Array,
      default: () => [],
    },
    arrowPositionPercentage: {
      type: Number,
      default: 15,
    },
    appendToBody: {
      type: Boolean,
      default: false,
    },
    boxOnBottom: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:visible'],
  setup(props, { emit }) {
    const triggerRef = ref(null);
    const dropdownWrapper = ref(null);
    const dropdownBox = ref(null);
    const dropdownArrow = ref(null);

    const openDirection = ref('below');
    const xPosition = ref(props.preferenceXPosition);

    function closeDropdown() {
      emit('update:visible', false);
    }

    const boxWidth = computed(() => {
      let result;
      if (props.width.includes('%')) {
        const triggerRect = triggerRef.value.getBoundingClientRect();
        const newString = props.width.replace(/%/g, '');
        const width = (triggerRect.width * Number(newString)) / 100;
        result = width + 'px';
      } else {
        result = props.width;
      }
      return result;
    });

    const arrowStylePosition = computed(() => {
      let result = {};
      if (props.isShowArrow) {
        const triggerRect = triggerRef.value.getBoundingClientRect();
        const position = (triggerRect.width * props.arrowPositionPercentage) / 100 + 'px';
        if (xPosition.value === 'left') {
          result = { left: position, right: 'auto' };
        } else if (xPosition.value === 'right') {
          result = { left: 'auto', right: position };
        } else if (xPosition.value === 'center') {
          result = {
            left: '50%',
            transform: 'translateX(-50%)',
          };
        }
        const dropdownBoxEl = dropdownBox.value;
        if (openDirection.value === 'above' && dropdownBoxEl) {
          result.top = dropdownBoxEl.offsetHeight - 10 + 'px';
        }
      }
      return result;
    });

    function updateDropdownPosition() {
      if (!triggerRef.value || !dropdownWrapper.value || !dropdownBox.value) {
        return;
      }

      const triggerRect = triggerRef.value.getBoundingClientRect();
      const dropdownEl = dropdownWrapper.value;
      const dropdownBoxEl = dropdownBox.value;

      const dropdownHeight = dropdownBoxEl.offsetHeight;
      const dropdownWidth = dropdownBoxEl.offsetWidth;
      const windowHeight = window.innerHeight;
      const windowWidth = window.innerWidth;

      // Tentukan konteks posisi (body vs offsetParent)
      const offsetParent = dropdownEl.offsetParent;
      const parentRect =
        !props.appendToBody && offsetParent && offsetParent.getBoundingClientRect
          ? offsetParent.getBoundingClientRect()
          : { top: 0, left: 0 };

      // ===== Vertical positioning =====
      const spaceBelow = windowHeight - triggerRect.bottom;
      const spaceAbove = triggerRect.top;
      let top;

      if (!props.boxOnBottom && spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
        // buka ke atas
        openDirection.value = 'above';
        top = triggerRect.top - dropdownHeight;
      } else {
        // buka ke bawah
        openDirection.value = 'below';
        top = triggerRect.bottom;
      }

      // Sesuaikan jika appendToBody = false (gunakan parent relative)
      if (props.appendToBody) {
        top += window.scrollY;
      } else {
        top -= parentRect.top;
      }

      // ===== Horizontal positioning =====
      const spaceRight = windowWidth - triggerRect.left - dropdownWidth;
      const spaceLeft = triggerRect.right - dropdownWidth;

      let left;

      if (props.preferenceXPosition === 'center') {
        // Posisi di tengah trigger
        left = triggerRect.left + triggerRect.width / 2 - dropdownWidth / 2;
        if (left < 0) {
          left = 0;
        } else if (left + dropdownWidth > windowWidth) {
          left = windowWidth - dropdownWidth;
        }

        xPosition.value = 'center';
      } else if (props.preferenceXPosition === 'left') {
        if (spaceRight < 0 && spaceLeft > 0) {
          xPosition.value = 'right';
          left = triggerRect.right;
        } else {
          xPosition.value = 'left';
          left = triggerRect.left;
        }
      } else if (props.preferenceXPosition === 'right') {
        if (spaceLeft < 0 && spaceRight > 0) {
          xPosition.value = 'left';
          left = triggerRect.left;
        } else {
          xPosition.value = 'right';
          left = triggerRect.right;
        }
      }

      // Sesuaikan konteks posisi
      if (props.appendToBody) {
        left += window.scrollX;
      } else {
        left -= parentRect.left;
      }

      // Terapkan style final
      dropdownEl.style.top = `${top}px`;
      dropdownEl.style.left = `${left}px`;
      dropdownEl.style.right = 'auto';
    }

    function handleClickOutside(event) {
      if (!triggerRef.value || !dropdownWrapper.value) {
        return;
      }

      const clickedOutside =
        !triggerRef.value.contains(event.target) && !dropdownWrapper.value.contains(event.target);

      if (clickedOutside) {
        closeDropdown();
      }
    }

    let resizeObserver;
    watch(
      () => props.visible,
      (val) => {
        if (val) {
          nextTick(() => {
            updateDropdownPosition();

            // Re-observe karena dropdown baru muncul
            if (dropdownBox.value) {
              if (resizeObserver) {
                resizeObserver.disconnect();
              }
              resizeObserver = new ResizeObserver(() => {
                if (props.visible) {
                  updateDropdownPosition();
                }
              });
              resizeObserver.observe(dropdownBox.value);
            }
          });
        } else {
          if (resizeObserver) {
            resizeObserver.disconnect();
          }
        }
      },
    );

    onMounted(function () {
      window.addEventListener('scroll', updateDropdownPosition, true);
      window.addEventListener('click', handleClickOutside);
    });

    onBeforeUnmount(function () {
      window.removeEventListener('scroll', updateDropdownPosition, true);
      window.removeEventListener('click', handleClickOutside);
    });

    const boxClasses = computed(function () {
      return [
        `rounded-${props.rounded}`,
        `padding-${props.padding}`,
        {
          relative: props.relativeBox,
          borderless: props.borderless,
          'hidden-arrow': !props.isShowArrow,
        },
      ];
    });

    return {
      boxClasses,
      dropdownArrow,
      dropdownBox,
      dropdownWrapper,
      openDirection,
      triggerRef,
      xPosition,
      boxWidth,
      arrowStylePosition,
    };
  },
};
</script>

<style scoped>
.i-dropdown {
  position: absolute;
  z-index: 100;
}

.i-dropdown-arrow {
  position: absolute;
  width: 10px;
  z-index: 4;
}

.i-dropdown-box {
  position: absolute;
  z-index: 2;
  overflow: hidden;
  background-color: var(--white);
  border: 1px solid var(--gray-500);
  font-size: 12px;
  min-height: fit-content;
}

.i-dropdown-box.relative {
  position: relative;
}

.i-dropdown-box.borderless {
  border: 0;
}

.i-dropdown-box.rounded-xs {
  border-radius: 2px;
}
.i-dropdown-box.rounded-sm {
  border-radius: 4px;
}
.i-dropdown-box.rounded-lg {
  border-radius: 8px;
}
.i-dropdown-box.rounded-xl {
  border-radius: 12px;
}

.i-dropdown-box.padding-none {
  padding: 0;
}
.i-dropdown-box.padding-base {
  padding: 4px;
}
.i-dropdown-box.padding-lg {
  padding: 8px;
}

/* X Position */
.i-dropdown.left .i-dropdown-box {
  left: 0;
}
.i-dropdown.right .i-dropdown-box {
  right: 0;
}

/* Arrow Below */
.i-dropdown.below .i-dropdown-arrow-icon {
  position: absolute;
  top: 2px;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 10px solid var(--white);
}
.i-dropdown.below .i-dropdown-arrow-icon::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -5px;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 10px solid var(--gray-500);
  z-index: -1;
}
.i-dropdown.below .i-dropdown-box {
  top: 9px;
}
.i-dropdown.below .i-dropdown-box.hidden-arrow {
  top: 4px;
}

/* Arrow Above */
.i-dropdown.above .i-dropdown-arrow {
  bottom: 100%;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 10px solid var(--gray-500);
}
.i-dropdown.above .i-dropdown-arrow::before {
  content: '';
  position: absolute;
  top: -12px;
  left: -5px;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 10px solid var(--white);
  z-index: -1;
}
.i-dropdown.above .i-dropdown-box {
  top: -9px;
}
.i-dropdown.above .i-dropdown-box.hidden-arrow {
  top: -4px;
}

.fade-dropdown-enter-active,
.fade-dropdown-leave-active {
  transition: opacity 0.15s ease;
}
.fade-dropdown-enter-from,
.fade-dropdown-leave-to {
  opacity: 0;
}
</style>
