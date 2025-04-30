<template>
  <div>
    <!-- Normal popover -->
    <div class="tw:mb-12">
      <div class="tw:font-bold tw:bg-yellow-800 tw:text-xl">Normal popover</div>
      <div class="tw:mt-6 tw:flex tw:justify-center tw:gap-32">
        <i-popover show-arrow>
          <template #content>
            Lorem ipsum
          </template>

          <i-button>Bottom and click</i-button>
        </i-popover>

        <i-popover
          show-arrow
          hover
          placement="left"
        >
          <template #content>
            Lorem ipsum
          </template>

          <i-button>Left and hover</i-button>
        </i-popover>

        <i-popover
          show-arrow
          hover
          placement="right"
        >
          <template #content>
            Lorem ipsum
          </template>

          <i-button>Right and hover</i-button>
        </i-popover>

        <i-popover
          show-arrow
          placement="top"
        >
          <template #content>
            Lorem ipsum
          </template>

          <i-button>Top and click</i-button>
        </i-popover>
      </div>
    </div>

    <!-- Style popover -->
    <div class="tw:mb-12">
      <div class="tw:font-bold tw:bg-yellow-800 tw:text-xl">Style popover</div>
      <div class="tw:mt-6 tw:flex tw:justify-center tw:gap-32">
        <i-popover
          show-arrow
          hover
        >
          <template #content>
            Lorem ipsum
          </template>

          <div>Dark</div>
        </i-popover>

        <i-popover
          show-arrow
          hover
          light
        >
          <template #content>
            Lorem ipsum
          </template>

          <div>Light</div>
        </i-popover>
      </div>

      <div class="tw:mt-10 tw:flex tw:justify-center">
        <i-popover
          show-arrow
          :custom-class="customClass"
        >
          <template #content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br>
            In scelerisque malesuada bibendum. Mauris egestas malesuada ligula,<br>
            non sollicitudin ex egestas a. Duis auctor est eu nibh laoreet,<br>
            vitae interdum diam vehicula.
          </template>

          <div>With custom class</div>
        </i-popover>
      </div>
    </div>

    <!-- Whitespace popover (with close button) -->
    <div class="tw:mb-12">
      <div class="tw:font-bold tw:bg-yellow-800 tw:text-xl">Whitespace popover (with close button)</div>
      <div class="tw:mt-6 tw:flex tw:justify-center tw:gap-32">
        <i-popover
          show-arrow
          show-close-button
        >
          <template #content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br>
            In scelerisque malesuada bibendum. Mauris egestas malesuada ligula,<br>
            non sollicitudin ex egestas a. Duis auctor est eu nibh laoreet,<br>
            vitae interdum diam vehicula.
          </template>

          <div>Can click away</div>
        </i-popover>

        <i-popover
          show-arrow
          show-close-button
          ignore-click-outside
        >
          <template #content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br>
            In scelerisque malesuada bibendum. Mauris egestas malesuada ligula,<br>
            non sollicitudin ex egestas a. Duis auctor est eu nibh laoreet,<br>
            vitae interdum diam vehicula.
          </template>

          <div>Cannot click away</div>
        </i-popover>
      </div>
    </div>

    <!-- Popover with buttons and without arrow -->
    <div class="tw:mb-12">
      <div class="tw:font-bold tw:bg-yellow-800 tw:text-xl">Popover with buttons and without arrow</div>
      <div class="tw:mt-6 tw:flex tw:justify-center">
        <i-popover>
          <template #content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.

            <div class="tw:flex tw:justify-end tw:gap-5 tw:mt-5">
              <i-button
                text
                class="tw:text-white tw:h-full tw:justify-end tw:w-auto"
              >
                Skip
              </i-button>
              <i-button
                text
                class="tw:h-full tw:justify-end tw:w-auto"
              >
                Next
              </i-button>
            </div>
          </template>

          <div>Lorem ipsum</div>
        </i-popover>
      </div>
    </div>

    <!-- Disabled popover -->
    <div class="tw:mb-12">
      <div class="tw:font-bold tw:bg-yellow-800 tw:text-xl">Disabled popover</div>
      <div class="tw:mt-6 tw:flex tw:justify-center tw:items-center tw:gap-32">
        <i-popover
          hover
          disabled
        >
          <template #content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </template>

          <div>Disabled popover hover</div>
        </i-popover>

        <i-popover disabled>
          <template #content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </template>

          <i-button>Disabled popover click</i-button>
        </i-popover>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';

import IButton from '@/components/i-button.vue';
import IPopover from '@/components/i-popover.vue';

export default {
  components: {
    IButton,
    IPopover
  },
  setup() {
    const customClass = computed(() => 'tw:w-[500px] tw:h-[500px]')

    return {
      customClass
    }
  }
}
</script>