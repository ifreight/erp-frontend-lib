<template>
  <div>
    <!-- Normal alert -->
    <div class="tw:mb-12">
      <div class="tw:font-bold tw:bg-yellow-800 tw:text-xl">Normal alert (autoClose false)</div>
      <div class="tw:mt-6">
        <i-button class="tw:w-fit" @click="showAlertOneHandler"> Show all alert </i-button>
      </div>
    </div>

    <!-- Alert without close button (with duration close, and MUST) -->
    <div class="tw:mb-12">
      <div class="tw:font-bold tw:bg-yellow-800 tw:text-xl">
        Alert without close button (with custom duration close)
      </div>
      <div class="tw:mt-6">
        <i-button class="tw:w-fit" @click="showAlertTwoHandler"> Without close button </i-button>
      </div>
    </div>

    <!-- Alert without icon -->
    <div class="tw:mb-12">
      <div class="tw:font-bold tw:bg-yellow-800 tw:text-xl">
        Alert without icon (default autoclose 4s)
      </div>
      <div class="tw:mt-6">
        <i-button class="tw:w-fit" @click="showAlertThreeHandler"> Show all alert </i-button>
      </div>
    </div>
    <div class="tw:mb-12">
      <div class="tw:font-bold tw:bg-yellow-800 tw:text-xl">Alert after router push</div>
      <div class="tw:mt-6 tw:flex tw:gap-5">
        <i-button class="tw:w-fit" @click="showAlertAfterPush">
          alert not dissapear after router push
        </i-button>
        <i-button class="tw:w-fit" @click="showAlertAfterPush2"> using other setting </i-button>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

import IAlert from '@/components/alert/index';

import IButton from '@/components/i-button.vue';

export default {
  components: {
    IButton,
  },
  setup() {
    const router = useRouter();

    const showAlertOneHandler = async () => {
      IAlert({
        type: 'info',
        message: 'This is info alert',
        autoClose: false,
      });

      IAlert({
        type: 'error',
        message: 'This is error alert',
        autoClose: false,
      });

      IAlert({
        type: 'success',
        message: 'This is success alert',
        autoClose: false,
      });

      IAlert({
        type: 'warning',
        message: 'This is warning alert',
        autoClose: false,
      });

      IAlert({
        message: 'This 400px width alert',
        type: 'info',
        autoClose: false,
      });

      IAlert({
        type: 'info',
        message: 'This 450px width (max) alert so i create the message is so long long long',
        autoClose: false,
      });
      IAlert({
        type: 'info',
        autoHeight: true,
        message:
          'AUTO HEIGHT This 450px width (max) alert so i create the message is so long long long',
        icon: true,
        autoClose: false,
      });
    };

    const showAlertTwoHandler = () => {
      IAlert({
        type: 'info',
        message: 'This alert will be close around 5 seconds',
        closeButton: false,
        autoClose: 5000,
      });

      IAlert({
        type: 'info',
        message: 'This alert will be close around 10 seconds',
        closeButton: false,
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

    const showAlertAfterPush = async () => {
      await router.push({ name: 'home' });

      IAlert({
        type: 'info',
        message: `Halo i'll appear after router push`,
        showIcon: false,
      });
    };

    const showAlertAfterPush2 = () => {
      IAlert(
        {
          type: 'info',
          message: `Halo i'll appear after router push`,
          showIcon: false,
        },
        1000,
      );
      router.push({ name: 'home' });
    };

    return {
      showAlertOneHandler,
      showAlertTwoHandler,
      showAlertThreeHandler,
      showAlertAfterPush,
      showAlertAfterPush2,
    };
  },
};
</script>
