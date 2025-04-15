<template>
  <div class="container-button-view">
    <div class="tw:flex tw:gap-2 tw:mb-5">
      <i-button>
        Default Button
      </i-button>
      <i-button disabled>
        Button Disabled
      </i-button>
      <i-button text>
        Button Text
      </i-button>
      <i-button plain>
        Plain Button
      </i-button>
    </div>
    <div class="tw:flex tw:gap-2 tw:mb-5">
      <i-button :error="true">
        Error Button
      </i-button>
    </div>
    <div class="tw:mb-5">
      By Size
      <div class="tw:flex tw:gap-2">
        <i-button>
          Normal Size
        </i-button>
        <i-button size="lg">
          Large Size
        </i-button>
        <i-button size="sm">
          Small Size
        </i-button>
        <i-button size="xs">
          Extra Small Size
        </i-button>
      </div>
    </div>
    <div>
      With Prepend
      <div class="tw:flex tw:gap-2 tw:text-2xl">
        <i-button>
          <template #prepend><ic-calendar /></template>
          <span class="tw:ml-1">Prepend</span>
        </i-button>
        <i-button>
          <template #append><ic-calendar /></template>
          <span class="tw:mr-1">Append</span>
        </i-button>
        <i-button>
          <template #prepend><ic-calendar /></template>
          <template #append><ic-calendar /></template>
          <span class="tw:mx-1">Pre - Append</span>
        </i-button>
      </div>
    </div>

  </div>
</template>

<script>
import IcCalendar from '@/icons/ic-calendar.vue';
import IButton from '@/components/i-button.vue';

export default {
  components: {
    IButton,
    IcCalendar,
  },
}
</script>

<style scss>
@reference "@/assets/global.css";

.container-button-view {
  @apply tw:h-full;
}
</style>
