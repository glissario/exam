<template>
  <li class="internship-details">
    <h3 @click="showDetails = !showDetails">
      {{ internship.speciality + ": " + internship.employer }}
    </h3>
    <p>Kontakt über {{ internship.contact }}</p>
  </li>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import InternshipModel from "./internship.model";
export default defineComponent({
  name: "InternshipDetails",
  data() {
    return {
      showDetails: false,
    };
  },
  props: {
    internship: {
      type: Object as () => InternshipModel,
      required: true,
    },
    author: {
      type: String,
      required: false,
    },
  },
});
</script>

<style lang="scss" scoped>
.internship-details {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  list-style: none;
  border: 1px solid var(--background-color);
}
</style>
