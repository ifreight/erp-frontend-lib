<template>
  <div>
    <h2 class="tw:text-xl tw:bg-gray-50 tw:mb-4">Text Area</h2>
    <div class="tw:mb-4">
      <div>Normal</div>
      <i-text-area
        v-model="textAreaTest"
        input-id="TextArea2"
        name="message"
        placeholder="Placeholder"
        class="chat-textarea"
      />
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
      <div>Error</div>
      <i-text-area
        v-model="textArea"
        input-id="TextArea4"
        name="message"
        class="chat-textarea"
        :invalid="true"
        error-message="Error Message"
      />
    </div>

    <div class="tw:mb-4">
      <div>Text Limit</div>
      <i-text-area
        v-model="textArea"
        input-id="TextArea4"
        name="message"
        class="chat-textarea"
        :maxlength="5"
        :show-text-limit="true"
      />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import ITextArea from '@/components/i-text-area.vue';

export default {
  components: {
    ITextArea,
  },
  setup() {
    const textArea = ref('');
    const textAreaTest = ref('test isi text area');
    const valueDisabled = ref('text3 disabled');

    return {
      textArea,
      textAreaTest,
      valueDisabled,
    }
  },
}
</script>
