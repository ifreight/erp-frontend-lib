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
    @apply relative border-b border-b-gray-500;

    .i-tabs-header-wrapper {
      -ms-overflow-style: none;
      scrollbar-width: none;

      @apply px-20 flex overflow-x-auto;

      &::-webkit-scrollbar {
        display: none;
      }

      .i-tabs-header-item {
        @apply cursor-pointer w-fit text-center px-8 py-5 whitespace-nowrap;

        &.active {
          @apply border-b-yellow-800 border-b-4 font-semibold;
        }

        &.disabled {
          @apply text-gray-500 cursor-not-allowed;
        }
      }
    }

    .i-tabs-header-nav-left {
      @apply cursor-pointer flex justify-start items-center absolute -left-[1px] top-[20px] w-[30px] h-[30px] bg-yellow-800 pl-2.5 rounded-full;
    }

    .i-tabs-header-nav-right {
      @apply cursor-pointer flex justify-start items-center absolute -right-[1px] top-[20px] w-[30px] h-[30px] bg-yellow-800 pl-3 rounded-full;
    }
  }
}
</style>
