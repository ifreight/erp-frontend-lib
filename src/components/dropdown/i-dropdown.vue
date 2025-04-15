<template>
  <div
    class="i-dropdown"
    :class="openDirection"
  >
    <div
      ref="reference"
      class="i-dropdown-reference"
    />

    <div
      v-show="visible"
      class="i-dropdown-arrow"
    >
      <span :style="arrowStyles" />
    </div>

    <div
      v-show="visible"
      class="i-dropdown-box"
      :style="{ width }"
    >
      <slot />
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';

export default {
  name: 'IDropdown',
  props: {
    visible: Boolean,
    width: {
      type: String,
      default: '100%',
    },
  },
  setup(props) {
    const openDirection = ref('below');
    const reference = ref();

    const arrowStyles = computed(() => {
      if (openDirection.value === 'below') {
        return {
          top: '-7px',
        };
      }
      return {
        top: '-9px',
      };
    });

    watch(() => props.visible, (value) => {
      if (value && reference.value) {
        const spaceBelow = window.innerHeight - reference.value.getBoundingClientRect().bottom;
        if (spaceBelow > 250) {
          openDirection.value = 'below';
        } else {
          openDirection.value = 'above';
        }
      }
    });

    return {
      openDirection,
      arrowStyles,
      reference,
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

    span {
      position: absolute;
      left: 15%;
      z-index: 3;
      border: solid 8px transparent;
    }
  }

  .i-dropdown-box {
    position: absolute;
    left: 0;
    z-index: 2;
    padding: 20px;
    overflow: hidden;
    background-color: var(--white);
    border-radius: 10px;
    box-shadow: 0 0 20px rgb(0 0 0 / 25%);
  }

  &.below {
    .i-dropdown-arrow {
      top: 100%;

      span {
        border-bottom-color: var(--white);
      }
    }

    .i-dropdown-box {
      top: calc(100% + 9px);
    }
  }

  &.above {
    .i-dropdown-arrow {
      bottom: 100%;

      span {
        border-top-color: var(--white);
      }
    }

    .i-dropdown-box {
      bottom: calc(100% + 9px);
    }
  }
}
</style>
