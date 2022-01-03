<script>
import { getImgUrl } from "../utils/util";
import { ref, onMounted } from "vue";

export default {
  props: ["model", "id", "label", "inputValue"],

  setup() {
    const isChecked = ref(null);

    onMounted(() => {
      // the DOM element will be assigned to the ref after initial render
      console.log(isChecked.value); // <div>This is a root element</div>
    });

    return {
      isChecked,
    };
  },
  computed: {
    classes() {
      if (this.$refs.isChecked.checked) {
        return `rounded-full p-2 border border-${this.inputValue}`;
      }

      return "rounded-full p-2 border border-gray-500";
    },
  },
  methods: {
    getImgUrl,
    handleChange(val) {
      if (this.$refs.isChecked.checked) {
        this.model.push(val);
        return;
      }
      let index = this.model.indexOf(val);
      this.model.splice(index, 1);
    },
  },
  computed: {
    console: () => console,
    window: () => window,
  },
};
</script>
<template>
  <label
    :for="id"
    class="rounded-full border cursor-pointer"
    :class="{
      [`border-green-500 bg-green-300`]: isChecked && isChecked.checked,
      [`border-gray-300`]: isChecked && !isChecked.checked,
    }"
  >
    <input
      class="hidden"
      ref="isChecked"
      type="checkbox"
      :value="inputValue"
      :id="id"
      :checked="model.includes(inputValue)"
      @change="() => handleChange(inputValue)"
    />
    <img :src="getImgUrl(inputValue, `..`)" class="w-12 p-2" />
  </label>
</template>
