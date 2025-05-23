<template>
  <div>
    <div class="tw:mb-5">
      <div class="tw:font-bold tw:bg-yellow-800 tw:text-xl">Using v-model</div>
      <div>v-model : {{ sortValue }}</div>
      <i-sort-caret v-model="sortValue" />
    </div>
    <div>
      <div class="tw:font-bold tw:bg-yellow-800 tw:text-xl">
        Using @change + :modelValue <small>(value from computed)</small> + simulasi change route
      </div>
      <div>sortvalue: {{ sortValue2 }}</div>
      <div class="tw:flex tw:gap-10">
        <div>
          sortComputed satu : {{ sortComputed.satu }}
          <div>
            <i-sort-caret
              :modelValue="sortComputed.satu"
              @change="(value) => onToggleSort('satu', value)"
            />
          </div>
        </div>
        <div>
          sortComputed dua : {{ sortComputed.dua }}
          <div>
            <i-sort-caret
              :modelValue="sortComputed.dua"
              @change="(value) => onToggleSort('dua', value)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

import ISortCaret from '@/components/i-sort-caret.vue';

export default {
  components: {
    ISortCaret,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();

    const sortValue = ref(undefined);
    const sortValue2 = ref([]);

    const sortComputed = computed(() => {
      const activeSort = {};
      sortValue2.value.forEach(({ key, direction }) => {
        activeSort[key] = direction;
      });

      return activeSort;
    });
    const updateRoute = () => {
      const routeObject = {
        query: {
          sort: sortValue2.value.map((sort) => `${sort.key}:${sort.direction}`).join(','),
        },
      };
      router.push(routeObject);
    };

    const onToggleSort = (key, direction) => {
      const updatedSort = sortValue2.value.map((v) => ({
        key: v.key,
        direction: v.direction,
      }));

      const matchIndex = sortValue2.value.findIndex((sort) => sort.key === key);
      if (matchIndex === -1) {
        updatedSort.push({
          key,
          direction,
        });
      } else if (direction) {
        updatedSort[matchIndex].direction = direction;
      } else {
        updatedSort.splice(matchIndex, 1);
      }

      sortValue2.value = updatedSort;
      updateRoute();
    };

    onMounted(() => {
      const sortArray = [];
      const { sort } = route.query;

      if (sort) {
        sort.split(',').forEach((v) => {
          const [key, direction] = v.split(':');
          if (key && direction) {
            sortArray.push({
              key,
              direction,
            });
          }
        });
        sortValue2.value = sortArray;
      }
    });
    return {
      sortValue,
      sortValue2,
      sortComputed,
      onToggleSort,
    };
  },
};
</script>
