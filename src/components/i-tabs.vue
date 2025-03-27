<template>
  <div class="i-tabs">
    <div
      ref="tabHeader"
      class="i-tabs-header"
    >
      <div
        ref="tabHeaderWrapper"
        class="i-tabs-header-wrapper"
      >
        <div
          v-for="(pane, index) in panes"
          :key="`i-tab-${index}`"
          class="i-tabs-header-item"
          :class="{
            active: pane.name === value
          }"
        >
          {{ pane.label }}
        </div>
      </div>
    </div>

    <slot />
  </div>
</template>

<script>
import { ref, provide, watch } from 'vue';

export default {
  name: 'ITabs',
  props: {
    value: {
      type: String,
      default: undefined,
    }
  },
  setup(props) {
    const activeTab = ref('');
    const panes = ref([
      // {
      //   label: 'Tab One',
      //   name: 'tabOne'
      // },
      // {
      //   label: 'Tab Two',
      //   name: 'tabTwo'
      // }
    ]);

    provide('rootTab', this);
    watch(() => props.value, (newValue) => {
      if (newValue !== activeTab.value) {
        activeTab.value = newValue
      }
    })

    return {
      activeTab,
      panes
    }
  }
}
</script>

<style>
.i-tabs {
  @reference "tailwindcss";

  .i-tabs-header {
    @apply relative border-b;

    .i-tabs-header-wrapper {
      @apply px-8 flex;

      .i-tabs-header-item {
        @apply cursor-pointer w-[164px] text-center py-5;

        &.active {
          @apply border-b-amber-300 border-b-4 font-semibold;
        }
      }
    }
  }
}
</style>
