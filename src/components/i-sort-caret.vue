<template>
  <div class="i-sort-caret" @click="toggleSort">
    <ic-chevrons-vertical-up-down
      class="caret"
      :up-path="sortValue === 'asc' ? 'tw:fill-gray-900' : 'tw:fill-gray-700'"
      :down-path="sortValue === 'desc' ? 'tw:fill-gray-900' : 'tw:fill-gray-700'"
    />
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import icChevronsVerticalUpDown from '@/icons/ic-chevrons-vertical-up-down.vue';

export default {
  name: 'ISortCaret',
  props: {
    modelValue: {
      type: String,
      default: null,
      validator(value) {
        return value == null || ['asc', 'desc'].includes(value);
      },
    },
  },
  components: {
    icChevronsVerticalUpDown,
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const sortValue = ref(null);

    watch(
      () => props.modelValue,
      (val) => {
        if (val !== sortValue.value) {
          sortValue.value = val;
        }
      },
      {
        immediate: true,
      },
    );

    const toggleSort = () => {
      let updatedValue = null;
      switch (sortValue.value) {
        case null:
          updatedValue = 'asc';
          break;
        case 'asc':
          updatedValue = 'desc';
          break;
        case 'desc':
        default:
          updatedValue = null;
          break;
      }

      sortValue.value = updatedValue;
      emit('update:modelValue', updatedValue);
      emit('change', updatedValue);
    };

    return {
      sortValue,
      toggleSort,
    };
  },
};
</script>

<style>
@reference "@/assets/global.css";

.i-sort-caret {
  display: inline-block;
  width: 25px;
  height: 25px;
  padding: 2px 0;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  border-radius: 50%;

  &:hover {
    background-color: var(--gray-100);
  }

  .caret {
    @apply tw:h-6 tw:w-6;
  }
}
</style>
