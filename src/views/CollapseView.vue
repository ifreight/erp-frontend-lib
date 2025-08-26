<template>
  <div>
    <div class="tw:mb-12">
      <div class="tw:font-bold tw:bg-yellow-800 tw:text-xl">Without v-model (only one item)</div>
      <i-collapse class="tw:mt-6">
        <i-collapse-item>
          <template #header>
            <span class="tw:text-sm tw:font-semibold">
              This is the title with 14px and 600 weight
            </span>
          </template>

          <template #default> This is the field </template>
        </i-collapse-item>
      </i-collapse>
    </div>

    <div class="tw:mb-12">
      <div class="tw:font-bold tw:bg-yellow-800 tw:text-xl">Using v-model (more than one item)</div>
      <div class="tw:mt-6">v-model: {{ activeCollapseOne || 'null' }}</div>
      <i-collapse v-model="activeCollapseOne" class="tw:mt-6">
        <i-collapse-item
          v-for="(item, index) in collapseItems"
          :key="index"
          :name="`item-${item.name}`"
          :index="index"
        >
          <template #header>
            {{ item.name }}
          </template>

          <template #default>
            {{ item.text }}
          </template>
        </i-collapse-item>
      </i-collapse>
    </div>

    <div class="tw:mb-12">
      <div class="tw:font-bold tw:bg-yellow-800 tw:text-xl">
        Using v-model & multiple (more than one item)
      </div>
      <div class="tw:mt-6">v-model: {{ activeCollapseTwo || 'null' }}</div>
      <i-collapse v-model="activeCollapseTwo" multiple class="tw:mt-6">
        <i-collapse-item
          v-for="(item, index) in collapseItems"
          :key="index"
          :name="`item-${item.name}`"
          :index="index"
        >
          <template #header>
            {{ item.name }}
          </template>

          <template #default>
            {{ item.text }}
          </template>
        </i-collapse-item>
      </i-collapse>
    </div>

    <div class="tw:mb-12">
      <div class="tw:font-bold tw:bg-yellow-800 tw:text-xl">Add another component</div>
      <i-collapse class="tw:mt-6">
        <i-collapse-item>
          <template #header>
            <i-button class="tw:w-1/2"> Click me! </i-button>
          </template>

          <template #default>
            <div class="tw:flex tw:gap-5">
              <i-radio v-model="radioModel" :label-value="false" name="radioModel"> No </i-radio>
              <i-radio v-model="radioModel" :label-value="true" name="radioModel"> Yes </i-radio>
            </div>
          </template>
        </i-collapse-item>
      </i-collapse>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import IButton from '@/components/i-button.vue';
import ICollapse from '@/components/collapse/i-collapse.vue';
import ICollapseItem from '@/components/collapse/i-collapse-item.vue';
import IRadio from '@/components/i-radio.vue';

export default {
  components: {
    IButton,
    ICollapse,
    ICollapseItem,
    IRadio,
  },
  setup() {
    const activeCollapseOne = ref('item-two');
    const activeCollapseTwo = ref([]);
    const radioModel = ref(false);
    const collapseItems = computed(() => [
      {
        id: 1,
        name: 'one',
        text: 'this is the text one',
      },
      {
        id: 2,
        name: 'two',
        text: 'this is the text two',
      },
      {
        id: 3,
        name: 'three',
        text: 'this is the text three',
      },
    ]);

    return {
      activeCollapseOne,
      activeCollapseTwo,
      radioModel,
      collapseItems,
    };
  },
};
</script>
