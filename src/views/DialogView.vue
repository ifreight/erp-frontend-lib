<template>
  <div>
    <button
      class="i-button"
      @click="openDialog"
    >
      Open Dialog
    </button>
    <i-dialog
      v-model:show="showDialog"
      show-close
      show-header
      append-to-body
      destroy-on-close
      :width="'564px'"
    >
      <div class="text-sm">Text pertama aw awaw</div>
      <div class="text-sm">Text kedua ulalala</div>
      <div class="btn-wrapper">
        <button
          class="i-button mr-3 text-sm"
          @click="showDialog = false"
        >
          Text
        </button>
        <button
          class="i-button text-sm"
          @click="save"
        >
          Text
        </button>
      </div>
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

    const openDialog = () => {
      showDialog.value = true;
    }

    const save = () => {
      console.log('save');
    }

    return {
      showDialog,
      openDialog,
      save,
    }
  }
}
</script>

<style>
.i-button {
  @reference "tailwindcss";
  @apply bg-yellow-300;
  /* background: #f9cf36; */
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
