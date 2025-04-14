<template>
  <div>
    <div class="flex gap-2">
      <button
        class="i-button"
        @click="showDialog = true"
      >
        Normal Dialog
      </button>
      <button
        class="i-button"
        @click="dialogWithoutHeader = true"
      >
        Without Header
      </button>
      <button
        class="i-button"
        @click="dialogWithoutClose = true"
      >
        Without Close Btn
      </button>
      <button
        class="i-button"
        @click="dialogNoOut = true"
      >
        Can't close when click outside
      </button>
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
      <div class="text-sm">Text pertama aw awaw</div>
      <div class="text-sm">Text kedua ulalala</div>
      <div class="btn-wrapper">
        <button
          class="i-button mr-3 text-sm"
          @click="showDialog = false"
        >
          Cancel
        </button>
        <button
          class="i-button text-sm"
          @click="save"
        >
          Confirm
        </button>
      </div>
    </i-dialog>
    <i-dialog
      v-model:show="dialogWithoutHeader"
      show-close
      append-to-body
      destroy-on-close
      :width="'564px'"
    >
      <div class="text-sm">Text pertama aw awaw</div>
      <div class="text-sm">Text kedua ulalala</div>
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
      <div class="text-sm">Text pertama aw awaw</div>
      <div class="text-sm">Text kedua ulalala</div>
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
import IDialog from '@/components/i-dialogs.vue';

export default {
  components: {
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
@reference "tailwindcss";

.i-button {
  @apply bg-yellow-300;
  padding: 10px 20px;
  color: black;
  font-weight: 600;
  border: none;
  cursor: pointer;
}

.btn-wrapper {
  @reference "tailwindcss";

  @apply mt-9 flex justify-end;
}
</style>
