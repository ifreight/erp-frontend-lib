<template>
  <div>
    <!-- Normal popover -->
    <div class="tw:mb-12">
      <div class="tw:font-bold tw:bg-yellow-800 tw:text-xl">Normal popover</div>
      <div class="tw:mt-6 tw:flex tw:justify-center tw:gap-32">
        <i-popover arrow>
          <template #content>
            Lorem ipsum
          </template>

          <div>Bottom and click</div>
        </i-popover>

        <i-popover
          arrow
          hover
          placement="left"
        >
          <template #content>
            Lorem ipsum
          </template>

          <div>Left and hover</div>
        </i-popover>

        <i-popover
          arrow
          hover
          placement="right"
        >
          <template #content>
            Lorem ipsum
          </template>

          <div>Right and hover</div>
        </i-popover>

        <i-popover
          arrow
          placement="top"
        >
          <template #content>
            Lorem ipsum
          </template>

          <div>Top and click</div>
        </i-popover>
      </div>
    </div>

    <!-- Style popover -->
    <div class="tw:mb-12">
      <div class="tw:font-bold tw:bg-yellow-800 tw:text-xl">Style popover</div>
      <div class="tw:mt-6 tw:flex tw:justify-center tw:gap-32">
        <i-popover
          arrow
          hover
        >
          <template #content>
            Lorem ipsum
          </template>

          <div>Dark</div>
        </i-popover>

        <i-popover
          arrow
          hover
          light
        >
          <template #content>
            Lorem ipsum
          </template>

          <div>Light</div>
        </i-popover>
      </div>
    </div>

    <!-- Whitespace popover (with close button and cannot click away) -->
    <div class="tw:mb-12">
      <div class="tw:font-bold tw:bg-yellow-800 tw:text-xl">Whitespace popover (with close button and cannot click away)</div>
      <div class="tw:mt-6 tw:flex tw:justify-center tw:gap-32">
        <i-popover
          arrow
          show-close-button
          disable-click-away
        >
          <template #content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br>
            In scelerisque malesuada bibendum. Mauris egestas malesuada ligula,<br>
            non sollicitudin ex egestas a. Duis auctor est eu nibh laoreet,<br>
            vitae interdum diam vehicula.
          </template>

          <div>Click me!</div>
        </i-popover>
      </div>
    </div>

    <!-- Popover with buttons -->
    <div class="tw:mb-12">
      <div class="tw:font-bold tw:bg-yellow-800 tw:text-xl">Popover with buttons</div>
      <div class="tw:mt-6 tw:flex tw:justify-center">
        <i-popover
          arrow
          disable-click-away
        >
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
  </div>
</template>

<script>
import IButton from '@/components/i-button.vue';
import IPopover from '@/components/i-popover.vue';

export default {
  components: {
    IButton,
    IPopover
  }
}
</script>