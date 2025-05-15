<template>
  <h1 class="tw:font-bold tw:mt-1 tw:mb-2 tw:text-2xl">File List Example</h1>
  <p class="tw:p-2 tw:bg-amber-100 tw:border tw:border-amber-500 tw:rounded-s tw:mb-2">
    Default example: where files array contain object key `name` to automatically display file name.
    <br />
    Meanwhile custom slot: where you can put the style and template yourself.
  </p>
  <div class="tw:flex tw:flex-wrap tw:gap-4">
    <div>
      <p class="mb-1">Example `type:list` with default</p>
      <i-file-list type="list" :files="mapData"></i-file-list>
    </div>
    <div>
      <p>Example `type:boxList` with default</p>
      <i-file-list type="boxList" :files="mapData"></i-file-list>
    </div>
    <div>
      <p>Example `type:boxList` with default</p>
      <i-file-list type="boxList" :files="mapData" :show-progress-bar="true"></i-file-list>
    </div>
    <div>
      <p>Example with custom slot</p>
      <i-file-list type="list" :files="exampleData">
        <template v-slot:default="{ file }">
          <div class="tw:flex tw:gap-2 tw:p-4 tw:underline">
            <img :src="file.fileUrl" alt="thumbnail" width="50" />
            {{ file.fileName }}
          </div>
        </template>
      </i-file-list>
    </div>
    <div>
      <p>Example with custom slot</p>
      <i-file-list type="boxList" :files="exampleData">
        <template v-slot:default="{ file }">
          <div
            class="tw:border tw:border-(--brown-600) tw:rounded-b-2xl tw:rounded-r-2xl tw:p-4 tw:flex tw:align-middle tw:gap-2"
          >
            <img :src="file.fileUrl" alt="thumbnail" width="50" />{{ file.fileName }}
          </div>
        </template>
      </i-file-list>
    </div>
  </div>
</template>

<script>
import IFileList from '@/components/i-file-list.vue';
import { computed, ref } from 'vue';

export default {
  components: { IFileList },
  setup() {
    const exampleData = ref([
      {
        fileName: 'testData1.jpg',
        fileUrl: 'https://placehold.co/600x400',
        timeoutValue: 100,
      },
      {
        fileName: 'testData2.jpg',
        fileUrl: 'https://placehold.co/600x400',
        timeoutValue: 100,
      },
      {
        fileName: 'testData3.jpg',
        fileUrl: 'https://placehold.co/600x400',
        timeoutValue: 100,
      },
      {
        fileName: 'testData4.jpg',
        fileUrl: 'https://placehold.co/600x400',
        timeoutValue: 100,
      },
    ]);
    const mapData = computed(() => {
      return exampleData.value.map((item) => {
        return { name: item.fileName, ...item };
      });
    });
    return { exampleData, mapData };
  },
};
</script>
