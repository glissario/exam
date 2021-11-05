<template>
  <div class="question-form">
    <label for="question">Frage: </label>
    <InputText id="question" type="text" aria-describedby="username1-help" />

    <label for="description">Beschreibung: </label>
    <InputText id="description" type="text" />

    <div class="keyword-wrapper" v-for="index in amoutOfKeywords" :key="index">
      <label for="keyword">Schlüsselwort: </label>
      <InputText id="keyword" type="text" />
    </div>

    <label for="keyword">neues Schlüsselwort? </label>
    <div>
      <Button @click="addKeyword">
        <i class="pi pi-plus-circle" size="2rem"></i>
      </Button>
      <Button @click="removeKeyword">
        <i class="pi pi-minus-circle" size="2rem"></i>
      </Button>
    </div>
  </div>
  <Button>Absenden </Button>
</template>

<script>
import InputText from "primevue/inputtext";

import Button from "primevue/button";

export default {
  components: { InputText, Button },
  data() {
    return {
      amoutOfKeywords: 1,
    };
  },

  methods: {
    addKeyword() {
      this.amoutOfKeywords++;
    },
    removeKeyword() {
      return this.amoutOfKeywords > 0
        ? this.amoutOfKeywords--
        : this.amoutOfKeywords;
    },
  },
};
</script>

<style lang="scss" scoped>
.question-form {
  display: grid;
  grid-template-columns: 1fr 3fr;
  margin-bottom: 2rem;
  .keyword-wrapper {
    grid-column: 1/3;
    display: grid;
    grid-template-columns: 1fr 3fr;
  }
}
</style>
