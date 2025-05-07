<template>
  <div>
    <!-- Normal alert -->
    <div class="tw:mb-12">
      <div class="tw:font-bold tw:bg-yellow-800 tw:text-xl">Normal alert</div>
      <div class="tw:mt-6">
        <i-button
          class="tw:w-fit"
          @click="isShowAlertOne = true"
        >
          Show all alert
        </i-button>

        <i-alert
          v-model="isShowAlertOne"
          message="info"
        />
        <i-alert
          v-model="isShowAlertOne"
          alert-type="success"
          message="success"
        />
        <i-alert
          v-model="isShowAlertOne"
          alert-type="warning"
          message="warning"
        />
        <i-alert
          v-model="isShowAlertOne"
          alert-type="error"
          message="error"
        />
        <i-alert
          v-model="isShowAlertOne"
          message="with min width 400px"
        />
        <i-alert
          v-model="isShowAlertOne"
          :auto-close="1000000000000000000"
          message="This is the alert container with max width 450px so the container is too long"
        />
      </div>
    </div>

    <!-- Alert without close button -->
    <div class="tw:mb-12">
      <div class="tw:font-bold tw:bg-yellow-800 tw:text-xl">Alert without close button</div>
      <div class="tw:mt-6">
        <i-button
          class="tw:w-fit"
          @click="isShowAlertTwo = true"
        >
          Without close button
        </i-button>

        <i-alert
          v-model="isShowAlertTwo"
          :show-close-button="false"
          message="This alert doesn't have close button"
        />
      </div>
    </div>

    <!-- Alert with duration close -->
    <div class="tw:mb-12">
      <div class="tw:font-bold tw:bg-yellow-800 tw:text-xl">Alert with duration close</div>
      <div class="tw:mt-6">
        <i-button
          class="tw:w-fit"
          @click="isShowAlertThree = true"
        >
          Show alert
        </i-button>

        <i-alert
          v-model="isShowAlertThree"
          :show-close-button="false"
          :auto-close="10000"
          message="This alert will close around ten seconds"
        />
        <i-alert
          v-model="isShowAlertThree"
          :auto-close="false"
          message="This alert only be able to close on click container or close button"
        />
      </div>
    </div>

    <!-- Alert without icon -->
    <div class="tw:mb-12">
      <div class="tw:font-bold tw:bg-yellow-800 tw:text-xl">Alert without icon</div>
      <div class="tw:mt-6">
        <i-button
          class="tw:w-fit"
          @click="isShowAlertFour = true"
        >
          Show all alert
        </i-button>

        <i-alert
          v-model="isShowAlertFour"
          :show-close-button="false"
          :show-icon-type="false"
          message="This alert doesn't have icon"
        />
        <i-alert
          v-model="isShowAlertFour"
          alert-type="error"
          :show-close-button="false"
          :show-icon-type="false"
          message="This alert doesn't have icon"
        />
        <i-alert
          v-model="isShowAlertFour"
          alert-type="success"
          :show-close-button="false"
          :show-icon-type="false"
          message="This alert doesn't have icon"
        />
        <i-alert
          v-model="isShowAlertFour"
          alert-type="warning"
          :show-close-button="false"
          :show-icon-type="false"
          message="This alert doesn't have icon"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

import IAlert from '@/components/i-alert.vue';
import IButton from '@/components/i-button.vue';

export default {
  components: {
    IAlert,
    IButton
  },
  setup() {
    const isShowAlertOne = ref(false)
    const isShowAlertTwo = ref(false)
    const isShowAlertThree = ref(false)
    const isShowAlertFour = ref(false)

    return {
      isShowAlertOne,
      isShowAlertTwo,
      isShowAlertThree,
      isShowAlertFour
    }
  }
}
</script>