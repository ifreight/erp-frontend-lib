<template>
  <div class="i-datepicker">
    <date-picker-header
      :active-date="activeDate"
      :check-date-disabled="checkDateDisabled"
      @changeSingleMonth="changeMonthHandler"
      @changeMonthYear="changeMonthHandler"
    />
    <date-picker-body
      :active-date="activeDate"
      :selected-date="selectedDate"
      :pick-limit="pickLimit"
      :check-date-disabled="checkDateDisabled"
      @clickDate="clickDate"
    />
  </div>
</template>

<script>
import { computed, ref, watch, onMounted, nextTick } from 'vue';
import dayjs from 'dayjs';

import DatePickerHeader from '@/components/datepicker/date-picker-header.vue';
import DatePickerBody from '@/components/datepicker/date-picker-body.vue';

export default {
  name: 'IDatePicker',
  components: {
    DatePickerHeader,
    DatePickerBody,
  },
  props: {
    modelValue: {
      type: [Date, Array],
      default: () => null,
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
    isNullWhenEmpty: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['selectDate', 'update:modelValue', 'filled'],
  setup(props, { emit }) {
    let activeDate = ref(undefined);
    let selectedDate = ref([]);
    let isLoaded = ref(false);

    const emptyVal = computed(() => (props.isNullWhenEmpty ? null : undefined));

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
          const filteredVal = val.filter((item) => !!item);
          if (filteredVal.length === 0) {
            emit('update:modelValue', props.pickLimit > 1 ? [] : emptyVal.value);
            return;
          }

          if (props.pickLimit <= 1) {
            const [first] = filteredVal;
            emit('update:modelValue', dayjs(first.toString()).toDate());
          } else {
            const extractedDate = filteredVal.map((d) => dayjs(d).toDate());
            emit('update:modelValue', extractedDate);
          }
          if (typeof props.pickLimit === 'number' && val.length === props.pickLimit) {
            emit('filled', val);
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

    const clickDate = (date, param) => {
      const findMatchIndex = selectedDate.value.findIndex((d) =>
        dayjs(date).isSame(dayjs(d), 'day'),
      );

      if (findMatchIndex === -1) {
        if (props.pickLimit === 'any' || selectedDate.value.length < props.pickLimit) {
          selectedDate.value.push(dayjs(date).second(0).toDate());
        } else {
          selectedDate.value.shift();
          selectedDate.value.push(dayjs(date).second(0).toDate());
        }
        emit('selectDate', date.toDate());
      } else {
        selectedDate.value.splice(findMatchIndex, 1);
      }

      if (param === 'prev') {
        activeDate.value = dayjs(activeDate.value.toString()).subtract(1, 'month').toDate();
      } else if (param === 'next') {
        activeDate.value = dayjs(activeDate.value.toString()).add(1, 'month').toDate();
      }
    };

    const changeMonthHandler = (date) => {
      activeDate.value = date;
    };

    onMounted(() => {
      nextTick().then(() => {
        const isArr = Array.isArray(props.modelValue);
        activeDate.value = dayjs(props.initialDate).toDate();

        if (isArr && props.modelValue.length > 0) {
          const [first] = props.modelValue;
          activeDate.value = dayjs(first ? first.toString() : undefined).toDate();
          selectedDate.value = props.modelValue.map((date) =>
            date ? dayjs(date.toString()).toDate() : undefined,
          );
        }
        if (!isArr && props.modelValue) {
          activeDate.value = dayjs(props.modelValue ? props.modelValue.toString() : null).toDate();
          selectedDate.value.push(activeDate.value);
        }

        // have to set this.isLoaded to true with extra nexttick to make the watcher work as expected
        nextTick().then(() => {
          isLoaded.value = true;
        });
      });
    });
    return {
      activeDate,
      selectedDate,
      isLoaded,
      checkSame,
      checkDateDisabled,
      clickDate,
      changeMonthHandler,
    };
  },
};
</script>

<style>
.i-datepicker {
  padding: 4px;
}
</style>
