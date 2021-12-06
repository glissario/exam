<template>
  <li class="literature-details">
    <h3 @click="showDetails = !showDetails">{{ title }}</h3>
    <p v-if="showDetails">{{ details }}</p>
    <div class="author-wrapper">
      <p v-if="showDetails" class="author">{{ author }}</p>
    </div>
  </li>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "LiteratureDetails",
  data() {
    return {
      showDetails: false,
    };
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.literature-details {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  list-style: none;
  border: 1px solid var(--background-color);

  .author-wrapper {
    display: flex;
    flex-direction: row-reverse;
    width: 100%;
    p {
      color: var(--third-color);
      width: 25%;
    }
  }
}
</style>
