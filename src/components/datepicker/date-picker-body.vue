<template>
  <div class="i-datepicker--body">
    <div class="i-datepicker--list-day-wrapper">
      <div v-for="(day, key) in listDays" :key="day" :class="['list-day', key !== 0 || 'sunday']">
        {{ day }}
      </div>
    </div>
    <div ref="refCurrentPick" class="i-datepicker--date-list">
      <div
        v-for="date in previousPicker"
        :key="`${date.date.date()}${date.date.month()}${date.date.year()}-previous`"
        class="each-date"
      >
        <button
          class="i-datepicker-pick previous-date"
          :class="{
            selected: isSelectedDate(date.date),
            multiple: pickLimit > 1 || pickLimit === 'any',
            disabled: date.isDisabled,
          }"
          :disabled="date.isDisabled"
          @click="clickDate(date.date, 'prev')"
          @mouseover="hoverDate(date.date)"
          @mouseleave="leaveDate"
        >
          <span>{{ date.date.date() }}</span>
          <div
            v-if="isSelectedDate(date.date) && (pickLimit > 1 || pickLimit === 'any')"
            class="multiple-check-pick-marker"
          >
            <ic-check-circle />
          </div>
        </button>
      </div>
      <div
        v-for="date in currentPicker"
        :key="`${date.date.date()}${date.date.month()}${date.date.year()}-current`"
        class="each-date"
      >
        <button
          class="i-datepicker-pick current"
          :class="[
            dateRangeSelectedMarker(date.date),
            {
              selected: isSelectedDate(date.date),
              hovered: isHovered(date.date),
              'is-between': isBetweenDateRange(date.date),
              multiple: pickLimit > 1 || pickLimit === 'any',
              disabled: date.isDisabled,
            },
          ]"
          :disabled="date.isDisabled"
          @click="clickDate(date.date)"
          @mouseover="hoverDate(date.date)"
          @mouseleave="leaveDate"
        >
          <span>{{ date.date.date() }}</span>
          <div
            v-if="isSelectedDate(date.date) && (pickLimit > 1 || pickLimit === 'any')"
            class="multiple-check-pick-marker"
          >
            <ic-check-circle />
          </div>
        </button>
      </div>
      <div
        v-for="date in nextPicker"
        :key="`${date.date.date()}${date.date.month()}${date.date.year()}-next`"
        class="each-date"
      >
        <button
          class="i-datepicker-pick next-date"
          :class="{
            selected: isSelectedDate(date.date),
            multiple: pickLimit > 1 || pickLimit === 'any',
            disabled: date.isDisabled,
          }"
          :disabled="date.isDisabled"
          @click="clickDate(date.date, 'next')"
          @mouseover="hoverDate(date.date)"
          @mouseleave="leaveDate"
        >
          <span>{{ date.date.date() }}</span>
          <div
            v-if="isSelectedDate(date.date) && (pickLimit > 1 || pickLimit === 'any')"
            class="multiple-check-pick-marker"
          >
            <ic-check-circle />
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import isBetween from 'dayjs/plugin/isBetween';

import IcCheckCircle from '@/icons/ic-check-circle.vue';

dayjs.extend(isBetween);

export default {
  components: {
    IcCheckCircle,
  },
  props: {
    activeDate: {
      type: Date,
      default: undefined,
    },
    hoverTemporaryDate: {
      type: [Date, Object],
      default: undefined,
    },
    selectedDate: {
      type: Array,
      default: () => [],
    },
    pickLimit: {
      type: [Number, String],
      default: 1,
    },
    checkDateDisabled: {
      type: Function,
      required: true,
    },
    isDateRange: {
      type: Boolean,
      default: false,
    },
    dateLocale: {
      type: String,
      default: 'id',
    },
  },
  emits: ['clickDate', 'update:hoverTemporaryDate'],
  setup(props, { emit }) {
    dayjs.locale(props.dateLocale);

    const listDays = computed(() =>
      Array.from(Array(7), (v, i) =>
        dayjs()
          .day(i + 0)
          .format('ddd'),
      ),
    );

    const activeDateString = computed(() =>
      props.activeDate ? props.activeDate.toString() : undefined,
    );

    const previousPicker = computed(() => {
      const display = [];

      const previous = dayjs(activeDateString.value).date(0);
      const current = dayjs(activeDateString.value).date(0);

      for (let i = 0; i <= current.day(); i += 1) {
        display.push({
          date: previous.subtract(i, 'day'),
          isDisabled: props.checkDateDisabled(dayjs(previous.subtract(i, 'day')).toDate()),
        });
      }
      return display.sort((a, b) => a.date.day() - b.date.day());
    });

    const currentPicker = computed(() => {
      return Array.from(Array(dayjs(activeDateString.value).daysInMonth()), (v, i) => {
        const date = dayjs(activeDateString.value).date(++i);
        const isDisabled = props.checkDateDisabled(dayjs(date).toDate());
        return { date, isDisabled };
      });
    });

    const nextPicker = computed(() => {
      const display = [];
      const previous = previousPicker.value.length;
      const current = dayjs(activeDateString.value).daysInMonth();
      for (let i = 1; i <= 42 - (previous + current); i += 1) {
        display.push({
          date: dayjs(activeDateString.value).date(i).add(1, 'month'),
          isDisabled: props.checkDateDisabled(
            dayjs(activeDateString.value).date(i).add(1, 'month'),
          ),
        });
      }
      return display;
    });

    const clickDate = (date, param) => {
      emit('clickDate', date, param);
      emit('update:hoverTemporaryDate', undefined);
    };

    const isSelectedDate = (date) => {
      return props.selectedDate.find((d) => dayjs(date).isSame(dayjs(d), 'day'));
    };

    const isHovered = (date) => {
      if (props.hoverTemporaryDate) {
        return dayjs(date).isSame(dayjs(props.hoverTemporaryDate), 'day');
      }
    };

    const hoverDate = (date) => {
      if (props.isDateRange && props.selectedDate.length === 1) {
        emit('update:hoverTemporaryDate', date);
      }
    };

    const isBetweenDateRange = (date) => {
      if (props.isDateRange) {
        if (props.selectedDate.length === 2) {
          const [first, second] = props.selectedDate;
          return dayjs(date).isBetween(dayjs(first), dayjs(second), 'day');
        }
        if (props.selectedDate.length === 1 && props.hoverTemporaryDate) {
          const [first] = props.selectedDate;
          return dayjs(date).isBetween(dayjs(first), dayjs(props.hoverTemporaryDate), 'day');
        }
      }
    };

    const leaveDate = () => {
      emit('update:hoverTemporaryDate', undefined);
    };

    const dateRangeSelectedMarker = (date) => {
      if (props.isDateRange && props.selectedDate.length > 0) {
        const [first, second] = props.selectedDate;
        if (dayjs(first).isSame(second, 'day')) {
          return;
        }
        if (dayjs(first).isSame(date, 'day')) {
          if (props.hoverTemporaryDate || !!second) {
            return dayjs(date).isBefore(props.hoverTemporaryDate || second, 'day')
              ? 'is-less'
              : 'is-more';
          }
        }
        if (second) {
          if (dayjs(second).isSame(date, 'day')) {
            return dayjs(date).isBefore(first, 'day') ? 'is-less' : 'is-more';
          }
        }
      }
    };

    return {
      listDays,
      activeDateString,
      previousPicker,
      currentPicker,
      nextPicker,
      clickDate,
      isSelectedDate,
      isHovered,
      hoverDate,
      isBetweenDateRange,
      leaveDate,
      dateRangeSelectedMarker,
    };
  },
};
</script>

<style>
.i-datepicker--body {
  position: relative;

  button {
    cursor: pointer;
    background: none;
  }

  .each-date {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 14.2857%;
    height: 32px;
    margin: 4px 0;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;

    &.disabled {
      cursor: not-allowed;
    }
  }
}

.i-datepicker--list-day-wrapper {
  display: flex;
  flex-wrap: nowrap !important;
  padding: 8px 0;
  border-bottom: 1px solid var(--gray-500);

  .list-day {
    display: flex;
    justify-content: center;
    width: 14.2857%;
    margin: 4px 0;
    font-size: 10px;
    font-weight: 700;
    line-height: 1.625;
    color: var(--gray-600);
    text-transform: uppercase !important;

    &.sunday {
      color: var(--red-600);
    }
  }
}

.i-datepicker--date-list {
  position: relative;
  display: flex;
  flex-wrap: wrap !important;
}

.i-datepicker-pick {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 32px;

  &.current {
    color: var(--gray-900);
  }

  &:not(.disabled) {
    &.next-date,
    &.previous-date {
      font-weight: 500;
      color: var(--gray-700);
    }
  }

  &.selected:not(.next-date, .previous-date) {
    font-weight: 600;
    background-color: var(--yellow-800);
    border-radius: 4px;

    &.is-less {
      border-radius: 4px 0 0 4px;
    }

    &.is-more {
      border-radius: 0 4px 4px 0;
    }
  }

  &.hovered:not(.disabled) {
    font-weight: 600;
    background-color: var(--blue-100);
    border-radius: 0;
  }

  &.is-between {
    background-color: var(--yellow-100);
  }

  &.disabled {
    color: var(--gray-600);
    cursor: not-allowed;
    opacity: 0.75;
  }
}

.multiple-check-pick-marker {
  position: absolute;
  right: -4px;
  bottom: -4px;
  color: var(--gray-900);
}
</style>
