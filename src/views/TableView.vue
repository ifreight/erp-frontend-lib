<template>
  <div>
    <div class="tw:mb-2">
      <p class="tw:mb-1 tw:mt-1">Simple table example</p>
      <i-table :data="shuffleData(data)" :headers="header1"></i-table>
    </div>
    <div class="tw:mb-2">
      <p class="tw:mb-1 tw:mt-1">
        Customize Header and Data column table example, to add selected effect on row add css class
        `selected` on template
      </p>
      <br />
      <span class="tw:bg-red-400 tw:text-white">selected id : {{ selectedRow }}</span>
      <i-table :data="shuffleData(data)" :headers="header2">
        <template v-slot:header-no>
          <div><i-checkbox name="selectAll" v-model="checkAll" @change="checkAllHandler" /></div>
        </template>
        <template v-slot:no="{ row }">
          <div :class="selectedRow.includes(row.id) ? 'selected' : ''">
            <i-checkbox
              :name="`select${row.id}`"
              v-model="row.isChecked"
              @change="
                (e, val) => {
                  checkboxChangeHandler(val, row.id);
                }
              "
            ></i-checkbox>
          </div>
        </template>
        <template v-slot:action="{ row }">
          <div class="tw:flex tw:justify-evenly tw:gap-2 tw:w-1/5">
            <i-button @click="actionButtonAdd(row)">Add</i-button>
            <i-button @click="actionButtonDelete(row)">Delete</i-button>
          </div>
        </template>
      </i-table>
    </div>
    <div class="tw:mb-2">
      <p class="tw:mb-1 tw:mt-1">
        Example with column width (if width 0 or unknown column width will be auto) table example
      </p>
      <i-table :data="shuffleData(data)" :headers="header3">
        <template #header-name>
          <div class="tw:flex tw:gap-1 tw:justify-start tw:align-middle">
            <span class="tw:self-center">Name</span>
            <span class="tw:self-center tw:flex tw:flex-col tw:cursor-pointer" @click="sortAction">
              <ic-chevrons-vertical-up-down class="tw:w-fit"></ic-chevrons-vertical-up-down>
            </span>
            <div class="tw:self-center tw:flex tw:flex-col tw:cursor-pointer tw:relative">
              <ic-filter-bars @click="visibleDropdown = !visibleDropdown" />
              <i-dropdown v-model:visible="visibleDropdown">halo</i-dropdown>
            </div>
          </div>
        </template>
        <template #no="{ index }">{{ index + 1 }}</template>
        <template #name="{ row }">{{ `${row.firstName} ${row.lastName}` }}</template>
      </i-table>
    </div>
    <div class="tw:mb-2">
      <p class="tw:mb-1 tw:mt-1">No Data table example</p>
      <i-table :data="[]" :headers="header3"></i-table>
    </div>
    <div class="tw:mb-2">
      <p class="tw:mb-1 tw:mt-1">No Data table with custom slot example</p>
      <i-table :data="[]" :headers="header3">
        <template #no-data> Data tidak ditemukan </template>
      </i-table>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import ITable from '@/components/i-table.vue';
import ICheckbox from '@/components/checkbox/i-checkbox.vue';
import IButton from '@/components/i-button.vue';
import IDropdown from '@/components/dropdown/i-dropdown.vue';

import IcChevronsVerticalUpDown from '@/icons/ic-chevrons-vertical-up-down.vue';
import IcFilterBars from '@/icons/ic-filter-bars.vue';

export default {
  components: { ITable, ICheckbox, IButton, IDropdown, IcChevronsVerticalUpDown, IcFilterBars },
  setup() {
    const visibleDropdown = ref(false);
    const data = ref([
      {
        id: 1,
        firstName: 'Dolf',
        lastName: 'Bibb',
        email: 'dbibb0@boston.com',
        gender: 'Male',
        ipAddress: '251.112.142.229',
        isChecked: true,
      },
      {
        id: 2,
        firstName: 'Addison',
        lastName: 'Bradneck',
        email: 'abradneck1@deliciousdays.com',
        gender: 'Male',
        ipAddress: '175.123.105.192',
        isChecked: false,
      },
      {
        id: 3,
        firstName: 'Harriett',
        lastName: 'Devinn',
        email: 'hdevinn2@oakley.com',
        gender: 'Female',
        ipAddress: '181.215.118.170',
        isChecked: false,
      },
      {
        id: 4,
        firstName: 'Shepard',
        lastName: 'Grimsdith',
        email: 'sgrimsdith3@sitemeter.com',
        gender: 'Male',
        ipAddress: '203.132.44.39',
        isChecked: false,
      },
      {
        id: 5,
        firstName: 'Dicky',
        lastName: 'Matchitt',
        email: 'dmatchitt4@earthlink.net',
        gender: 'Male',
        ipAddress: '167.154.48.255',
        isChecked: false,
      },
      {
        id: 6,
        firstName: 'Conant',
        lastName: 'Thunnercliff',
        email: 'cthunnercliff5@techcrunch.com',
        gender: 'Male',
        ipAddress: '224.122.144.162',
        isChecked: false,
      },
      {
        id: 7,
        firstName: 'Tawnya',
        lastName: 'Lorkings',
        email: 'tlorkings6@stumbleupon.com',
        gender: 'Female',
        ipAddress: '175.2.49.75',
        isChecked: false,
      },
      {
        id: 8,
        firstName: 'Grover',
        lastName: 'Proctor',
        email: 'gproctor7@tiny.cc',
        gender: 'Male',
        ipAddress: '179.132.196.149',
        isChecked: false,
      },
      {
        id: 9,
        firstName: 'Donni',
        lastName: 'Deeman',
        email: 'ddeeman8@loc.gov',
        gender: 'Female',
        ipAddress: '228.110.41.29',
        isChecked: false,
      },
      {
        id: 10,
        firstName: 'Rebe',
        lastName: 'Caulcutt',
        email: 'rcaulcutt9@ycombinator.com',
        gender: 'Male',
        ipAddress: '154.182.216.241',
        isChecked: false,
      },
    ]);
    const header1 = ref([
      {
        key: 'id',
        label: 'User ID',
      },
      {
        key: 'firstName',
        label: 'First Name',
      },
      {
        key: 'lastName',
        label: 'Last Name',
      },
      {
        key: 'email',
        label: 'Email',
      },
    ]);
    const header2 = ref([
      {
        key: 'no',
        label: 'No',
      },
      {
        key: 'firstName',
        label: 'First Name',
      },
      {
        key: 'lastName',
        label: 'Last Name',
      },
      {
        key: 'ipAddress',
        label: 'IP Address',
        width: 15,
      },
      {
        key: 'action',
        label: '',
      },
    ]);
    const header3 = ref([
      {
        key: 'no',
        label: 'No',
        width: 5,
      },
      {
        key: 'name',
        label: 'Name',
      },
      {
        key: 'email',
        label: 'Email',
      },
    ]);

    const checkAll = ref(false);
    let selectedRow = ref([]);

    const shuffleData = (item) => {
      const arr = [];
      const pool = item.map((item) => item);
      for (let i = 0; i < 10; i++) {
        const j = Math.floor(Math.random() * (pool.length - 0) + 0);
        arr.push(pool[j]);
        pool[j] = pool[pool.length - 1];
        pool.splice(pool.length - 1);
      }
      return arr;
    };

    const actionButtonAdd = (row) => {
      window.alert(`Clicked button add for ${row.firstName} - ${row.ipAddress}`);
    };
    const actionButtonDelete = (row) => {
      window.alert(`Clicked button delete for ${row.firstName} - ${row.id}`);
    };
    const sortAction = () => {
      window.alert('clicked sort');
    };
    const checkAllHandler = (event, val) => {
      data.value = data.value.map((item) => {
        return {
          ...item,
          isChecked: val,
        };
      });
      selectedRow.value = data.value.filter((a) => a.isChecked).map((y) => y.id);
    };
    const checkboxChangeHandler = (val, id) => {
      if (val) {
        selectedRow.value.push(id);
      } else {
        selectedRow.value = selectedRow.value.filter((val) => val !== id);
      }
    };
    onMounted(() => {
      selectedRow.value = data.value.filter((a) => a.isChecked).map((y) => y.id);
    });
    return {
      visibleDropdown,
      data,
      header1,
      header2,
      header3,
      selectedRow,
      shuffleData,
      actionButtonAdd,
      actionButtonDelete,
      sortAction,
      checkAll,
      checkAllHandler,
      checkboxChangeHandler,
    };
  },
};
</script>
