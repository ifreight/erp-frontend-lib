<template>
  <div>
    <div class="tw:flex tw:gap-2">
      <i-button @click="showDialog = true">
        Normal Dialog
      </i-button>
      <i-button @click="dialogWithoutHeader = true">
        Without Header
      </i-button>
      <i-button @click="dialogWithoutClose = true">
        Without Close Btn
      </i-button>
      <i-button @click="dialogNoOut = true">
        Can't close when click outside
      </i-button>
    </div>
    <i-dialog
      v-model:show="showDialog"
      show-close
      show-header
      append-to-body
      destroy-on-close
      :width="'564px'"
    >
      <template #header>
        Header
      </template>
      <div class="tw:text-sm">Text pertama aw awaw</div>
      <div class="tw:text-sm">Text kedua ulalala</div>
      <div class="dialog-btn-wrapper">
        <i-button @click="showDialog = false">
          Cancel
        </i-button>
        <i-button @click="save">
          Confirm
        </i-button>
      </div>
    </i-dialog>
    <i-dialog
      v-model:show="dialogWithoutHeader"
      show-close
      append-to-body
      destroy-on-close
      :width="'564px'"
    >
      <div class="tw:text-sm">Text pertama aw awaw</div>
      <div class="tw:text-sm">Text kedua ulalala</div>
    </i-dialog>
    <i-dialog
      v-model:show="dialogWithoutClose"
      show-header
      append-to-body
      destroy-on-close
      :width="'564px'"
    >
      <template #header>
        iFreight
      </template>
      <div class="tw:text-sm">Text pertama aw awaw</div>
      <div class="tw:text-sm">Text kedua ulalala</div>
    </i-dialog>
    <i-dialog
      v-model:show="dialogNoOut"
      show-close
      show-header
      append-to-body
      destroy-on-close
      :ignore-click-outside="true"
    >
      <template #header>
        iFreight
      </template>
      can't close when click outside
    </i-dialog>
  </div>
</template>

<script>
import { ref } from 'vue';
import IButton from '@/components/i-button.vue';
import IDialog from '@/components/i-dialogs.vue';

export default {
  components: {
    IButton,
    IDialog,
  },

  setup() {
    const showDialog = ref(false);
    const dialogWithoutHeader = ref(false);
    const dialogWithoutClose = ref(false);
    const dialogNoOut = ref(false);

    const save = () => {
      console.log('save');
    }

    return {
      showDialog,
      dialogWithoutHeader,
      dialogWithoutClose,
      dialogNoOut,
      save,
    }
  }
}
</script>

<style>
@reference "@/assets/global.css";

.dialog-btn-wrapper {
  @apply tw:mt-9 tw:flex tw:justify-end;
}
</style>
