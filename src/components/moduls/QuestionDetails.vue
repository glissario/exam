<template>
  <div class="question-detail-wrapper">
    <h3>
      {{ this.actualQuestion.question }}
    </h3>
    <p>{{ this.actualQuestion.description }}</p>
    <Button @click="showDetails" class="p-button-secondary">
      {{ keywordButtonText }}
    </Button>
    <ul v-if="showKeys">
      <li v-for="(keyword, index) in this.actualQuestion.keyword" :key="index">
        {{ keyword }}
      </li>
    </ul>
    <div v-if="actualQuestion.author" class="author-wrapper">
      <div></div>
      <p>{{ "von " + actualQuestion.author }}</p>
    </div>
  </div>
</template>

<script>
import Button from "primevue/button";

export default {
  components: { Button },
  data() {
    return {
      showKeys: false,
    };
  },
  computed: {
    actualQuestion() {
      return this.$store.state.actualQuestion;
    },
    keywordButtonText() {
      return this.showKeys
        ? "verstecke Schlüsselwörter"
        : "zeige Schlüsselwörter";
    },
  },
  props: {
    question: null,
  },
  methods: {
    showDetails() {
      this.showKeys = !this.showKeys;
      console.log(this.actualQuestion.keyword);
    },
  },
};
</script>

<style lang="scss" scoped>
.question-detail-wrapper {
  color: var(--secondary-color);
  width: 80%;
  margin: 1rem auto;
  border: 1px solid var(--secondary-color);
  .p-button-secondary {
    background-color: var(--secondary-color);
  }
  .p-button:hover {
    background-color: var(--white-color);
    color: var(--secondary-color);
  }
  ul {
    padding: 0;
  }
  li {
    list-style: none;
    padding: 0.25rem 0;
  }
  .author-wrapper {
    display: flex;
    flex-direction: row-reverse;
    p {
      color: var(--third-color);
      width: 25%;
    }
  }
}
</style>
