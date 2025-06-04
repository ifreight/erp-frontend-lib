<template>
  <div>
    <!-- Normal alert -->
    <div class="tw:mb-12">
      <div class="tw:font-bold tw:bg-yellow-800 tw:text-xl">Normal alert</div>
      <div class="tw:mt-6">
        <i-button class="tw:w-fit" @click="showAlertOneHandler"> Show all alert </i-button>
      </div>
    </div>

    <!-- Alert without close button (with duration close, and MUST) -->
    <div class="tw:mb-12">
      <div class="tw:font-bold tw:bg-yellow-800 tw:text-xl">
        Alert without close button (with duration close, and MUST)
      </div>
      <div class="tw:mt-6">
        <i-button class="tw:w-fit" @click="showAlertTwoHandler"> Without close button </i-button>
      </div>
    </div>

    <!-- Alert without icon -->
    <div class="tw:mb-12">
      <div class="tw:font-bold tw:bg-yellow-800 tw:text-xl">Alert without icon</div>
      <div class="tw:mt-6">
        <i-button class="tw:w-fit" @click="showAlertThreeHandler"> Show all alert </i-button>
      </div>
    </div>
  </div>
</template>

<script>
import IAlert from '@/components/alert/index';

import IButton from '@/components/i-button.vue';

export default {
  components: {
    IButton,
  },
  setup() {
    const showAlertOneHandler = () => {
      IAlert({
        type: 'info',
        message: 'This is info alert',
      });

      IAlert({
        type: 'error',
        message: 'This is error alert',
      });

      IAlert({
        type: 'success',
        message: 'This is success alert',
      });

      IAlert({
        type: 'warning',
        message: 'This is warning alert',
      });

      IAlert({
        message: 'This 400px width alert',
        type: 'info',
      });

      IAlert({
        type: 'info',
        message: 'This 450px width (max) alert so i create the message is so long long long',
      });
      IAlert({
        type: 'info',
        autoHeight: true,
        message:
          'AUTO HEIGHT This 450px width (max) alert so i create the message is so long long long',
      });
    };

    const showAlertTwoHandler = () => {
      IAlert({
        type: 'info',
        message: 'This alert will be close around 5 seconds',
        showCloseButton: false,
        autoClose: 5000,
      });

      IAlert({
        type: 'info',
        message: 'This alert will be close around 10 seconds',
        showCloseButton: false,
        autoClose: 10000,
      });
    };

    const showAlertThreeHandler = () => {
      IAlert({
        type: 'info',
        message: `This alert doesn't have icon at the left side`,
        showIcon: false,
      });

      IAlert({
        type: 'error',
        message: `This alert doesn't have icon at the left side`,
        showIcon: false,
      });

      IAlert({
        type: 'success',
        message: `This alert doesn't have icon at the left side`,
        showIcon: false,
      });

      IAlert({
        type: 'warning',
        message: `This alert doesn't have icon at the left side`,
        showIcon: false,
      });
    };

    return {
      showAlertOneHandler,
      showAlertTwoHandler,
      showAlertThreeHandler,
    };
  },
};
</script>
