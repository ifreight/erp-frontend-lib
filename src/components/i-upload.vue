<template>
  <div>
    <template v-if="uploadType == button">
      <i-button
        :disabled="isDisabled"
        :plain="btnPlain"
        :text="btnText"
        :error="btnError"
        :size="btnSize"
        @click="clickButton"
      >
        <template #prepend><ic-add /></template>
        <slot>Upload</slot>
      </i-button>
    </template>
    <template v-if="uploadType == drag">
      <div
        v-if="isShow"
        :class="dragUploadClass"
        @click="clickButton"
        @drop="handleDrop"
        @dragover="handleDragOver"
        @dragleave.prevent="handleDragLeave"
      >
        <slot>
          <p class="tw:self-center tw:leading-5 tw:text-sm">Drop files here or Click to Upload</p>
        </slot>
      </div>
    </template>
    <input
      class="tw:hidden"
      ref="input"
      type="file"
      :accept="accept"
      :multiple="isMultiple"
      :name="name"
      @change="inputFile"
    />
  </div>
</template>

<script>
import { useTemplateRef, watch, ref, computed } from 'vue';
import IButton from '@/components/i-button.vue';
import IcAdd from '@/icons/ic-add.vue';

const uploadTypeButton = 'button';
const uploadTypeDrag = 'drag';
export default {
  name: 'IUpload',
  components: {
    IButton,
    IcAdd,
  },
  props: {
    accept: {
      type: String,
      default: null,
    },
    modelValue: {
      type: Array,
      default: () => [],
    },
    isMultiple: {
      type: Boolean,
      default: true,
    },
    maxSize: {
      type: Number,
      default: 5120,
    },
    name: {
      type: String,
      required: true,
    },
    isReplaceable: {
      type: Boolean,
      default: false,
    },
    uploadType: {
      type: String,
      validator(value) {
        return [uploadTypeButton, uploadTypeDrag].includes(value);
      },
    },
    extensions: String,
    disabled: Boolean,
    btnPlain: Boolean,
    btnText: Boolean,
    btnError: Boolean,
    btnSize: {
      type: String,
      default: 'base',
      validator(value) {
        return ['xs', 'sm', 'base', 'lg'].includes(value);
      },
    },
  },
  emits: ['update:modelValue', 'invalidSize', 'invalidFile', 'change'],
  setup(props, { emit }) {
    const input = useTemplateRef('input');
    const button = uploadTypeButton;
    const drag = uploadTypeDrag;
    const selectedFile = ref([]);
    const isDragging = ref(false);

    watch(
      () => props.modelValue,
      async (val) => {
        selectedFile.value = val;
      },
      { deep: true },
    );

    const isShow = computed(() => {
      if (props.modelValue.length == 1 && !props.isMultiple && !props.isReplaceable) {
        return false;
      }
      return true;
    });
    const isDisabled = computed(() => {
      if (props.modelValue.length == 1 && !props.isMultiple && !props.isReplaceable) {
        return true;
      }
      return props.disabled;
    });
    const dragUploadClass = computed(() => {
      const defaultClass = 'drag-and-drop-area';
      if (isDragging.value) {
        return 'on-drag';
      }
      return defaultClass;
    });

    async function processingFile(file) {
      return new Promise((resolve, reject) => {
        const fileName = file.name.split('.');
        const ext = fileName[fileName.length - 1];
        const fr = new FileReader();
        fr.onload = (e) => {
          const dataURL = /,(.+)/.exec(e.target.result)[1];
          resolve({
            data: dataURL,
            name: file.name,
            fileExt: ext,
            url: `data:${file.type};base64,${dataURL}`,
            path: URL.createObjectURL(file),
            size: file.size,
            rawFile: file,
          });
        };
        fr.onerror = reject;
        fr.readAsDataURL(file);
      });
    }

    const clickButton = () => {
      if (!props.disabled) {
        input.value.click();
      }
    };

    const inputFile = async (data) => {
      // stop function if file is not multiple and not replaceable
      if (!props.isMultiple && props.modelValue.length == 1) {
        if (!props.isReplaceable) {
          return;
        }
        // empty value if replaceable
        emit('update:modelValue', []);
      }

      // loop all files
      const inputtedFiles = [];
      for await (const file of Array.from(data.target.files)) {
        if (props.extensions) {
          const arrExtension = props.extensions.split(',');
          const fileExt = file.name.split('.');
          if (!arrExtension.includes(fileExt[fileExt.length - 1].toLowerCase())) {
            emit('invalidFile', file);
          }
        }

        const isValidSize = file.size <= props.maxSize * 1024;
        if (isValidSize) {
          const result = await processingFile(file);
          selectedFile.value.push(result);
          inputtedFiles.push(result);
          emit('update:modelValue', selectedFile.value);
        } else {
          emit('invalidSize', file);
        }

        // Break loop if selected file by drag is multiple and input only accept 1
        if (!props.isMultiple && selectedFile.value.length == 1) {
          break;
        }
      }
      if (inputtedFiles.length > 0) {
        emit('change', inputtedFiles, selectedFile.value);
      }
      input.value.value = null;
    };

    const handleDragOver = (e) => {
      e.preventDefault();
      isDragging.value = true;
    };

    const handleDragLeave = () => {
      isDragging.value = false;
    };

    const handleDrop = (e) => {
      e.preventDefault();
      if (!props.disabled) {
        input.value.files = e.dataTransfer.files;
        input.value.dispatchEvent(new Event('change'));
      }
      isDragging.value = false;
    };

    return {
      button,
      drag,
      isShow,
      isDisabled,
      dragUploadClass,
      selectedFile,
      clickButton,
      inputFile,
      handleDragOver,
      handleDragLeave,
      handleDrop,
    };
  },
};
</script>

<style>
@reference "@/assets/global.css";

.drag-and-drop-area {
  @apply tw:border-(--grey-500) tw:border tw:rounded-md tw:border-dashed tw:flex tw:justify-center tw:p-1.5 tw:min-h-[43px] tw:h-[inherit] tw:text-center tw:cursor-pointer;
}
.on-drag {
  @apply tw:border-(--brown-600) tw:border tw:rounded-md tw:border-dashed tw:flex tw:justify-center tw:p-1.5 tw:min-h-[43px] tw:h-[inherit] tw:text-center tw:cursor-pointer;
}
</style>
