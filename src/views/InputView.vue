<template>
  <div class="container-input-view">
    <div class="row">
      <form
        class="field"
        @submit.prevent="submitHandler"
      >
        <div class="input-label">Normal + clearable + form example</div>
        <div class="input-v-model">
          <span class="tw:text-red-400 tw:ml-1">
            v-model:
            <span v-if="input1 === null">ini null</span>
            <span v-else>{{ !input1 ? 'empty bkn null' : `${input1}` }}</span>
          </span>
        </div>
        <i-input
          v-model="input1"
          input-id="Text1"
          name="text"
          class="tw:flex-1 tw:mb-2"
          clearable
          placeholder="max 3"
        />
      </form>
      <div class="field">
        <div class="input-label">
          Normal + clearable + height 48px (not null when empty isNullWhenEmpty: false)
        </div>
        <div class="input-v-model">
          <span class="tw:text-red-400 tw:ml-1">
            v-model:
            <span v-if="input10 === null">ini null</span>
            <span v-else>{{ !input10 ? 'empty bkn null' : `${input10}` }}</span>
          </span>
        </div>
        <i-input
          v-model="input10"
          input-id="Text10"
          name="text"
          class="tw:flex-1 tw:mb-2"
          clearable
          placeholder="max 3"
          height="48px"
          :isNullWhenEmpty="false"
        />
      </div>
    </div>
    <div class="row">
      <div class="field">
        <div class="input-label">Contoh Invalid</div>
        <div class="input-v-model">
          <span class="tw:text-red-400 tw:ml-1">
            v-model:
            <span v-if="input2 === null">ini null</span>
            <span v-else>{{ !input2 ? 'empty bkn null' : `${input2}` }}</span>
          </span>
        </div>
        <i-input
          v-model="input2"
          input-id="Text2"
          name="text"
          class="tw:flex-1 tw:mb-2"
          :invalid="true"
          errorMessage="Error Message"
        />
      </div>
      <div class="field">
        <div class="input-label">Disabled</div>
        <div class="input-v-model">v-model: {{ input3 }}</div>
        <i-input
          v-model="input3"
          input-id="Text3"
          name="text"
          class="tw:flex-1 tw:mb-2"
          :disabled="true"
          placeholder="disabled placholder"
        />
      </div>
    </div>
    <div class="row">
      <div class="field">
        <div class="input-label">Prepend, append and max length</div>
        <div class="input-v-model">
          <span class="tw:text-red-400 tw:ml-1">
            v-model:
            <span v-if="input4 === null">ini null</span>
            <span v-else>{{ !input4 ? 'empty bkn null' : `${input4}` }}</span>
          </span>
        </div>
        <i-input
          v-model="input4"
          input-id="Text4"
          name="text"
          class="tw:flex-1 tw:mb-2"
          clearable
          :maxlength="3"
          placeholder="placeholder max 3"
        >
          <template #prepend><ic-calendar /></template>
          <template #append><ic-calendar /></template>
        </i-input>
      </div>
      <div class="field">
        <div class="input-label">Prepend / append i-select</div>
        <div class="input-v-model">
          <span class="tw:text-red-400 tw:ml-1">
            v-model:
            <span v-if="input4 === null">ini null</span>
            <span v-else>{{ !input4 ? 'empty bkn null' : `${input4}` }}</span>
          </span>
        </div>
        <i-input
          v-model="input12"
          input-id="Text12"
          name="text"
          class="tw:flex-1 tw:mb-2"
          clearable
          placeholder="With select Prepend"
        >
          <template #prepend>
            <i-select
              class="tw:w-[82px]"
              input-id="Select1"
              name="select1"
              v-model="selectModel"
              :options="selOptions"
            />
          </template>
        </i-input>
        <i-input
          v-model="input12"
          input-id="Text123"
          name="text"
          class="tw:flex-1 tw:mb-2"
          clearable
          placeholder="With select Prepend"
          invalid
        >
          <template #append>
            <i-select
              class="tw:w-[82px]"
              input-id="Select2"
              name="select2"
              v-model="selectModel"
              :options="selOptions"
            />
          </template>
        </i-input>
      </div>
    </div>
    <div class="row">
      <div class="field">
        <div class="input-label">Borderless + password type</div>
        <div class="input-v-model">
          <span class="tw:text-red-400 tw:ml-1">
            v-model:
            <span v-if="input5 === null">ini null</span>
            <span v-else>{{ !input5 ? 'empty bkn null' : `${input5}` }}</span>
          </span>
        </div>
        <i-input
          v-model="input5"
          input-id="Text5"
          name="text"
          class="tw:flex-1 tw:mb-2"
          clearable
          type="password"
          borderless
        />
      </div>
      <div class="field">
        <div class="input-label">
          Number type + rounded (default/xs 2px, sm 4px, lg 8px, xl 12px)
        </div>
        <div class="input-v-model">
          <span class="tw:text-red-400 tw:ml-1">
            v-model:
            <span v-if="input7 === null">ini null</span>
            <span v-else>{{ !input7 ? 'empty bkn null' : `${input7}` }}</span>
          </span>
        </div>
        <i-input
          v-model="input7"
          input-id="Text7"
          name="text"
          class="tw:flex-1 tw:mb-2"
          clearable
          mask="number"
          rounded="lg"
        />
      </div>
    </div>
    <div class="row">
      <div class="field">
        <div class="input-label">Date type + readonly + size sm + height 32px</div>
        <div class="input-v-model">
          <span class="tw:text-red-400 tw:ml-1">
            v-model:
            <span v-if="input8 === null">ini null</span>
            <span v-else>{{ !input8 ? 'empty bkn null' : `${input8}` }}</span>
          </span>
        </div>
        <i-input
          v-model="input8"
          input-id="Text8"
          name="text"
          class="tw:flex-1 tw:mb-2"
          size="sm"
          height="32px"
          clearable
          readOnly
        />
      </div>
      <div class="field">
        <div class="input-label">readonly datepicker + dropdown</div>
        <div class="input-v-model">
          <span class="tw:text-red-400 tw:ml-1">
            v-model:
            <span v-if="input11 === null">ini null</span>
            <span v-else>{{ !input11 ? 'empty bkn null' : `${input11}` }}</span>
          </span>
        </div>
        <i-input
          v-model="input11"
          input-id="Text11"
          name="text"
          class="tw:flex-1 tw:mb-2"
          readOnly
          clearable
          rounded="lg"
          @click="dateVisible = true"
          @clear="dateExample = []"
        />
        <div class="tw:relative">
          <i-dropdown
            v-model:visible="dateVisible"
            :isShowArrow="false"
            rounded="lg"
            width="720px"
          >
            <i-date-range-picker
              v-model="dateExample"
              @filled="onDateFilledHandler"
            ></i-date-range-picker>
          </i-dropdown>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="field">
        <div class="input-label">Decimal type</div>
        <div class="input-v-model">
          <span class="tw:text-red-400 tw:ml-1">
            v-model:
            <span v-if="input6 === null">ini null</span>
            <span v-else>{{ !input6 ? 'empty bkn null' : `${input6}` }}</span>
          </span>
        </div>
        <i-input
          v-model="input6"
          input-id="Text6"
          name="text"
          class="tw:flex-1 tw:mb-2"
          clearable
          mask="decimal"
        />
      </div>
      <div class="field">
        <div class="input-label">
          Number mask NPWP + rounded (default/xs 2px, sm 4px, lg 8px, xl 12px)
        </div>
        <div class="input-v-model">
          <span class="tw:text-red-400 tw:ml-1">
            v-model:
            <span v-if="input9 === null">ini null</span>
            <span v-else>{{ !input9 ? 'empty bkn null' : `${input9}` }}</span>
          </span>
        </div>
        <i-input
          v-model="input9"
          input-id="Text9"
          name="text"
          class="tw:flex-1 tw:mb-2"
          clearable
          mask="npwp"
          rounded="lg"
        />
      </div>
    </div>
    <div class="row">
      <form
        class="field"
        @submit.prevent="submitHandler"
      >
        <div class="input-label">Uppercase Input</div>
        <div class="input-v-model">
          <span class="tw:text-red-400 tw:ml-1">
            v-model:
            <span v-if="uppercaseInput === null">ini null</span>
            <span v-else>{{ !uppercaseInput ? 'empty bkn null' : `${uppercaseInput}` }}</span>
          </span>
        </div>
        <i-input
          v-model="uppercaseInput"
          input-id="Text1"
          name="text"
          class="tw:flex-1 tw:mb-2"
          clearable
          placeholder="max 3"
          :is-uppercase=true
        />
      </form>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import IInput from '@/components/i-input.vue';
import ISelect from '@/components/i-select.vue';
import IcCalendar from '@/icons/ic-calendar.vue';
import IDropdown from '@/components/dropdown/i-dropdown.vue';
import IDateRangePicker from '@/components/datepicker/i-date-range-picker.vue';

export default {
  components: {
    IInput,
    ISelect,
    IcCalendar,
    IDropdown,
    IDateRangePicker,
  },
  setup() {
    const input1 = ref('999');
    const input2 = ref('');
    const input3 = ref('999');
    const input4 = ref(undefined);
    const input5 = ref('password');
    const input6 = ref(null);
    const input7 = ref(null);
    const input8 = ref(new Date());
    const input9 = ref(null);
    const input10 = ref('');
    const input11 = ref('');
    const input12 = ref(null);
    const uppercaseInput = ref(null);

    const dateVisible = ref(false);
    const dateExample = ref([]);
    const selOptions = ['USD', 'IDR'];
    const selectModel = ref('USD');

    const submitHandler = () => {
      const data = { halo: input1.value };
      alert(data);
    };
    const onDateFilledHandler = (date) => {
      input11.value = date;
      dateVisible.value = false;
    };

    onMounted(() => {
      setTimeout(() => {
        // input6.value = Math.round(123.453 * 100) / 100;
        const x = Math.round(123.453 * 100) / 100;
        console.log(x);
        input6.value = '12000.50';
        // input6.value = Number('12000.50');
      }, 200);
    });

    return {
      input1,
      input2,
      input3,
      input4,
      input5,
      input6,
      input7,
      input8,
      input9,
      input10,
      input11,
      input12,
      uppercaseInput,
      dateVisible,
      dateExample,
      submitHandler,
      onDateFilledHandler,
      selOptions,
      selectModel,
    };
  },
};
</script>

<style>
@reference "@/assets/global.css";

.container-input-view {
  @apply tw:h-full;
  .row {
    @apply tw:flex tw:gap-5 tw:mb-2;
  }
  .field {
    @apply tw:w-1/2;
  }
  .input-label {
    @apply tw:text-xs;
  }
  .input-v-model {
    @apply tw:text-2xs;
  }
}
</style>
