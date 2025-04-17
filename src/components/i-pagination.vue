<template>
  <div
    class="i-pagination"
    :class="{
      'no-count-page': !showCountPage
    }"
  >
    <div
      class="i-pagination-data-count"
      :class="{
        hidden: !showCountPage
      }"
    >
      {{ paginationCountText }} {{ showCountPageText }} {{ totalPage }}
    </div>

    <div class="i-pagination-container">
      <button
        class="button-left"
        :class="{
          disabled: activePage === 1
        }"
        v-on:click="clickLeftHandler"
      >
        <ic-chevron-left />
      </button>

      <button
        class="button-number"
        :class="{
          active: activePage === 1
        }"
        v-on:click="changePageHandler(1)"
      >
        1
      </button>

      <div v-if="isShowFirstInterval">
        <ic-more-horizontal class="tw:text-brown-600 tw:w-8 tw:h-8" />
      </div>

      <button
        v-for="page in middlePage"
        :key="`button-${page}`"
        class="button-number"
        :class="{
          active: activePage === page
        }"
        v-on:click="changePageHandler(page)"
      >
        {{ page }}
      </button>

      <div v-if="!isHideLastInterval">
        <ic-more-horizontal class="tw:text-brown-600 tw:w-8 tw:h-8" />
      </div>

      <button
        v-if="lastNumber"
        class="button-number"
        :class="{
          active: activePage === lastNumber
        }"
        v-on:click="changePageHandler(lastNumber)"
      >
        {{ lastNumber }}
      </button>

      <button
        class="button-right"
        :class="{
          disabled: totalPage === 1 || activePage === lastNumber
        }"
        v-on:click="clickRightHandler"
      >
        <ic-chevron-right />
      </button>
    </div>
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue';

import IcChevronLeft from "@/icons/ic-chevron-left.vue";
import IcChevronRight from "@/icons/ic-chevron-right.vue";
import IcMoreHorizontal from "@/icons/ic-more-horizontal.vue";

export default {
  name: 'IPagination',
  components: {
    IcChevronLeft,
    IcChevronRight,
    IcMoreHorizontal
  },
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    totalPage: {
      type: Number,
      required: true
    },
    pagerCount: {
      type: Number,
      default: 5,
    },
    showCountPage: {
      type: Boolean,
      default: false
    },
    showCountPageText: {
      type: String,
      default: 'of'
    }
  },
  emits: ['update:currentPage'],
  setup(props, { emit }) {
    const activePage = ref(1)

    const totalButton = computed(() => Math.ceil(props.totalPage / props.pageSize))

    const upperLimit = computed(() => Math.floor(props.pagerCount / 2))

    const lastNumber = computed(() => totalButton.value > 1 ? totalButton.value : null)

    const isShowFirstInterval = computed(() => {
      if (totalButton.value <= props.pagerCount) {
        return false;
      }
      return activePage.value - (props.pagerCount - upperLimit.value) >= 1;
    })

    const isHideLastInterval = computed(() => {
      if (totalButton.value <= props.pagerCount) {
        return true;
      }
      return activePage.value + upperLimit.value >= totalButton.value;
    })

    const startLoopNumber = computed(() => {
      const start = ref(2); // dynamic variable
      const middleNumber = props.pagerCount - start.value; // the number of pages that appear in the middle section
      if (totalButton.value > middleNumber && totalButton.value > props.pagerCount) {
        if (isShowFirstInterval.value) {
          start.value = activePage.value - (upperLimit.value - 1);
        }
        if (isHideLastInterval.value) {
          start.value = activePage.value - (middleNumber - (totalButton.value - activePage.value));
        }
      }
      return start.value;
    })

    const limitLoop = computed(() => props.pagerCount > totalButton.value ? totalButton.value - 2 : props.pagerCount - 2)

    const middlePage = computed(() => {
      const midPage = ref([])
      const startPage = startLoopNumber


      for (let i = 0; i < limitLoop.value; i += 1) {
        midPage.value.push(startPage.value + i)
      }


      return midPage.value
    })

    const paginationCountText = computed(() => {
      const startDataCount = (activePage.value - 1) * props.pageSize + 1
      const endDataCount = ref(0)

      if (activePage.value >= lastNumber.value) {
        endDataCount.value = props.totalPage
      } else {
        endDataCount.value = activePage.value * props.pageSize
      }

      return `${startDataCount}-${endDataCount.value}`
    })

    watch(() => props.currentPage, (value) => {
      if (value !== activePage.value)
        activePage.value = value
    }, { immediate: true })

    watch(() => activePage.value, (value) => {
      emit('update:currentPage', value)
    })

    const clickLeftHandler = () => {
      changePageHandler(activePage.value - 1)
    }

    const clickRightHandler = () => {
      changePageHandler(activePage.value + 1)
    }

    const changePageHandler = (page) => {
      activePage.value = page
    }

    return {
      activePage,
      lastNumber,
      middlePage,
      isShowFirstInterval,
      isHideLastInterval,
      paginationCountText,
      clickLeftHandler,
      clickRightHandler,
      changePageHandler
    }
  }
}
</script>

<style>
@reference "@/assets/global.css";

.i-pagination {
  @apply tw:flex tw:justify-between;

  &.no-count-page {
    @apply tw:justify-end;
  }

  .i-pagination-data-count {
    @apply tw:text-gray-700;

    &.hidden {
      @apply tw:hidden;
    }
  }

  .i-pagination-container {
    @apply tw:flex tw:gap-2;

    .button-left {
      @apply tw:w-8 tw:h-8 tw:border tw:border-gray-500 tw:rounded-md tw:py-1.5 tw:pl-2.5 tw:cursor-pointer;

      &:hover {
        @apply tw:text-red-700;
      }

      &.disabled {
        @apply tw:text-gray-400 tw:pointer-events-none tw:border-gray-300;
      }
    }

    .button-right {
      @apply tw:w-8 tw:h-8 tw:border tw:border-gray-500 tw:rounded-md tw:py-1.5 tw:pl-3 tw:cursor-pointer;

      &:hover {
        @apply tw:text-red-700;
      }

      &.disabled {
        @apply tw:text-gray-400 tw:pointer-events-none tw:border-gray-300;
      }
    }

    .button-number {
      @apply tw:w-8 tw:h-8 tw:border tw:border-gray-500 tw:rounded-md tw:cursor-pointer;

      &.active {
        @apply tw:bg-yellow-800 tw:border-yellow-800;
      }

      &:hover {
        @apply tw:text-red-700;
      }
    }
  }
}
</style>