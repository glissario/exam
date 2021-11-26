<template>
  <div class="question-detail-wrapper" v-if="actualQuestion">
    <h3>
      {{ this.actualQuestion.question }}
    </h3>
    <ol class="description-list">
      <li
        v-for="(desc, index) in this.actualQuestion.description"
        :key="index"
        class="description-list-element"
      >
        {{ desc }}
      </li>
    </ol>
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
    },
  },
};
</script>

<style lang="scss" scoped>
.question-detail-wrapper {
  color: var(--font-color);
  width: 80%;
  margin: 1rem auto;
  border: 1px solid var(--font-color);
  h3 {
    hyphens: auto;
  }
  @media screen and (max-width: 600px) {
    h3 {
      font-size: 1.1rem;
    }
  }

  .description-list {
    width: 75%;
    margin: 1rem auto;
  }
  @media screen and (max-width: 600px) {
    .description-list {
      width: 95%;
    }
  }
  .description-list-element {
    text-align: left;
  }

  .p-button-secondary {
    background-color: var(--font-color);
  }
  .p-button:hover {
    background-color: var(--white-color);
    color: var(--font-color);
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
