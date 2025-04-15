<template>
  <div>
    <!-- Normal Tab -->
    <div>
      <div class="tw:font-bold tw:bg-yellow-800 tw:text-xl">Normal Tab</div>
      <i-tabs v-model="activeTab1">
        <i-tab-pane
          label="Tab One"
          name="tabOne"
        >
          Tab One Content
        </i-tab-pane>
        <i-tab-pane
          label="Tab Two"
          name="tabTwo"
        >
          Tab Two Content
        </i-tab-pane>
        <i-tab-pane
          label="Tab Three"
          name="tabThree"
        >
          Tab Three Content
        </i-tab-pane>
      </i-tabs>
    </div>

    <!-- Disabled Tab -->
    <div class="tw:mt-24">
      <div class="tw:font-bold tw:bg-yellow-800 tw:text-xl">Disabled Tab</div>
      <i-tabs v-model="activeTab2">
        <i-tab-pane
          label="Tab One"
          name="tabOne"
        >
          Tab One Content
        </i-tab-pane>
        <!-- add disabled props (boolean) to the spesific pane -->
        <i-tab-pane
          label="Tab Two"
          name="tabTwo"
          :disabled="true"
        >
          Tab Two Content
        </i-tab-pane>
        <i-tab-pane
          label="Tab Three"
          name="tabThree"
        >
          Tab Three Content
        </i-tab-pane>
      </i-tabs>
    </div>

    <!-- Overflow Tab -->
    <div class="tw:mt-24">
      <div class="tw:font-bold tw:bg-yellow-800 tw:text-xl">Overflow Tab</div>
      <div class="w-1/2">
        <i-tabs v-model="activeTab3">
          <i-tab-pane
            label="Tab One January"
            name="tabOne"
          >
            Tab One Content
          </i-tab-pane>
          <i-tab-pane
            label="Tab Two February"
            name="tabTwo"
          >
            Tab Two Content
          </i-tab-pane>
          <i-tab-pane
            label="Tab Three March"
            name="tabThree"
          >
            Tab Three Content
          </i-tab-pane>
          <i-tab-pane
            label="Tab Four April"
            name="tabFour"
          >
            Tab Four Content
          </i-tab-pane>
          <i-tab-pane
            label="Tab Five May"
            name="tabFive"
          >
            Tab Five Content
          </i-tab-pane>
        </i-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import ITabs from '@/components/tabs/i-tabs.vue';
import ITabPane from '@/components/tabs/i-tab-pane.vue';

export default {
  components: {
    ITabs,
    ITabPane
  },
  setup() {
    const activeTab1 = ref('tabOne');
    const activeTab2 = ref('tabOne');
    const activeTab3 = ref('tabOne');

    return {
      activeTab1,
      activeTab2,
      activeTab3
    }
  }
}
</script>
