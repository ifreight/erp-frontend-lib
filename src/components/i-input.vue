<template>
  <input class="i-input" />
</template>

<script>
export default {
  name: 'IInput',
  props: {
    value: {
      type: [String, Number, Date, Object],
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
      default: '',
    },
    autoComplete: {
      type: String,
      default: 'off',
    },
    dateLocale: { // only active when value type is date
      type: String,
      default: 'en',
    },
    dateFormat: { // only active when value type is date
      type: String,
      default: 'dddd, D MMM, YYYY', // format follow dayjs
    },
    size: {
      type: String,
      default: 'base',
      validator(value) {
        return ['sm', 'base'].includes(value);
      },
    },
    maxlength: {
      type: Number,
      default: null,
    },
    disabled: Boolean,
    readOnly: Boolean,
    invalid: Boolean,
    borderless: Boolean,
  }
}
</script>
<style>
.i-input {
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border: 2px solid red;
  border-radius: 4px;
}
</style>
