<template>
  <div :class="fixedHeader ? 'fixed-header' : ''">
    <table class="i-table">
      <thead>
        <tr>
          <th
            v-for="(header, index) in headers"
            :key="index"
            :style="{ width: header.width ? `${header.width}%` : '' }"
          >
            <slot
              :name="`header-${header.key}`"
              :header="header"
            > {{ header.label }} </slot>
          </th>
        </tr>
      </thead>
      <tbody :style="{ maxHeight: maxHeight }">
        <template v-if="data.length <= 0">
          <tr>
            <td
              :colspan="headers.length"
              class="tw:text-center"
            >
              <slot name="no-data">No Data Found</slot>
            </td>
          </tr>
        </template>
        <template v-else>
          <tr
            v-for="(d, index) in data"
            :key="index"
          >
            <template
              v-for="(header, i) in headers"
              :key="i"
            >
              <td>
                <template v-if="!hasNamedSlot(header.key)">
                  {{ d[header.key] }}
                </template>
                <slot
                  v-else
                  :name="header.key"
                  :row="d"
                  :index="index"
                ></slot>
              </td>
            </template>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
import { useSlots } from 'vue';

export default {
  name: 'ITable',
  props: {
    fixedHeader: Boolean,
    maxHeight: {
      type: String,
      default: ""
    },
    data: Array,
    headers: {
      type: Array,
      validator(value) {
        return value.every((v) => {
          if (v.key != undefined && v.label != undefined) {
            return true;
          }
        });
      },
    },
  },
  setup() {
    const slot = useSlots();
    const hasNamedSlot = (slotName) => {
      return !!slot[slotName];
    };
    return { hasNamedSlot };
  },
};
</script>

<style>
@reference "@/assets/global.css";

.i-table {
  @apply tw:w-full tw:border-separate tw:border-spacing-0 tw:border tw:border-(--gray-500) tw:rounded-[8px];
  table-layout: fixed;

  tbody tr:hover,
  tbody tr:has(> td .selected) {
    @apply tw:bg-(--gray-100);
  }

  thead tr th,
  tbody tr td {
    @apply tw:border-b tw:border-b-(--gray-500) tw:py-3 tw:px-2.5;
    word-wrap: break-word;
  }

  thead tr th {
    @apply tw:py-4 tw:text-left;
  }

  tbody tr:last-child td {
    @apply tw:border-b-0;
  }
}

.fixed-header {
  tbody {
    display: block;
    overflow-y: auto;
    width: 100%;
  }

  thead,
  tbody tr {
    display: table;
    width: 100%;
    table-layout: fixed;
  }
}
</style>
