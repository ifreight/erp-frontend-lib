<template>
  <div>
    <div class="tw:w-full">
      <h1 class="tw:font-bold tw:text-xl tw:mb-2">Upload</h1>
      <p class="tw:p-2 tw:bg-blue-100 tw:border tw:border-blue-500 tw:rounded-s tw:mb-2">
        To show selected files in upload use `FileList` components. `FileList` have 2 type `List` &
        `ProgressList`.
      </p>
      <p class="tw:p-2 tw:bg-cyan-100 tw:border tw:border-cyan-500 tw:rounded-s tw:mb-2">
        `FileList` component with type `Progress List` can use option from `ProgressBar` to show
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
        <div>
          <p class="tw:font-bold tw:mb-2 tw:text-left">Upload with Button</p>
          <i-upload
            upload-type="button"
            name="upload1"
            class="tw:w-[250px]"
            v-model="files1"
            :is-multiple="false"
            :is-replaceable="true"
            @invalid-size="displayError"
            @invalid-file="displayErrorFile"
          >
            multiple false replace true
          </i-upload>
          <i-file-list
            class="tw:mt-1"
            type="list"
            :viewable="false"
            v-model:files="files1"
            @click="clickFileHandler"
          ></i-file-list>
        </div>
        <div>
          <p class="tw:font-bold tw:mb-2 tw:text-left">Upload with Button</p>
          <i-upload
            upload-type="button"
            name="upload1"
            class="tw:w-[250px]"
            v-model="files7"
            :is-multiple="false"
            :is-replaceable="false"
            @invalid-size="displayError"
            @invalid-file="displayErrorFile"
          >
            multiple false replace false
          </i-upload>
          <i-file-list
            class="tw:mt-1"
            type="list"
            v-model:files="files7"
            @click="clickFileHandler"
          ></i-file-list>
        </div>
      </div>
      <div class="tw:w-[50%]">
        <p class="tw:font-bold tw:mb-2">Upload with Drag 1</p>
        <i-upload
          upload-type="drag"
          name="upload2"
          v-model="files2"
          :is-multiple="false"
          :is-replaceable="false"
          extensions="xls,xlsx"
          @invalid-size="displayError"
          @invalid-file="displayErrorFile"
          >multiple false replace false (ext: xls)</i-upload
        >
        <i-file-list
          class="tw:mt-1"
          v-model:files="files2WithProgressBarValue"
          :show-progress-bar="true"
        ></i-file-list>
      </div>
    </div>
    <!-- Multiple File -->
    <div class="tw:w-full tw:bg-yellow-400 tw:p-1 tw:text-center">
      <p>This is example for file upload component with multiple file.</p>
    </div>
    <div class="tw:flex tw:justify-between tw:gap-2 tw:mb-5">
      <div class="tw:w-[50%]">
        <p class="tw:font-bold tw:mb-2 tw:text-left">Upload with Button + btnError + btnSize xs</p>
        <i-upload
          upload-type="button"
          name="upload3"
          class="tw:w-[150px]"
          v-model="files3"
          :is-multiple="true"
          accept="image/*"
          :btnError="true"
          btnSize="xs"
          @invalid-size="displayError"
          @invalid-file="displayErrorFile"
        >
          multiple true
        </i-upload>
        <i-file-list
          class="tw:mt-1"
          type="list"
          v-model:files="files3"
          :show-progress-bar="true"
          @click="handleViewFile"
        ></i-file-list>
      </div>
      <div class="tw:w-[50%]">
        <p class="tw:font-bold tw:mb-2">Upload with Drag 2</p>
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
            <p class="tw:text-4xl">Seret File atau Klik disini (accept pdf)</p>
          </div>
        </i-upload>
        <i-file-list
          class="tw:mt-1"
          v-model:files="files4WithTimeoutVal"
          :show-progress-bar="true"
          :color="customColor"
          @click="clickFileHandler"
        ></i-file-list>
      </div>
    </div>
    <div class="tw:w-full tw:bg-yellow-400 tw:p-1 tw:text-center">
      <p>This is example for file upload component with disabled state.</p>
    </div>
    <div class="tw:flex tw:justify-between tw:gap-2 tw:mb-5">
      <div class="tw:w-[50%]">
        <p class="tw:font-bold tw:mb-2 tw:text-left">Upload with Button Disabled + btnPlain</p>
        <i-upload
          upload-type="button"
          name="upload5"
          class="tw:w-[150px]"
          v-model="files5"
          :is-multiple="true"
          accept="image/*"
          :disabled="true"
          :btnPlain="true"
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
    let files1 = ref([
      {
        documentId: 60,
        fileName: 'dummies.pdf',
        filePath: 'blob:http://localhost:9000/15f3e5bf-c53c-44a6-9909-570b8d76f2ef',
      },
    ]);
    let files2 = ref([]);
    let files3 = ref([
      {
        documentId: 60,
        fileName: 'dummies.pdf',
        filePath: 'blob:http://localhost:9000/15f3e5bf-c53c-44a6-9909-570b8d76f2ef',
      },
    ]);
    let files4 = ref([
      {
        data: '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',
        name: 'fff.png',
        fileExt: 'png',
        url: 'data:image/png;base64,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',
        path: 'blob:http://localhost:9000/399cf1c4-f942-4f23-ab46-4174917acdaa',
        size: 1785,
      },
    ]);
    let files5 = ref([]);
    let files6 = ref([]);
    let files7 = ref([
      {
        documentId: 60,
        fileName: 'dummies.pdf',
        filePath: 'blob:http://localhost:9000/15f3e5bf-c53c-44a6-9909-570b8d76f2ef',
      },
    ]);
    let files2progress = ref(100);

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
        const x = files2.value.map((file) => {
          return { ...file, progressBarValue: files2progress.value };
        });
        return x;
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
    const clickFileHandler = (file) => {
      alert(file);
    };
    return {
      customColor,
      files1,
      files2,
      files3,
      files4,
      files5,
      files6,
      files7,
      files2progress,
      files2WithProgressBarValue,
      files4WithTimeoutVal,
      displayError,
      displayErrorFile,
      handleViewFile,
      clickFileHandler,
    };
  },
};
</script>
