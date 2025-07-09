<template>
  <div class="i-date-range-picker">
    <div>
      <date-picker-header
        :active-date="activeDate"
        :check-date-disabled="checkDateDisabled"
        :hide-right-arrow="true"
        @changeSingleMonth="changeMonthLeftHandler"
        @changeMonthYear="changeMonthLeftHandler"
      />
      <date-picker-body
        :active-date="activeDate"
        :selected-date="selectedDate"
        :check-date-disabled="checkDateDisabled"
        :is-date-range="true"
        v-model:hover-temporary-date="hoverTemporaryDate"
        @clickDate="clickDate"
      />
    </div>
    <div class="tw:border-r tw:border-gray-100 tw:border-solid tw:mx-2"></div>
    <div>
      <date-picker-header
        :active-date="activeDateNext"
        :check-date-disabled="checkDateDisabled"
        :hide-left-arrow="true"
        @changeSingleMonth="changeMonthRightHandler"
        @changeMonthYear="changeMonthRightHandler"
      />
      <date-picker-body
        :active-date="activeDateNext"
        :selected-date="selectedDate"
        :check-date-disabled="checkDateDisabled"
        :is-date-range="true"
        v-model:hover-temporary-date="hoverTemporaryDate"
        @clickDate="clickDate"
      />
    </div>
  </div>
</template>

<script>
import { ref, watch, onMounted, nextTick } from 'vue';
import dayjs from 'dayjs';

import DatePickerHeader from '@/components/datepicker/date-picker-header.vue';
import DatePickerBody from '@/components/datepicker/date-picker-body.vue';

export default {
  name: 'IDateRangePicker',
  components: {
    DatePickerHeader,
    DatePickerBody,
  },
  props: {
    modelValue: {
      type: Array,
      default: () => undefined,
    },
    pickLimit: {
      type: [Number, String],
      default: 1,
    },
    initialDate: {
      type: [Date, String],
      default: undefined,
    },
    disabledDate: {
      type: Function,
      default: null,
    },
  },
  emits: ['update:modelValue', 'selectDate', 'filled'],
  setup(props, { emit }) {
    let activeDate = ref(undefined);
    let activeDateNext = ref(undefined);
    let hoverTemporaryDate = ref(undefined);
    let selectedDate = ref([]);
    let isLoaded = ref(false);

    watch(
      () => props.modelValue,
      (val) => {
        if (isLoaded.value) {
          const valueArray = Array.isArray(val) ? val : [val];

          const isValueSame = checkSame(valueArray, selectedDate.value);
          if (!isValueSame) {
            selectedDate.value = valueArray
              .filter((date) => !!date)
              .map((date) => dayjs(date.toString()).toDate());
          }
        }
      },
    );

    watch(
      selectedDate,
      (val) => {
        if (isLoaded.value) {
          if (val.length === 0) {
            emit('update:modelValue', []);
          } else if (val.length === 2) {
            const extractedDate = val.map((d) => dayjs(d).toDate());
            emit('update:modelValue', extractedDate);
            emit('filled', extractedDate);
          }
        }
      },
      { deep: true },
    );

    const checkSame = (array1, array2) => {
      const sameLength = array1.length === array2.length;
      const sameItems = array1.every((element, index) =>
        dayjs(element).isSame(array2[index], 'day'),
      );
      return sameLength && sameItems;
    };

    const checkDateDisabled = (date) => {
      if (props.disabledDate) {
        return props.disabledDate(date);
      }
      return false;
    };

    const changeMonthLeftHandler = (date) => {
      activeDate.value = date;
      activeDateNext.value = dayjs(date.toString()).add(1, 'month').toDate();
    };

    const changeMonthRightHandler = (date) => {
      activeDateNext.value = date;
      activeDate.value = dayjs(date.toString()).subtract(1, 'month').toDate();
    };

    const clickDate = async (date) => {
      if (selectedDate.value.length === 2) {
        selectedDate.value = [];
        selectedDate.value.push(dayjs(date).second(0).toDate());
      } else {
        if (dayjs(date).isBefore(selectedDate.value[0], 'day')) {
          selectedDate.value.unshift(dayjs(date).second(0).toDate());
        } else {
          selectedDate.value.push(dayjs(date).second(0).toDate());
        }
      }
      emit('selectDate', date.toDate());
    };

    onMounted(() => {
      nextTick().then(() => {
        activeDate.value = dayjs(props.initialDate).toDate();
        activeDateNext.value = dayjs(props.initialDate).add(1, 'month').toDate();

        if (props.modelValue && props.modelValue.length > 0) {
          const [first] = props.modelValue;
          activeDate.value = dayjs(first ? first.toString() : undefined).toDate();
          activeDateNext.value = dayjs(activeDate.value).add(1, 'month').toDate();
          selectedDate.value = props.modelValue.map((date) =>
            date ? dayjs(date.toString()).toDate() : undefined,
          );
        }

        // have to set this.isLoaded to true with extra nexttick to make the watcher work as expected
        nextTick().then(() => {
          isLoaded.value = true;
        });
      });
    });
    return {
      activeDate,
      activeDateNext,
      hoverTemporaryDate,
      selectedDate,
      isLoaded,
      checkDateDisabled,
      changeMonthLeftHandler,
      changeMonthRightHandler,
      clickDate,
    };
  },
};
</script>

<style>
.i-date-range-picker {
  padding: 4px;
  display: flex;
}
</style>
