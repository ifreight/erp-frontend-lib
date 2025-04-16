<template>
  <div class="i-tabs">
    <div
      ref="tabHeader"
      class="i-tabs-header"
    >
      <div
        ref="tabHeaderWrapper"
        class="i-tabs-header-wrapper"
      >
        <div
          v-for="(pane, index) in panes"
          :key="`i-tab-${index}`"
          class="i-tabs-header-item"
          :class="{
            active: pane.name === activeTab,
            disabled: pane.disabled
          }"
          v-on:click.stop="changeActiveTab(pane)"
        >
          {{ pane.label }}
        </div>
      </div>
      <div
        v-if="isNavLeftVisible"
        class="i-tabs-header-nav-left"
        v-on:click="clickLeft"
      >
        <ic-chevron-left />
      </div>
      <div
        v-if="isNavRightVisible"
        class="i-tabs-header-nav-right"
        v-on:click="clickRight"
      >
        <ic-chevron-right />
      </div>
    </div>

    <slot />
  </div>
</template>

<script>
import { ref, provide, watch, computed, onMounted, useSlots, useTemplateRef, watchEffect, onUpdated } from 'vue';

import IcChevronLeft from '@/icons/ic-chevron-left.vue';
import IcChevronRight from '@/icons/ic-chevron-right.vue';

export default {
  name: 'ITabs',
  props: {
    modelValue: {
      type: String,
      default: undefined,
    }
  },
  components: {
    IcChevronLeft,
    IcChevronRight,
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const activeTab = ref(props.modelValue);
    const panes = ref([]);
    const scrollHorizontalPosition = ref(0);
    const scrollMaxHorizontal = ref(0);
    const tabHeaderWrapperRef = useTemplateRef('tabHeaderWrapper');

    provide('rootTab', activeTab);

    const isNavRightVisible = computed(() => {
      return scrollHorizontalPosition.value < scrollMaxHorizontal.value;
    });

    const isNavLeftVisible = computed(() => {
      return scrollHorizontalPosition.value > 0;
    });

    watch(() => props.modelValue, (value) => {
      if (value !== activeTab.value) {
        activeTab.value = value;
      }
    })

    watchEffect(() => { // so tabHeaderWrapperRef.value is not null
      if (tabHeaderWrapperRef.value) {
        scrollHorizontalPosition.value = tabHeaderWrapperRef.value.scrollLeft;
        tabHeaderWrapperRef.value.addEventListener('scroll', scrollHandler);
      }
    })

    onUpdated(() => {
      const scrollWidth = tabHeaderWrapperRef.value ? tabHeaderWrapperRef.value.scrollWidth : 0;
      const clientWidth = tabHeaderWrapperRef.value ? tabHeaderWrapperRef.value.clientWidth : 0;
      scrollMaxHorizontal.value = scrollWidth - clientWidth;
    })

    const loadPanes = () => {
      const filterSlots = useSlots().default().filter((item) => item.type.name && item.type.name === 'ITabPane');
      const propsSlots = filterSlots.map((item) => item.props);

      panes.value = propsSlots;
    }

    const scrollHandler = (e) => {
      scrollHorizontalPosition.value = e.target.scrollLeft;
    }

    const clickLeft = () => {
      tabHeaderWrapperRef.value.scrollLeft -= 75;
    }

    const clickRight = () => {
      tabHeaderWrapperRef.value.scrollLeft += 75;
    }

    const changeActiveTab = (pane) => {
      if (!pane.disabled) {
        emit('update:modelValue', pane.name);
      }
    }

    onMounted(() => {
      loadPanes();
    })

    return {
      activeTab,
      panes,
      isNavLeftVisible,
      isNavRightVisible,
      clickLeft,
      clickRight,
      changeActiveTab
    }
  }
}
</script>

<style>
@reference "@/assets/global.css";

.i-tabs {
  .i-tabs-header {
    @apply tw:relative tw:border-b tw:border-b-gray-500;

    .i-tabs-header-wrapper {
      -ms-overflow-style: none;
      scrollbar-width: none;

      @apply tw:px-20 tw:flex tw:overflow-x-auto;

      &::-webkit-scrollbar {
        display: none;
      }

      .i-tabs-header-item {
        @apply tw:cursor-pointer tw:w-fit tw:text-center tw:px-8 tw:py-5 tw:whitespace-nowrap;

        &.active {
          @apply tw:border-b-yellow-800 tw:border-b-4 tw:font-semibold;
        }

        &.disabled {
          @apply tw:text-gray-500 tw:cursor-not-allowed tw:bg-transparent;
        }
      }
    }

    .i-tabs-header-nav-left {
      @apply tw:cursor-pointer tw:flex tw:justify-start tw:items-center tw:absolute tw:-left-[1px] tw:top-[20px] tw:w-[30px] tw:h-[30px] tw:bg-yellow-800 tw:pl-2.5 tw:rounded-full;
    }

    .i-tabs-header-nav-right {
      @apply tw:cursor-pointer tw:flex tw:justify-start tw:items-center tw:absolute tw:-right-[1px] tw:top-[20px] tw:w-[30px] tw:h-[30px] tw:bg-yellow-800 tw:pl-3 tw:rounded-full;
    }
  }
}
</style>
