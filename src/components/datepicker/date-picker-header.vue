<template>
  <div class="i-datepicker--header">
    <template v-if="!hideLeftArrow">
      <button
        class="i-datepicker--header--nav-btn"
        :class="{ disabled: disabledPreviousMonth }"
        :disabled="disabledPreviousMonth"
        @click="clickPreviousMultipleMonth"
      >
        <ic-chevrons-left />
      </button>
      <button
        class="i-datepicker--header--nav-btn"
        :class="{ disabled: disabledPreviousMonth }"
        :disabled="disabledPreviousMonth"
        @click="clickPreviousMonth"
      >
        <ic-chevron-left />
      </button>
    </template>
    <div>
      {{ activeMonthYear }}
    </div>
    <template v-if="!hideRightArrow">
      <button
        class="i-datepicker--header--nav-btn"
        :class="{ disabled: disabledNextMonth }"
        :disabled="disabledNextMonth"
        @click="clickNextMonth"
      >
        <ic-chevron-right />
      </button>
      <button
        class="i-datepicker--header--nav-btn"
        :class="{ disabled: disabledNextMonth }"
        :disabled="disabledNextMonth"
        @click="clickNextMultipleMonth"
      >
        <ic-chevrons-right />
      </button>
    </template>
  </div>
</template>

<script>
import { computed } from 'vue';
import dayjs from 'dayjs';

import IcChevronLeft from '@/icons/ic-chevron-left.vue';
import IcChevronRight from '@/icons/ic-chevron-right.vue';
import IcChevronsLeft from '@/icons/ic-chevrons-left.vue';
import IcChevronsRight from '@/icons/ic-chevrons-right.vue';

export default {
  components: {
    IcChevronLeft,
    IcChevronRight,
    IcChevronsLeft,
    IcChevronsRight,
  },
  props: {
    activeDate: {
      type: Date,
      default: undefined,
    },
    checkDateDisabled: {
      type: Function,
      required: true,
    },
    hideLeftArrow: Boolean,
    hideRightArrow: Boolean,
  },
  emits: ['changeSingleMonth', 'changeMonthYear'],
  setup(props, { emit }) {
    const activeDateString = computed(() => {
      return props.activeDate ? props.activeDate.toString() : undefined;
    });

    const activeMonthYear = computed(() => {
      if (props.activeDate) {
        return dayjs(props.activeDate.toString()).format('MMMM YYYY');
      }
      return null;
    });

    const currentPicker = computed(() => {
      return Array.from(Array(dayjs(activeDateString.value).daysInMonth()), (v, i) => {
        const date = dayjs(activeDateString.value).date(++i);
        const isDisabled = props.checkDateDisabled(dayjs(date).toDate());
        return { date, isDisabled };
      });
    });

    const disabledPreviousMonth = computed(() => {
      const [firstDayCurrent] = currentPicker.value;

      const firstDaySubOne = dayjs(firstDayCurrent.date).subtract(1, 'day');
      return props.checkDateDisabled(new Date(firstDaySubOne.format()));
    });

    const disabledNextMonth = computed(() => {
      const lastDayCurrent = currentPicker.value.slice(-1).pop();
      const lastDayDate = lastDayCurrent ? lastDayCurrent.date : undefined;

      const lastDayAddOne = dayjs(lastDayDate).add(1, 'day');
      return props.checkDateDisabled(new Date(lastDayAddOne.format()));
    });

    const clickPreviousMonth = () => {
      emit('changeSingleMonth', dayjs(props.activeDate.toString()).subtract(1, 'month').toDate());
    };

    const clickNextMonth = () => {
      emit('changeSingleMonth', dayjs(props.activeDate.toString()).add(1, 'month').toDate());
    };

    const checkPrevMonth = (i) => {
      const latestDateOfMonth = dayjs(props.activeDate.toString())
        .subtract(i, 'month')
        .endOf('month')
        .toDate();
      return props.checkDateDisabled(latestDateOfMonth);
    };

    const checkNextMonth = (i) => {
      const firstDateOfMonth = dayjs(props.activeDate.toString())
        .add(i, 'month')
        .startOf('month')
        .toDate();
      return props.checkDateDisabled(firstDateOfMonth);
    };

    const clickPreviousMultipleMonth = async () => {
      let maxMove = 12;
      for (maxMove; maxMove > 0; maxMove -= 1) {
        const res = await checkPrevMonth(maxMove);
        if (!res) {
          break;
        }
      }
      emit(
        'changeMonthYear',
        dayjs(props.activeDate.toString()).subtract(maxMove, 'month').toDate(),
      );
    };

    const clickNextMultipleMonth = async () => {
      let maxMove = 12;
      for (maxMove; maxMove > 0; maxMove -= 1) {
        const res = await checkNextMonth(maxMove);
        if (!res) {
          break;
        }
      }
      emit('changeMonthYear', dayjs(props.activeDate.toString()).add(maxMove, 'month').toDate());
    };

    return {
      activeDateString,
      activeMonthYear,
      currentPicker,
      disabledPreviousMonth,
      disabledNextMonth,
      clickPreviousMonth,
      clickNextMonth,
      checkPrevMonth,
      checkNextMonth,
      clickPreviousMultipleMonth,
      clickNextMultipleMonth,
    };
  },
  // computed: {
  //   activeDateString() {
  //     return this.activeDate ? this.activeDate.toString() : undefined;
  //   },
  //   activeMonthYear() {
  //     if (this.activeDate) {
  //       return dayjs(this.activeDate.toString()).format('MMMM YYYY');
  //     }
  //     return null;
  //   },
  //   currentPicker() {
  //     return Array.from(Array(dayjs(this.activeDateString).daysInMonth()), (v, i) => {
  //       const date = dayjs(this.activeDateString).date(++i);
  //       const isDisabled = this.checkDateDisabled(dayjs(date).toDate());
  //       return { date, isDisabled };
  //     });
  //   },
  //   disabledPreviousMonth() {
  //     const [firstDayCurrent] = this.currentPicker;

  //     const firstDaySubOne = dayjs(firstDayCurrent.date).subtract(1, 'day');
  //     return this.checkDateDisabled(new Date(firstDaySubOne.format()));
  //   },
  //   disabledNextMonth() {
  //     const lastDayCurrent = this.currentPicker.slice(-1).pop();
  //     const lastDayDate = lastDayCurrent ? lastDayCurrent.date : undefined;

  //     const lastDayAddOne = dayjs(lastDayDate).add(1, 'day');
  //     return this.checkDateDisabled(new Date(lastDayAddOne.format()));
  //   },
  // },
  // methods: {
  //   clickPreviousMonth() {
  //     this.$emit(
  //       'changeSingleMonth',
  //       dayjs(this.activeDate.toString()).subtract(1, 'month').toDate(),
  //     );
  //   },
  //   clickNextMonth() {
  //     this.$emit('changeSingleMonth', dayjs(this.activeDate.toString()).add(1, 'month').toDate());
  //   },
  //   checkPrevMonth(i) {
  //     const latestDateOfMonth = dayjs(this.activeDate.toString())
  //       .subtract(i, 'month')
  //       .endOf('month')
  //       .toDate();
  //     return this.checkDateDisabled(latestDateOfMonth);
  //   },
  //   checkNextMonth(i) {
  //     const firstDateOfMonth = dayjs(this.activeDate.toString())
  //       .add(i, 'month')
  //       .startOf('month')
  //       .toDate();
  //     return this.checkDateDisabled(firstDateOfMonth);
  //   },
  //   async clickPreviousMultipleMonth() {
  //     let maxMove = 12;
  //     for (maxMove; maxMove > 0; maxMove -= 1) {
  //       const res = await this.checkPrevMonth(maxMove);
  //       if (!res) {
  //         break;
  //       }
  //     }
  //     this.$emit(
  //       'changeMonthYear',
  //       dayjs(this.activeDate.toString()).subtract(maxMove, 'month').toDate(),
  //     );
  //   },
  //   async clickNextMultipleMonth() {
  //     let maxMove = 12;
  //     for (maxMove; maxMove > 0; maxMove -= 1) {
  //       const res = await this.checkNextMonth(maxMove);
  //       if (!res) {
  //         break;
  //       }
  //     }
  //     this.$emit(
  //       'changeMonthYear',
  //       dayjs(this.activeDate.toString()).add(maxMove, 'month').toDate(),
  //     );
  //   },
  // },
};
</script>

<style>
.i-datepicker--header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;

  > * {
    margin: 0 6px;
  }

  .i-datepicker--header--nav-btn {
    color: var(--gray-900);
    cursor: pointer;
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--gray-500);
    border-radius: 6px;

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }

    &.disabled {
      color: var(--gray-600);
      cursor: not-allowed;
    }
  }
}
</style>
