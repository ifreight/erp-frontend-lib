<template>
  <div class="tw:text-center tw:text-red-400">
    single date picker notes: isNullWhenEmpty true (default) && only works when picklimit
    {{ '<=' }} 1 any
  </div>
  <div class="tw:flex tw:gap-2 tw:items-end">
    <div class="tw:w-1/4">
      <h3 class="tw:font-bold tw:mb-1 tw:text-xl">Default</h3>
      <span class="tw:text-red-400 tw:text-3xs">
        v-model: <span v-if="date === null">ini null</span>
        <span v-else>{{ !date ? 'empty bkn null' : `${date}` }}</span>
      </span>
      <i-input v-model="date" name="date" readOnly />
      <i-date-picker v-model="date" @selectDate="selectDateHandler"></i-date-picker>
    </div>
    <div class="tw:w-1/4">
      <h3 class="tw:font-bold tw:mb-1 tw:text-xl">
        With Disabled <span class="tw:text-3xs tw:font-normal">(isNullWhenEmpty false)</span>
      </h3>
      <span class="tw:text-red-400 tw:text-3xs">
        v-model: <span v-if="date2 === null">ini null</span>
        <span v-else>{{ !date2 ? 'empty bkn null' : `${date2}` }}</span>
      </span>
      <p class="tw:mb-1 tw:border tw:min-h-[26px] tw:px-1">
        {{ formatDate(date2, 'DD-MM-YYYY hh:mm:ss') }}
      </p>
      <i-date-picker
        v-model="date2"
        :disabled-date="afterToday"
        :isNullWhenEmpty="false"
        @filled="filledHandler"
      ></i-date-picker>
    </div>
    <div class="tw:w-1/4">
      <h3 class="tw:font-bold tw:mb-1 tw:text-xl">With Intial Date</h3>
      <span class="tw:text-red-400 tw:text-3xs">
        v-model: <span v-if="date3 === null">ini null</span>
        <span v-else>{{ !date3 ? 'empty bkn null' : `${date3}` }}</span>
      </span>
      <p class="tw:mb-1 tw:border tw:min-h-[26px] tw:px-1">
        {{ formatDate(date3, 'DD-MM-YYYY hh:mm:ss') }}
      </p>
      <i-date-picker
        v-model="date3"
        :disabled-date="beforeToday"
        :initial-date="initialDate"
      ></i-date-picker>
    </div>
    <div class="tw:w-1/4">
      <h3 class="tw:font-bold tw:mb-1 tw:text-xl">
        With Pick Limit <span class="tw:text-3xs tw:font-normal">(picklimit 2)</span>
      </h3>
      <span class="tw:text-red-400 tw:text-3xs">
        v-model: <span v-if="date4 === null">ini null</span>
        <span v-else>{{ !date4 ? 'empty bkn null' : `${date4}` }}</span>
      </span>
      <p class="tw:mb-1 tw:border tw:min-h-[26px] tw:px-1">
        {{ formatDate(date4, 'DD-MM-YYYY') }}
      </p>
      <i-date-picker
        v-model="date4"
        :pick-limit="2"
        :disabled-date="
          (date) => {
            return initialDate > date;
          }
        "
        :initial-date="initialDate"
        @selectDate="selectDateHandler"
        @filled="filledHandler"
      ></i-date-picker>
    </div>
  </div>
  <div class="tw:flex tw:gap-2">
    <div class="tw:w-1/2">
      <h3 class="tw:font-bold tw:mb-1 tw:text-xl">Default</h3>
      <span class="tw:text-red-400 tw:text-3xs">
        v-model: <span v-if="date5 === null">ini null</span>
        <span v-else>{{ !date5 ? 'empty bkn null' : `${date5}` }}</span>
      </span>
      <p class="tw:mb-1 tw:border tw:min-h-[26px] tw:px-1">
        {{ formatDate(date5, 'DD-MM-YYYY') }}
      </p>
      <i-button text @click="clearDate5()"> Clear </i-button>
      <i-date-range-picker
        v-model="date5"
        @selectDate="selectDateRangeHandler"
        @filled="filledRangeHandler"
      ></i-date-range-picker>
    </div>
    <div class="tw:w-1/2">
      <h3 class="tw:font-bold tw:mb-1 tw:text-xl">
        With Initial Date & Disabled Date & select handler
      </h3>
      <span class="tw:text-red-400 tw:text-3xs">
        v-model: <span v-if="date6 === null">ini null</span>
        <span v-else>{{ !date6 ? 'empty bkn null' : `${date6}` }}</span>
      </span>
      <p class="tw:mb-1 tw:border tw:min-h-[26px] tw:px-1">
        {{ formatDate(date6, 'DD-MM-YYYY') }}
      </p>
      <i-button text @click="clearDate6()"> Clear </i-button>
      <i-date-range-picker
        v-model="date6"
        :disabled-date="beforeToday"
        :initial-date="initialDate"
        @selectDate="selectDateRangeHandler"
        @filled="filledRangeHandler"
      ></i-date-range-picker>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import dayjs from 'dayjs';
import IDatePicker from '@/components/datepicker/i-date-picker.vue';
import IDateRangePicker from '@/components/datepicker/i-date-range-picker.vue';
import IButton from '@/components/i-button.vue';
import IInput from '@/components/i-input.vue';

export default {
  components: { IDatePicker, IDateRangePicker, IButton, IInput },
  setup() {
    const today = new Date();
    const initialDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    let date = ref(null);
    let date2 = ref(new Date());
    let date3 = ref(undefined);
    let date4 = ref([]);
    let date5 = ref([]);
    let date6 = ref([]);

    const afterToday = (date) => {
      return new Date() < date;
    };

    const beforeToday = (date) => {
      return new Date() > date;
    };

    const formatDate = (date, format) => {
      if (!date) {
        return '';
      }
      const valueArray = Array.isArray(date) ? date : [date];
      if (!valueArray) {
        return '';
      }

      let stringDate = '';
      valueArray.forEach((item, i) => {
        if (i == 0) {
          stringDate = `${dayjs(item).format(format)}`;
          return;
        }
        stringDate = `${stringDate} - ${dayjs(item).format(format)}`;
      });
      return stringDate;
    };

    const clearDate5 = () => {
      date5.value = [];
    };

    const clearDate6 = () => {
      date6.value = [];
    };

    const filledHandler = (val) => {
      console.log('filled is pick limit = v-model.length', val);
    };
    const filledRangeHandler = (val) => {
      console.log('filled range when v-model.length === 2', val);
    };

    const selectDateHandler = (val) => {
      console.log('selected is every date selected', val);
    };
    const selectDateRangeHandler = (val) => {
      console.log('selected date handler is', val);
    };

    return {
      initialDate,
      date,
      date2,
      date3,
      date4,
      date5,
      date6,
      afterToday,
      beforeToday,
      formatDate,
      clearDate5,
      clearDate6,
      filledHandler,
      filledRangeHandler,
      selectDateHandler,
      selectDateRangeHandler,
    };
  },
};
</script>
