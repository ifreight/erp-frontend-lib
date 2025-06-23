<template>
  <i-dropdown
    :visible="visible"
    :width="width"
    class="i-dropdown-options"
    :rounded="rounded"
    :is-show-arrow="isShowArrow"
    :borderless="borderless"
    :relative-box="relativeBox"
    :padding="padding"
  >
    <div v-if="$slots.header" class="i-dropdown-options-header">
      <slot name="header" />
    </div>

    <ul
      v-if="filteredOptions.length > 0"
      class="i-dropdown-options-body"
      :class="bodyClasses"
      :style="{
        'max-height': maxHeight,
      }"
    >
      <li
        v-for="(option, idx) in filteredOptions"
        :key="`option-${idx}`"
        :class="currentValue === option[optionKey] && 'selected'"
        @click="$emit('selectedValue', option)"
      >
        <slot name="optionsPrepend" :option="option" />
        <slot name="options" :option="option" :make-bold="makeBold">
          <span v-if="currentValue === option[optionKey]">
            {{ option[optionValue] }}
          </span>
          <span v-else v-html="makeBold(option[optionValue])" />
        </slot>
      </li>
    </ul>
    <div v-else class="i-dropdown-options-placeholder">
      <slot name="optionsPlaceholder">
        <template v-if="loading"> Loading </template>
        <template v-else-if="remote">
          {{ query ? noDataText : remoteText }}
        </template>
        <template v-else>
          {{ noDataText }}
        </template>
      </slot>
    </div>
  </i-dropdown>
</template>

<script>
import { computed, defineComponent, watch } from 'vue';
import IDropdown from './i-dropdown.vue';

export default defineComponent({
  name: 'IDropdownOptions',
  components: {
    IDropdown,
  },
  props: {
    visible: Boolean,
    width: {
      type: String,
      default: '100%',
    },
    options: {
      type: Array,
      default: () => [],
    },
    optionKey: {
      type: String,
      default: 'id',
    },
    optionValue: {
      type: String,
      default: 'name',
    },
    currentValue: {
      type: [String, Number, Array],
      default: '',
    },
    query: {
      type: String,
      default: '',
    },
    filterable: Boolean,
    remote: Boolean,
    remoteText: {
      type: String,
      default: 'Type to search.',
    },
    noDataText: {
      type: String,
      default: 'No results found.',
    },
    loading: Boolean,
    maxHeight: {
      type: String,
      default: '264px',
    },
    rounded: {
      type: String,
      default: 'xs',
    },
    isShowArrow: {
      type: Boolean,
      default: true,
    },
    relativeBox: {
      type: Boolean,
      default: false,
    },
    borderless: {
      type: Boolean,
      default: false,
    },
    padding: {
      type: String,
      default: 'base',
      validator(value) {
        return ['none', 'base', 'lg'].includes(value);
      },
    },
    isHideOnEmptyOptions: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:visible', 'selectedValue'],
  setup(props, { emit }) {
    const bodyClasses = computed(() => {
      return [`rounded-${props.rounded}`];
    });

    const filteredOptions = computed(() => {
      const dropdownOptions = props.options.map((option) => {
        if (typeof option !== 'object') {
          return {
            id: option,
            name: option,
          };
        }
        return option;
      });
      if (!props.filterable || !props.query) {
        return dropdownOptions;
      }
      const filtered = dropdownOptions.filter((option) => {
        const query = props.query !== null && props.query.toLowerCase();
        const label = option[props.optionValue].toLowerCase();
        return label.includes(query);
      });
      return filtered;
    });

    const makeBold = (str, query = props.query) => {
      if (!str) {
        return str;
      }
      // mask all word characters in city name
      const cityMask = str.replace(/\w/g, '#');
      // string city and query string from any non-word character
      const queryStripped = props.query !== null && query.toLowerCase().replace(/\W/g, '');
      const stringStripped = str.replace(/\W/g, '');
      // find the index of query string in city name
      const index = stringStripped.toLowerCase().indexOf(queryStripped);
      if (index > -1 && queryStripped.length) {
        // find the end position of substring in stripped city name
        const endIndex = index + queryStripped.length - 1;
        // replacer function for each masked character.
        // it will add to the start and end character of substring the corresponding tags,
        // replacing all masked characters with the original one.
        const replacer = (i) => {
          let repl = stringStripped[i];
          if (i === index) {
            repl = `<b>${repl}`;
          }
          if (i === endIndex) {
            repl += '</b>';
          }
          return repl;
        };
        let i = -1;
        // restore masked string
        return cityMask.replace(/#/g, () => {
          i += 1;
          return replacer(i);
        });
      }
      return str;
    };

    watch(
      () => filteredOptions.value,
      (val) => {
        if (props.isHideOnEmptyOptions) {
          emit('update:visible', val.length > 0);
        }
      },
    );

    return {
      bodyClasses,
      filteredOptions,
      makeBold,
    };
  },
});
</script>

<style>
.i-dropdown-options {
  .i-dropdown-options-header {
    padding: 4px 0 12px;
    margin-bottom: 12px;
    border-bottom: 1px solid var(--gray-500);
  }

  .i-dropdown-options-body {
    max-height: 264px;
    padding: 0;
    margin: 0;
    overflow: scroll;
    overflow-x: hidden;
    overflow-y: overlay;
    list-style: none;
    scrollbar-width: thin;
    scrollbar-color: var(--gray-500) transparent;

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-color: var(--gray-500);
      border: none;
      border-radius: 20px;
    }
    li {
      display: flex;
      align-items: center;
      padding: 8px 6px;
      font-size: 12px;
      line-height: normal;
      color: var(--gray-900);
      cursor: pointer;

      &.selected {
        font-weight: 600;
        background-color: var(--yellow-200);
      }

      &:hover {
        background-color: var(--yellow-200);
      }
    }

    &.rounded-xs li {
      border-radius: 2px;
    }
    &.rounded-sm li {
      border-radius: 4px;
    }
    &.rounded-lg li {
      border-radius: 8px;
    }
    &.rounded-xl li {
      border-radius: 12px;
    }
  }

  .i-dropdown-options-placeholder {
    font-size: 12px;
    line-height: normal;
    color: var(--gray-700);
    padding: 8px 6px;
  }
}
</style>
