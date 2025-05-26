<template>
  <div>
    <div class="tw:w-full">
      <h1 class="tw:font-bold tw:text-xl tw:mb-2">Upload</h1>
      <p class="tw:p-2 tw:bg-blue-100 tw:border tw:border-blue-500 tw:rounded-s tw:mb-2">
        To show selected files in upload use `FileList` components. `FileList` have 2 type `List` &
        `BoxList`.
      </p>
      <p class="tw:p-2 tw:bg-cyan-100 tw:border tw:border-cyan-500 tw:rounded-s tw:mb-2">
        `FileList` component with type `Box List` can use option from `ProgressBar` to show
        progress. Use `ShowProgressBar` props, `ProgressBarValue` or `TimeoutValue` for progress bar
        need to be added into `v-model:files`. More detail is
        <router-link to="/progress-bar" class="tw:text-(--brown-600)">here</router-link>.
      </p>
      <p class="tw:p-2 tw:bg-amber-100 tw:border tw:border-amber-500 tw:rounded-s tw:mb-2">
        For file type validation use html attr `accepts` to limit file from file selector, and
        `extensions` used to validate file extension after selected.
      </p>
      <p>This is example for file upload component with single file.</p>
    </div>
    <div class="tw:flex tw:justify-between tw:gap-2 tw:mb-5">
      <div class="tw:w-[50%]">
        <p class="tw:font-bold tw:mb-2 tw:text-left">Upload with Button</p>
        <i-upload
          upload-type="button"
          name="upload1"
          class="tw:w-[150px]"
          v-model="files1"
          :is-multiple="false"
          :is-replaceable="true"
          @invalid-size="displayError"
          @invalid-file="displayErrorFile"
        >
          Upload
        </i-upload>
        <i-file-list class="tw:mt-1" type="list" v-model:files="files1"></i-file-list>
      </div>
      <div class="tw:w-[50%]">
        <p class="tw:font-bold tw:mb-2">Upload with Drag</p>
        <i-upload
          upload-type="drag"
          name="upload2"
          v-model="files2"
          :is-multiple="false"
          :is-replaceable="false"
          extensions="xls,xlsx"
          @invalid-size="displayError"
          @invalid-file="displayErrorFile"
        ></i-upload>
        <i-file-list
          class="tw:mt-1"
          v-model:files="files2WithProgressBarValue"
          :show-progress-bar="true"
        ></i-file-list>
      </div>
    </div>
    <!-- Multiple File -->
    <div class="tw:w-full">
      <p>This is example for file upload component with multiple file.</p>
    </div>
    <div class="tw:flex tw:justify-between tw:gap-2 tw:mb-5">
      <div class="tw:w-[50%]">
        <p class="tw:font-bold tw:mb-2 tw:text-left">Upload with Button</p>
        <i-upload
          upload-type="button"
          name="upload3"
          class="tw:w-[150px]"
          v-model="files3"
          :is-multiple="true"
          accept="image/*"
          @invalid-size="displayError"
          @invalid-file="displayErrorFile"
        >
          Upload
        </i-upload>
        <i-file-list
          class="tw:mt-1"
          type="list"
          :read-only="true"
          v-model:files="files3"
          :show-progress-bar="true"
          @click="handleViewFile"
        ></i-file-list>
      </div>
      <div class="tw:w-[50%]">
        <p class="tw:font-bold tw:mb-2">Upload with Drag</p>
        <i-upload
          upload-type="drag"
          class="tw:h-40"
          name="upload4"
          v-model="files4"
          accept=".pdf"
          :is-multiple="true"
          :is-replaceable="true"
          extensions="pdf"
          @invalid-size="displayError"
          @invalid-file="displayErrorFile"
        >
          <div class="tw:flex tw:flex-col tw:align-middle tw:justify-center">
            <ic-add class="tw:w-[50px] tw:h-[50px] tw:self-center"></ic-add>
            <p class="tw:text-4xl">Seret File atau Klik disini</p>
          </div>
        </i-upload>
        <i-file-list
          class="tw:mt-1"
          v-model:files="files4WithTimeoutVal"
          :show-progress-bar="true"
          :color="customColor"
        ></i-file-list>
      </div>
    </div>
    <div class="tw:flex tw:justify-between tw:gap-2 tw:mb-5">
      <div class="tw:w-[50%]">
        <p class="tw:font-bold tw:mb-2 tw:text-left">Upload with Button Disabled</p>
        <i-upload
          upload-type="button"
          name="upload5"
          class="tw:w-[150px]"
          v-model="files5"
          :is-multiple="true"
          accept="image/*"
          :disabled="true"
          @invalid-size="displayError"
          @invalid-file="displayErrorFile"
        >
          Upload
        </i-upload>
        <i-file-list
          class="tw:mt-1"
          type="list"
          :read-only="true"
          v-model:files="files5"
          :show-progress-bar="true"
          @click="handleViewFile"
        ></i-file-list>
      </div>
      <div class="tw:w-[50%]">
        <p class="tw:font-bold tw:mb-2">Upload with Drag Disabled</p>
        <i-upload
          upload-type="drag"
          class="tw:h-40"
          name="upload6"
          v-model="files6"
          accept=".pdf"
          :is-multiple="true"
          :is-replaceable="true"
          extensions="pdf"
          :disabled="true"
          @invalid-size="displayError"
          @invalid-file="displayErrorFile"
        >
          <div class="tw:flex tw:flex-col tw:align-middle tw:justify-center">
            <ic-add class="tw:w-[50px] tw:h-[50px] tw:self-center"></ic-add>
            <p class="tw:text-4xl">Seret File atau Klik disini</p>
          </div>
        </i-upload>
        <i-file-list
          class="tw:mt-1"
          v-model:files="files6"
          :show-progress-bar="true"
          :color="customColor"
          :timeout-value="100"
        ></i-file-list>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import IUpload from '@/components/i-upload.vue';
import IFileList from '@/components/i-file-list.vue';
import IcAdd from '@/icons/ic-add.vue';

export default {
  components: { IUpload, IFileList, IcAdd },
  setup() {
    let customColor = 'var(--red-600)';
    let files1 = ref([]);
    let files2 = ref([]);
    let files3 = ref([]);
    let files4 = ref([]);
    let files5 = ref([]);
    let files6 = ref([]);
    let files2progress = ref(50);

    const files4WithTimeoutVal = computed({
      get: () => {
        return files4.value.map((file) => {
          return { ...file, timeoutValue: file.size / 100 };
        });
      },
      set: (val) => {
        files4.value = val;
      },
    });

    const files2WithProgressBarValue = computed({
      get: () => {
        return files2.value.map((file) => {
          return { ...file, progressBarValue: files2progress.value };
        });
      },
      set: (val) => {
        files2.value = val;
      },
    });

    const displayError = (file) => {
      const msg = `${file.name} exceed 5 MB`;
      window.alert(msg);
    };

    const displayErrorFile = (file) => {
      const msg = `${file.name} invalid file type`;
      window.alert(msg);
    };

    const handleViewFile = (file) => {
      if (file.path) {
        window.open(file.path, '_blank');
      }
    };

    return {
      customColor,
      files1,
      files2,
      files3,
      files4,
      files5,
      files6,
      files2progress,
      files2WithProgressBarValue,
      files4WithTimeoutVal,
      displayError,
      displayErrorFile,
      handleViewFile,
    };
  },
};
</script>
