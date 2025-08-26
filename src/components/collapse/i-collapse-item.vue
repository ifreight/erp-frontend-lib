<template>
  <div
    class="i-collapse-item"
    :class="{
      active: isActive,
      before: beforeActiveItem,
      after: afterActiveItem,
    }"
  >
    <div class="i-collapse-item-header" @click.stop="clickHandler">
      <slot name="header" />
      <ic-chevron-down
        class="i-collapse-item-header-icon"
        :class="isActive ? 'tw:rotate-180' : ''"
      />
    </div>
    <Transition name="slide">
      <div v-if="isActive">
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
      default: () => Math.floor(Math.random() * 10000),
    },
    index: {
      type: Number,
      default: 0,
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

    const currentActiveIndex = computed(() => {
      const activeIndex = [];
      collapse.activeName.value.forEach((item) => {
        const i = collapse.itemList.value.indexOf(item);
        activeIndex.push(i);
      });

      return activeIndex;
    });
    const itemIndex = computed(() => Number(collapse.itemList.value.indexOf(props.name)));
    const beforeActiveItem = computed(() => currentActiveIndex.value.includes(itemIndex.value + 1));
    const afterActiveItem = computed(() => currentActiveIndex.value.includes(itemIndex.value - 1));

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
      beforeActiveItem,
      afterActiveItem,
      clickHandler,
      collapse,
    };
  },
};
</script>

<style>
@reference '@/assets/global.css';

.i-collapse-item {
  @apply tw:border tw:border-gray-500 tw:rounded-lg;

  .slide-enter-active,
  .slide-leave-active {
    transition: all 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  .slide-enter-from,
  .slide-leave-to {
    transform: translate3d(0, -100%, 0);
    opacity: 0;
  }

  .slide-enter-to,
  .slide-leave-from {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }

  .i-collapse-item-header {
    @apply tw:flex tw:justify-between tw:items-center tw:p-5 tw:cursor-pointer;

    .i-collapse-item-header {
      @apply tw:w-6 tw:h-6;
    }
  }
}
</style>
