<template>
  <div class="i-collapse">
    <div v-if="invalid" class="i-collapse-error-message">
      {{ errorMessage }}
    </div>
    <div>
      <slot />
    </div>
  </div>
</template>

<script>
import { computed, provide, ref, watch } from 'vue';

export default {
  name: 'ICollapse',
  props: {
    modelValue: {
      type: [Array, String, Number],
      default: null,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    invalid: {
      type: Boolean,
      default: false,
    },
    errorMessage: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const itemList = ref([]);
    const modelValueArray = computed(() => {
      if (!props.modelValue && props.modelValue !== 0) {
        return [];
      }

      return Array.isArray(props.modelValue) ? props.modelValue : [props.modelValue];
    });

    const activeName = ref(modelValueArray.value);

    const setActiveNames = (arrayValue) => {
      activeName.value = arrayValue;
      const value = !props.multiple ? activeName.value[0] : activeName.value;
      emit('update:modelValue', value);
      emit('change', value);
    };

    const handleClickEvent = (name) => {
      if (!props.multiple) {
        if ((activeName.value[0] || activeName.value[0] === 0) && activeName.value[0] === name) {
          setActiveNames([]);
        } else {
          setActiveNames([name]);
        }
      } else {
        const activeNames = [...activeName.value];
        const activeNamesIndex = activeNames.indexOf(name);

        if (activeNamesIndex > -1) {
          activeNames.splice(activeNamesIndex, 1);
        } else {
          activeNames.push(name);
        }
        setActiveNames(activeNames);
      }
    };

    watch(
      () => modelValueArray.value,
      (val) => {
        const difference = val
          .filter((v) => !activeName.value.includes(v))
          .concat(activeName.value.filter((v) => !val.includes(v)));

        if (difference.length > 0) {
          activeName.value = val;
        }
      },
    );

    provide('ICollapseKey', { activeName, itemList, handleClickEvent });
  },
};
</script>

<style>
@reference '@/assets/global.css';

.i-collapse {
  .i-collapse-error-message {
    @apply tw:text-red-300 tw:text-xs tw:mb-2.5;
  }
}
</style>
