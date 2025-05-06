<template>
  <div>
    <h1 class="tw:font-bold tw:mb-2 tw:text-xl">Progress Bar</h1>
    <p>Progress Bar component can emit `finish` when progress bar reach `100%` width.</p>
  </div>
  <div class="tw:flex tw:flex-col tw:justify-between tw:gap-1">
    <div class="tw:w-1/3">
      <p class="tw:mb-2">Basic Example</p>
      <i-progress-bar :progress="progress1" />
      <i-button size="xs" class="tw:mt-2 tw:w-fit" @click="increment('progress1')">
        Increase Progress
      </i-button>
    </div>
    <div class="tw:w-1/3">
      <p class="tw:mb-2">Custom Color Example</p>
      <i-progress-bar class="tw:h-3.5" color="var(--blue-600)" :progress="progress2" />
      <i-button size="xs" class="tw:mt-2 tw:w-fit" @click="increment('progress2')">
        Increase Progress
      </i-button>
    </div>
    <div class="tw:w-1/3">
      <p class="tw:mb-2">Self Timeout Example</p>
      <i-progress-bar class="tw:h-3.5" color="var(--red-600)" :timeout-value="100" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import IProgressBar from '@/components/i-progress-bar.vue';
import IButton from '@/components/i-button.vue';

export default {
  components: { IProgressBar, IButton },
  setup() {
    const progress1 = ref(30);
    const progress2 = ref(40);

    const increment = (key) => {
      switch (key) {
        case 'progress1':
          progress1.value += 10;
          break;

        case 'progress2':
          progress2.value += 10;
          break;
        default:
          break;
      }
    };
    return { progress1, progress2, increment };
  },
};
</script>
