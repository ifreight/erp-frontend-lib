<template>
  <div>
    <div class="tw:mb-12">
      <div class="tw:font-bold tw:bg-yellow-800 tw:text-xl">Only one item</div>
      <div class="tw:mt-6">
        (Optional) You can use click event at the certain element to trigger open/close collapse
      </div>
      <i-collapse
        v-model="activeCollapse"
        class="tw:mt-6"
      >
        <i-collapse-item :name="'basic'">
          <template #header>
            <div
              class="tw:text-sm tw:font-semibold"
              @click="actionBasicHandler"
            >
              <span class="tw:italic">
                This is the title with font size 14px and 600 font weight.
              </span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </div>
          </template>

          <template #default>
            <div class="tw:py-5">
              <span class="tw:font-semibold">
                This is the field, you may add the padding top and bottom as your requirement.
              </span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </div>
          </template>
        </i-collapse-item>
      </i-collapse>
    </div>

    <div class="tw:mb-12">
      <div class="tw:font-bold tw:bg-yellow-800 tw:text-xl">
        More than one item & only click chevron can expand (rounded style & gap)
      </div>
      <div class="tw:mt-6">
        v-model: <span class="tw:text-red-300">{{ activeCollapseOne || 'null' }}</span>
      </div>
      <i-collapse
        v-model="activeCollapseOne"
        class="tw:mt-6"
      >
        <i-collapse-item
          v-for="(item, index) in collapseItems"
          :key="index"
          :name="`item-${item.name}`"
          :index="index"
          size="lg"
          gap="20px"
          use-chevron-to-expand
          rounded
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
      <div class="tw:font-bold tw:bg-yellow-800 tw:text-xl">More than one item and size base</div>
      <div class="tw:mt-6">
        v-model: <span class="tw:text-red-300">{{ activeCollapseTwo }}</span>
      </div>
      <i-collapse
        v-model="activeCollapseTwo"
        multiple
        class="tw:mt-6"
      >
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
      <div class="tw:font-bold tw:bg-yellow-800 tw:text-xl">Add another component with invalid</div>
      <div class="tw:mt-6">
        (Optional) You can use click event at the certain element to trigger open/close collapse
      </div>
      <i-collapse
        v-model="activeCollapseThree"
        invalid
        :error-message="'This is a error message'"
        class="tw:mt-6"
      >
        <i-collapse-item
          :name="'active'"
          use-rounded
        >
          <template #header>
            <div class="tw:flex tw:items-center tw:gap-5">
              <i-checkbox
                v-model="checkboxOneModel"
                name="checkboxOneModel"
              />
              <i-radio
                v-model="radioOneModel"
                :label-value="false"
                name="radioOneModel"
              >
                No
              </i-radio>
              <i-radio
                v-model="radioOneModel"
                :label-value="true"
                name="radioOneModel"
              >
                Yes
              </i-radio>
              <ic-hand />
              <i-input
                v-model="inputOneModel"
                input-id="Text1"
                name="text"
              />
              <!-- click action to trigger collapse -->
              <div @click="actionCollapseHandler">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </div>
              <i-chip
                :text="'Success'"
                :status="'success'"
              />
              <i-button
                text
                class="tw:w-fit tw:h-fit tw:text-orange-500"
              > Click me! </i-button>
            </div>
          </template>

          <template #default>
            <div class="tw:py-5">
              <div class="tw:flex tw:items-center tw:gap-5">
                <i-checkbox
                  v-model="checkboxTwoModel"
                  name="checkboxTwoModel"
                />
                <i-radio
                  v-model="radioTwoModel"
                  :label-value="false"
                  name="radioTwoModel"
                >
                  No
                </i-radio>
                <i-radio
                  v-model="radioTwoModel"
                  :label-value="true"
                  name="radioTwoModel"
                >
                  Yes
                </i-radio>
                <ic-hand />
                <i-input
                  v-model="inputTwoModel"
                  input-id="Text2"
                  name="text2"
                />
                <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit</div>
                <i-chip
                  :text="'Success'"
                  :status="'success'"
                />
                <i-button class="tw:w-fit"> Click me! </i-button>
              </div>
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
import ICheckbox from '@/components/checkbox/i-checkbox.vue';
import IChip from '@/components/i-chip.vue';
import ICollapse from '@/components/collapse/i-collapse.vue';
import ICollapseItem from '@/components/collapse/i-collapse-item.vue';
import IInput from '@/components/i-input.vue';
import IRadio from '@/components/i-radio.vue';

import IcHand from '@/icons/ic-hand.vue';

export default {
  components: {
    IButton,
    ICheckbox,
    IChip,
    ICollapse,
    ICollapseItem,
    IInput,
    IRadio,

    IcHand,
  },
  setup() {
    const activeCollapse = ref(null);
    const activeCollapseOne = ref('item-two');
    const activeCollapseTwo = ref([]);
    const activeCollapseThree = ref('active');
    const inputOneModel = ref(null);
    const inputTwoModel = ref(null);
    const radioOneModel = ref(false);
    const radioTwoModel = ref(false);
    const checkboxOneModel = ref(false);
    const checkboxTwoModel = ref(false);
    const collapseItems = computed(() => [
      // you can use any key as your requirement
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
      {
        id: 4,
        name: 'four',
        text: 'this is the text four',
      },
    ]);

    const actionBasicHandler = () => {
      if (!activeCollapse.value) {
        activeCollapse.value = 'basic';
      } else {
        activeCollapse.value = null;
      }
    };

    const actionCollapseHandler = () => {
      if (!activeCollapseThree.value) {
        activeCollapseThree.value = 'active';
      } else {
        activeCollapseThree.value = null;
      }
    };

    return {
      activeCollapse,
      activeCollapseOne,
      activeCollapseTwo,
      activeCollapseThree,
      inputOneModel,
      inputTwoModel,
      radioOneModel,
      radioTwoModel,
      checkboxOneModel,
      checkboxTwoModel,
      collapseItems,
      actionBasicHandler,
      actionCollapseHandler,
    };
  },
};
</script>
