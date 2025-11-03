<template>
  <div class="i-options">
    <div v-if="$slots.header" class="i-options-header">
      <slot name="header" />
    </div>

    <ul
      v-if="filteredOptions.length > 0"
      class="i-options-body"
      :style="{
        'max-height': maxHeight,
      }"
    >
      <li
        v-for="(option, idx) in filteredOptions"
        :key="`option-${idx}`"
        :class="{
          selected: currentValue === option[optionKey],
          disabled: option.disabled,
          'deactive-event': deactivateWrapperEvent,
        }"
        class="tw:min-h-[31px]"
        @click="onSelectHandler(option)"
      >
        <slot name="optionsPrepend" :option="option" />
        <slot name="options" :option="option" :make-bold="makeBold">
          <span v-if="currentValue === option[optionKey]">
            {{ option[optionValue] }}
          </span>
          <span v-else v-html="makeBold(option[optionValue])" />
        </slot>
        <span class="tw:ml-auto" @click.stop>
          <slot name="optionsAppend" :option="option" />
        </span>
      </li>
    </ul>
    <div v-else class="i-options-placeholder">
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
  </div>
</template>

<script>
import { computed, defineComponent, watch } from 'vue';

export default defineComponent({
  name: 'IOptions',
  props: {
    deactivateWrapperEvent: Boolean,
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
    isHideOnEmptyOptions: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:visible', 'selectedValue'],
  setup(props, { emit }) {
    const filteredOptions = computed(() => {
      const optionsData = props.options.map((option) => {
        if (typeof option !== 'object') {
          return {
            id: option,
            name: option,
          };
        }
        return option;
      });
      if (!props.filterable || !props.query) {
        return optionsData;
      }
      const filtered = optionsData.filter((option) => {
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
    const onSelectHandler = (option) => {
      if (option.disabled) {
        return false;
      }
      emit('selectedValue', option);
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
      filteredOptions,
      makeBold,
      onSelectHandler,
    };
  },
});
</script>
