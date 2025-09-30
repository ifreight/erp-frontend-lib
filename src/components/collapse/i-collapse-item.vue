<template>
  <div
    class="i-collapse-item"
    :class="collapseItemClass"
    :style="{ 'margin-bottom': gap !== '' ? `${gap} !important` : '' }"
  >
    <div
      class="i-collapse-item-header"
      :class="collapseItemHeaderClass"
      @click="!useChevronToExpand ? clickHandler() : null"
    >
      <div @click.stop>
        <slot name="header" />
      </div>
      <div
        class="i-collapse-item-icon"
        @click="useChevronToExpand ? clickHandler() : null"
      >
        <ic-chevron-down :class="isActive ? 'tw:rotate-180' : ''" />
      </div>
    </div>
    <div
      v-if="isActive"
      class="i-collapse-item-line"
    />
    <Transition name="slide">
      <div
        v-if="isActive"
        class="i-collapse-item-content"
      >
        <slot />
      </div>
    </Transition>
  </div>
</template>

<script>
import { computed, inject, onBeforeMount, onBeforeUnmount, onUpdated } from 'vue';
import IcChevronDown from '@/icons/ic-chevron-down.vue';

export default {
  name: 'ICollapseItem',
  components: {
    IcChevronDown,
  },
  props: {
    name: {
      type: [String, Number],
      required: true,
    },
    index: {
      type: Number,
      default: 0,
    },
    useChevronToExpand: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'base',
      validator(value) {
        return ['base', 'lg'].includes(value);
      },
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    gap: {
      type: String,
      default: '',
    },
  },
  emits: ['click'],
  setup(props, { emit }) {
    const collapse = inject('ICollapseKey');
    const isActive = computed(() => collapse.activeName.value.includes(props.name));

    const clickHandler = () => {
      emit('click', props.name);
      collapse.handleClickEvent(props.name);
    };

    const itemIndex = computed(() => Number(collapse.itemList.value.indexOf(props.name)));

    const collapseItemClass = computed(() => {
      return {
        active: isActive.value,
        rounded: props.rounded,
        'has-gap': props.gap,
      };
    });

    const collapseItemHeaderClass = computed(() => {
      return [props.size, { 'use-chevron-to-expand': props.useChevronToExpand }];
    });

    onBeforeMount(() => {
      if (collapse !== undefined) {
        collapse.itemList.value[props.index] = props.name;
      }
    });

    onBeforeUnmount(() => {
      collapse.itemList.value.splice(itemIndex.value, 1);
    });

    onUpdated(() => {
      if (itemIndex.value === -1 && collapse !== undefined) {
        collapse.itemList.value[props.index] = props.name;
      }
    });

    return {
      isActive,
      collapseItemClass,
      collapseItemHeaderClass,
      clickHandler,
    };
  },
};
</script>

<style>
@reference '@/assets/global.css';

.i-collapse-item {
  @apply tw:border tw:border-gray-500;

  .slide-enter-active {
    transition: all 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  .slide-enter-from,
  .slide-leave-to {
    transform: translate3d(0, -20%, 0);
    opacity: 0;
  }

  .slide-enter-to,
  .slide-leave-from {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }

  .i-collapse-item-header {
    @apply tw:flex tw:justify-between tw:items-center tw:px-5;

    &.base {
      @apply tw:py-3.5;
    }

    &.lg {
      @apply tw:py-5;
    }

    &:not(.use-chevron-to-expand) {
      @apply tw:cursor-pointer;
    }

    .i-collapse-item-icon {
      @apply tw:w-6 tw:flex tw:justify-end tw:shrink-0;
    }

    &.use-chevron-to-expand {
      .i-collapse-item-icon {
        @apply tw:cursor-pointer;
      }
    }
  }

  .i-collapse-item-line {
    @apply tw:border-t tw:border-t-gray-500;
  }

  .i-collapse-item-content {
    @apply tw:px-5 tw:min-h-[90px];
  }

  &:first-child {
    @apply tw:border-t tw:border-t-gray-500;

    &.rounded {
      @apply tw:rounded-tl-lg tw:rounded-tr-lg;
    }

    &:not(.has-gap) {
      @apply tw:rounded-b-none;
    }
  }

  &:last-child {
    @apply tw:border-b tw:border-b-gray-500;

    &.rounded {
      @apply tw:rounded-bl-lg tw:rounded-br-lg;
    }

    &.has-gap {
      @apply tw:mb-0;
    }

    &:not(.has-gap) {
      @apply tw:border-b tw:border-b-gray-500;
    }
  }

  &.rounded {
    @apply tw:rounded-lg;
  }

  &.has-gap {
    @apply tw:border-t tw:border-t-gray-500;
  }

  &:not(.has-gap) {
    @apply tw:rounded-none tw:border-b-0;
  }
}
</style>
