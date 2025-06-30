<template>
  <div>
    <div class="tw:flex tw:flex-col tw:gap-4">
      <i-button @click="rightDrawer = true">
        Open Right Drawer + showClose false + size 500px + footer slot
      </i-button>
      <i-button @click="leftDrawer = true">
        Open Left Drawer + Not close when click wrapper
      </i-button>
      <i-button @click="topDrawer = true">
        Open Top Drawer + not close when press escape button
      </i-button>
      <i-button @click="bottomDrawer = true">
        Open Bottom Drawer + teleport to body = false</i-button
      >
    </div>

    <!-- Right Drawer -->
    <i-drawer
      v-model="rightDrawer"
      title="Riwayat Aktivitas"
      direction="right"
      size="500px"
      :show-close="false"
      @open="handleDrawerOpen('right')"
      @close="handleDrawerClose('right')"
    >
      <div>isi body</div>

      <template #footer>
        <div class="tw:flex tw:gap-3 tw:justify-between">
          <i-button @click="rightDrawer = false"> Close </i-button>
          <i-button @click="clickButtonHandler"> Another </i-button>
        </div>
      </template>
    </i-drawer>

    <!-- Left Drawer -->
    <i-drawer v-model="leftDrawer" direction="left" size="400px" :close-on-click-modal="false">
      <template #header>
        <h3 class="tw:text-2xl tw:font-bold tw:text-gray-700">Using Slot header</h3>
      </template>
      halo 123
    </i-drawer>

    <!-- Top Drawer -->
    <i-drawer
      v-model="topDrawer"
      title="Top Example"
      direction="top"
      size="300px"
      :hideOnPressEscape="false"
    >
      <div class="space-y-4">
        <div
          v-for="notification in notifications"
          :key="notification.id"
          class="tw:flex tw:items-start tw:space-x-3 tw:p-3 tw:bg-gray-50 tw:rounded-lg tw:mb-2"
        >
          <div class="tw:w-2 tw:h-2 tw:bg-blue-500 tw:rounded-full tw:mt-2"></div>
          <div class="tw:flex-1">
            <p class="tw:text-sm tw:font-medium tw:text-gray-900">{{ notification.title }}</p>
            <p class="tw:text-sm tw:text-gray-600">{{ notification.message }}</p>
            <p class="tw:text-xs tw:text-gray-500 tw:mt-1">{{ notification.time }}</p>
          </div>
        </div>
      </div>
    </i-drawer>

    <!-- Bottom Drawer -->
    <i-drawer
      v-model="bottomDrawer"
      title="Bottom Drawer"
      direction="bottom"
      size="250px"
      custom-class="tw:rounded-t-lg"
      :teleport-to-body="false"
    >
      <div class="tw:flex tw:gap-4">
        <i-button> Example </i-button>
        <i-button> Example </i-button>
        <i-button> Example </i-button>
      </div>
    </i-drawer>
  </div>
</template>

<script>
import { ref } from 'vue';
import IButton from '@/components/i-button.vue';
import IDrawer from '@/components/i-drawer.vue';

export default {
  components: {
    IButton,
    IDrawer,
  },
  setup() {
    const rightDrawer = ref(false);
    const leftDrawer = ref(false);
    const topDrawer = ref(false);
    const bottomDrawer = ref(false);

    const notifications = ref([
      {
        id: 1,
        title: 'New message received',
        message: 'You have a new message from Sarah Johnson',
        time: '2 minutes ago',
      },
      {
        id: 2,
        title: 'Task completed',
        message: 'Project setup has been completed successfully',
        time: '1 hour ago',
      },
      {
        id: 3,
        title: 'System update',
        message: 'System will be updated tonight at 2 AM',
        time: '3 hours ago',
      },
    ]);

    const handleDrawerOpen = (direction) => {
      console.log(`${direction} drawer opened`);
    };

    const handleDrawerClose = (direction) => {
      console.log(`${direction} drawer closed`);
    };

    const clickButtonHandler = () => {
      rightDrawer.value = false;
    };

    return {
      rightDrawer,
      leftDrawer,
      topDrawer,
      bottomDrawer,
      notifications,
      handleDrawerOpen,
      handleDrawerClose,
      clickButtonHandler,
    };
  },
};
</script>
