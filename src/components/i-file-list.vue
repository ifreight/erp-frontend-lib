<template>
  <div>
    <transition-group name="list" tag="div">
      <div class="tw:mb-1" v-for="(file, index) in files" :key="index">
        <slot :file="file">
          <template v-if="type == boxList">
            <div
              class="tw:relative tw:border-(--gray-500) tw:border tw:rounded-sm tw:h-[46px] tw:p-2 tw:flex tw:justify-between tw:align-middle"
            >
              <p class="tw:text-sm tw:self-center" @click="viewFile(file)">{{ file.name }}</p>
              <i-button
                v-if="isProgressFinish.includes(`${index}-${file.name}`)"
                :text="true"
                class="tw:self-center tw:w-fit"
                @click="remove(index)"
              >
                <ic-times></ic-times>
              </i-button>
              <p v-if="file.progressBarValue" class="tw:self-center">
                {{ file.progressBarValue }}%
              </p>
              <i-progress-bar
                class="tw:absolute tw:bottom-0 tw:left-0 progress-border-radius"
                v-if="showProgressBar"
                :progress="file.progressBarValue"
                :timeout-value="file.timeoutValue"
                :color="color"
                @finish="
                  () => {
                    isProgressFinish.push(`${index}-${file.name}`);
                  }
                "
              ></i-progress-bar>
            </div>
          </template>
          <template v-if="type == list">
            <div class="tw:p-1 tw:pb-0 tw:flex tw:justify-between tw:align-middle">
              <i-button
                :disabled="!readOnly"
                :text="true"
                class="tw:self-center tw:h-fit tw:w-fit"
                @click="viewFile(file)"
              >
                {{ file.name }}
              </i-button>
              <i-button
                v-if="!readOnly"
                :text="true"
                class="tw:self-center tw:w-fit"
                @click="remove(index)"
              >
                <ic-times></ic-times>
              </i-button>
            </div>
          </template>
        </slot>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import IcTimes from '@/icons/ic-times.vue';
import IProgressBar from '@/components/i-progress-bar.vue';
import IButton from '@/components/i-button.vue';

const typeBoxList = 'boxList';
const typeList = 'list';

export default {
  name: 'IFileList',
  components: {
    IcTimes,
    IProgressBar,
    IButton,
  },
  props: {
    files: {
      type: Array,
      default: () => [],
    },
    type: {
      type: String,
      default: typeBoxList,
      validator(value) {
        return [typeBoxList, typeList].includes(value);
      },
    },
    readOnly: Boolean,
    showProgressBar: Boolean,
    color: String,
  },
  emits: ['update:files', 'remove', 'click'],
  setup(props, { emit }) {
    const boxList = typeBoxList;
    const list = typeList;
    let isProgressFinish = ref([]);

    const showRemoveButton = computed(() => {
      if (props.showProgressBar) {
        return isProgressFinish.value;
      }
      return !props.readOnly;
    });

    const remove = (index) => {
      emit('remove', props.files[index]);
      emit('update:files', props.files.slice(0, index).concat(props.files.slice(index + 1)));
    };

    const viewFile = (file) => {
      if (props.readOnly) {
        emit('click', file);
      }
    };
    return { boxList, list, isProgressFinish, showRemoveButton, remove, viewFile };
  },
};
</script>

<style>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}

.progress-border-radius {
  border-end-end-radius: 4px;
  border-end-start-radius: 4px;
}
</style>
