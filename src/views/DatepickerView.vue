<template>
  <div class="tw:flex tw:gap-2">
    <div class="tw:w-1/4">
      <h3 class="tw:font-bold tw:mb-1 tw:text-xl">Default</h3>
      <p class="tw:mb-1 tw:border tw:min-h-[26px] tw:px-1">
        {{ formatDate(date, 'DD-MM-YYYY hh:mm:ss') }}
      </p>
      <i-date-picker v-model="date"></i-date-picker>
    </div>
    <div class="tw:w-1/4">
      <h3 class="tw:font-bold tw:mb-1 tw:text-xl">With Disabled</h3>
      <p class="tw:mb-1 tw:border tw:min-h-[26px] tw:px-1">
        {{ formatDate(date2, 'DD-MM-YYYY hh:mm:ss') }}
      </p>
      <i-date-picker v-model="date2" :disabled-date="afterToday"></i-date-picker>
    </div>
    <div class="tw:w-1/4">
      <h3 class="tw:font-bold tw:mb-1 tw:text-xl">With Intial Date</h3>
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
      <h3 class="tw:font-bold tw:mb-1 tw:text-xl">With Pick Limit</h3>
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
      ></i-date-picker>
    </div>
  </div>
  <div class="tw:flex tw:gap-2">
    <div class="tw:w-1/2">
      <h3 class="tw:font-bold tw:mb-1 tw:text-xl">Default</h3>
      <p class="tw:mb-1 tw:border tw:min-h-[26px] tw:px-1">
        {{ formatDate(date5, 'DD-MM-YYYY') }}
      </p>
      <i-button text @click="clearDate5()"> Clear </i-button>
      <i-date-range-picker v-model="date5"></i-date-range-picker>
    </div>
    <div class="tw:w-1/2">
      <h3 class="tw:font-bold tw:mb-1 tw:text-xl">With Initial Date & Disabled Date</h3>
      <p class="tw:mb-1 tw:border tw:min-h-[26px] tw:px-1">
        {{ formatDate(date6, 'DD-MM-YYYY') }}
      </p>
      <i-button text @click="clearDate6()"> Clear </i-button>
      <i-date-range-picker
        v-model="date6"
        :disabled-date="beforeToday"
        :initial-date="initialDate"
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

export default {
  components: { IDatePicker, IDateRangePicker, IButton },
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
    };
  },
};
</script>
