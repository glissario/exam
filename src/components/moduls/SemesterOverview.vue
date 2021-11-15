<template>
  <div class="semester-overview-wrapper">
    <h2>{{ actualSemester.label }}</h2>
    <p>Folgende Module werden geprüft:</p>
    <div class="buttonwrapper">
      <Button
        @click="routeToQuestions"
        v-for="(modul, index) in actualSemester.children"
        :key="index"
        class="p-button-outlined"
      >
        {{ modul.label }}
      </Button>
    </div>
  </div>
</template>

<script>
import Button from "primevue/button";
export default {
  components: { Button },
  data() {
    return {
      semesterModule: {},
    };
  },
  computed: {
    actualSemester() {
      return this.$store.state.actualSemester;
    },
  },
  methods: {
    routeToQuestions() {
      for (let i = 0; i < this.actualSemester.children.length; i++) {
        if (event.target.innerText === this.actualSemester.children[i].label) {
          this.$store.state.actualModule = this.actualSemester.children[i];
          this.$router.push({ name: "QuestionOverview" });
          return;
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.semester-overview-wrapper {
  min-height: 10rem;
  color: var(--font-color);
  padding-bottom: 2rem;
  .buttonwrapper {
    display: flex;
    align-items: center;
    flex-direction: column;

    .p-button {
      color: var(--secondary-color);
      margin: 0.35rem 0;
      width: 75%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .p-button:hover {
      color: black;
    }
  }
}
</style>
