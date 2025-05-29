<template>
  <div class="i-dropdown" :class="openDirection">
    <div ref="reference" class="i-dropdown-reference" />

    <div v-show="visible && isShowArrow" class="i-dropdown-arrow">
      <span class="i-dropdown-arrow-icon"></span>
    </div>

    <div v-show="visible" class="i-dropdown-box" :class="boxClasses" :style="{ width }">
      <slot />
    </div>
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue';

export default {
  name: 'IDropdown',
  props: {
    visible: Boolean,
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
  },
  setup(props) {
    const openDirection = ref('below');
    const reference = ref();

    watch(
      () => props.visible,
      (value) => {
        if (value && reference.value) {
          const spaceBelow = window.innerHeight - reference.value.getBoundingClientRect().bottom;
          if (spaceBelow > 250) {
            openDirection.value = 'below';
          } else {
            openDirection.value = 'above';
          }
        }
      },
    );
    const boxClasses = computed(() => {
      return [
        `rounded-${props.rounded}`,
        `padding-${props.padding}`,
        {
          relative: props.relativeBox,
          borderless: props.borderless,
        },
      ];
    });
    return {
      openDirection,
      reference,
      boxClasses,
    };
  },
};
</script>

<style>
.i-dropdown {
  .i-dropdown-reference {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
  }

  .i-dropdown-arrow {
    position: absolute;
    width: 100%;
    left: 15%;
    z-index: 4;
  }

  .i-dropdown-box {
    position: absolute;
    left: 0;
    z-index: 2;
    overflow: hidden;
    background-color: var(--white);
    border: 1px solid var(--gray-500);
    font-size: 12px;

    &.relative {
      position: relative;
    }

    &.borderless {
      border: 0px;
    }

    &.rounded-xs {
      border-radius: 2px;
    }
    &.rounded-sm {
      border-radius: 4px;
    }
    &.rounded-lg {
      border-radius: 8px;
    }
    &.rounded-xl {
      border-radius: 12px;
    }

    &.padding-none {
      padding: 0px;
    }
    &.padding-base {
      padding: 4px;
    }
    &.padding-lg {
      padding: 8px;
    }
  }

  &.below {
    .i-dropdown-arrow-icon {
      position: absolute;
      top: 2px;
      width: 0;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-bottom: 10px solid var(--white);
    }
    .i-dropdown-arrow-icon::before {
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

    .i-dropdown-box {
      top: calc(100% + 9px);
    }
  }

  &.above {
    .i-dropdown-arrow {
      position: absolute;
      bottom: 100%;
      width: 0;
      height: 0;
      border-left: 5px solid transparent; /* Left side */
      border-right: 5px solid transparent; /* Right side */
      border-top: 10px solid var(--gray-500);
    }

    .i-dropdown-arrow::before {
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
    .i-dropdown-box {
      bottom: calc(100% + 9px);
    }
  }
}
</style>
