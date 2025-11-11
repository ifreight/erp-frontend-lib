<template>
  <div>
    <h2 class="tw:text-xl tw:bg-gray-50 tw:mb-4">Text Area</h2>
    <div class="tw:mb-4">
      <div>
        Normal
        <span class="tw:text-red-400 tw:ml-1">
          v-model:
          <span v-if="textArea1 === null">ini null</span>
          <span v-else>{{ !textArea1 ? 'empty bkn null' : `${textArea1}` }}</span>
        </span>
      </div>
      <i-text-area
        v-model="textArea1"
        input-id="TextArea2"
        name="message"
        placeholder="Placeholder"
        class="chat-textarea"
      />
      <span @click="textArea1 = null" class="tw:cursor-pointer">kosongin</span>
    </div>

    <div class="tw:mb-4">
      <div>Disabled</div>
      <i-text-area
        v-model="valueDisabled"
        disabled
        input-id="TextArea3"
        name="message"
        class="chat-textarea"
      />
    </div>

    <div class="tw:mb-4">
      <div>
        Error (isNullWhenEmpty false)
        <span class="tw:text-red-400 tw:ml-1">
          v-model:
          <span v-if="textArea2 === null">ini null</span>
          <span v-else>{{ !textArea2 ? 'empty bkn null' : `${textArea2}` }}</span>
        </span>
      </div>
      <i-text-area
        v-model="textArea2"
        input-id="TextArea4"
        name="message"
        class="chat-textarea"
        :invalid="true"
        error-message="Error Message"
        :isNullWhenEmpty="false"
      />
    </div>

    <div class="tw:mb-4">
      <div>
        Text Limit
        <span class="tw:text-red-400 tw:ml-1">
          v-model:
          <span v-if="textArea3 === null">ini null</span>
          <span v-else>{{ !textArea3 ? 'empty bkn null' : `${textArea3}` }}</span>
        </span>
      </div>
      <i-text-area
        v-model="textArea3"
        input-id="TextArea4"
        name="message"
        class="chat-textarea"
        :maxlength="5"
        :show-text-limit="true"
      />
    </div>

    <div class="tw:mb-4">
      <div>
        Prevent press enter & shit + enter to add new space
        <span class="tw:text-red-400 tw:ml-1">
          v-model:
          <span v-if="textArea4 === null">ini null</span>
          <span v-else>{{ !textArea4 ? 'empty bkn null' : `${textArea4}` }}</span>
        </span>
      </div>
      <i-text-area
        v-model="textArea4"
        input-id="TextArea4"
        name="message"
        placeholder="Placeholder"
        class="chat-textarea"
        :prevent-enter-key="true"
        @pressEnter="pressEnterHandler"
      />
      <span @click="textArea4 = null" class="tw:cursor-pointer">kosongin</span>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, nextTick } from 'vue';
import ITextArea from '@/components/i-text-area.vue';

export default {
  components: {
    ITextArea,
  },
  setup() {
    const textArea1 = ref(null);
    const textArea2 = ref('');
    const textArea3 = ref(null);
    const textArea4 = ref(null);
    const valueDisabled = ref('text3 disabled');

    const pressEnterHandler = () => {
      window.alert('press enter');
    };

    onMounted(async () => {
      await nextTick();
      textArea2.value = 'zzzz';
    });

    return {
      textArea1,
      textArea2,
      textArea3,
      textArea4,
      valueDisabled,
      pressEnterHandler,
    };
  },
};
</script>
