<template>
  <div>
    <i-tabs v-model="activeTab">
      <!-- v-show="activeTab === 'tabOne'" -->
      <i-tab-pane
        label="Tab One"
        name="tabOne"
      >
        Tab One
      </i-tab-pane>
      <!-- v-show="activeTab === 'tabTwo'" -->
      <i-tab-pane
        label="Tab Two"
        name="tabTwo"
      >
        Tab Two
      </i-tab-pane>
    </i-tabs>
  </div>
</template>

<script>
import { ref } from 'vue';
import ITabs from '@/components/i-tabs.vue';
import ITabPane from '@/components/i-tab-pane.vue';

export default {
  components: {
    ITabs,
    ITabPane
  },
  setup() {
    const activeTab = ref('tabOne');

    return {
      activeTab
    }
  }
}
</script>