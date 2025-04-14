<template>
  <div>
    <h2 class="text-xl bg-gray-50 mb-4">Text Area</h2>
    <div class="mb-4">
      <i-text-area
        v-model="textArea"
        input-id="textarea"
        name="message"
        label="Input Text Area"
        class="chat-textarea"
      />
    </div>

    <div class="mb-4">
      <i-text-area
        v-model="textArea"
        input-id="textarea"
        name="message"
        placeholder="Placeholder"
        class="chat-textarea"
      />
    </div>

    <div class="mb-4">
      <i-text-area
        v-model="textAreaTest"
        input-id="textarea"
        name="message"
        placeholder="Placeholder"
        class="chat-textarea"
      />
    </div>

    <div class="mb-4">
      <i-text-area
        v-model="valueDisabled"
        disabled
        input-id="textarea"
        name="message"
        class="chat-textarea"
      />
    </div>

    <div class="mb-4">
      <i-text-area
        v-model="textArea"
        input-id="textarea"
        name="message"
        class="chat-textarea"
        :invalid="true"
        error-message="Error Message"
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
