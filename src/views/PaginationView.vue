<template>
  <div>
    <!-- Only one page -->
    <div class="tw:mb-12">
      <div class="tw:font-bold tw:bg-yellow-800 tw:text-xl">Only one Page</div>
      <div class="tw:mt-6">
        <i-pagination
          :current-page="1"
          :page-size="10"
          :total-page="1"
        />
      </div>
    </div>

    <!-- Five size page with count page information -->
    <div class="tw:mb-12">
      <div class="tw:font-bold tw:bg-yellow-800 tw:text-xl">Five size page with count page information</div>
      <div class="tw:mt-6">
        <i-pagination
          show-count-page
          :current-page="1"
          :page-size="2"
          :total-page="10"
          @change="onPageChange"
        />
      </div>
      <div class="tw:mt-6 tw:flex tw:justify-end">
        result change emit: {{ numberPage }}
      </div>
    </div>

    <!-- More than five size page with count page information -->
    <div class="tw:mb-12">
      <div class="tw:font-bold tw:bg-yellow-800 tw:text-xl">More than five size page with count page information</div>
      <div class="tw:mt-6">
        <i-pagination
          show-count-page
          :current-page="1"
          :page-size="2"
          :total-page="12"
        />
      </div>

      <div class="tw:mt-6">
        <i-pagination
          show-count-page
          :current-page="1"
          :page-size="10"
          :total-page="100"
        />
      </div>
    </div>

    <!-- Custom pager count -->
    <div class="tw:mb-12">
      <div class="tw:font-bold tw:bg-yellow-800 tw:text-xl">Custom pager count (10 pager)</div>
      <div class="tw:mt-6">
        <i-pagination
          :current-page="1"
          :page-size="10"
          :total-page="100"
          :pager-count="10"
        />
      </div>

      <div class="tw:mt-6">
        <i-pagination
          :current-page="1"
          :page-size="10"
          :total-page="150"
          :pager-count="10"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

import IPagination from '@/components/i-pagination.vue';

export default {
  components: {
    IPagination
  },
  setup() {
    const numberPage = ref()
    const onPageChange = (page) => {
      numberPage.value = 0
      numberPage.value = page
    }

    return {
      numberPage,
      onPageChange
    }
  }
}
</script>