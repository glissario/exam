<template>
  <div class="question-list-wrapper" v-if="this.$store.state.actualModule">
    <h2>{{ this.actualModule.label }}</h2>
    <div class="list-wrapper">
      <ul>
        <Button
          v-for="(question, index) in actualQuestions"
          :key="index"
          :actualQuestion="question"
          @click="routeToQuestion(question)"
          class="p-button-outlined"
        >
          {{ question.question }}
        </Button>
      </ul>
    </div>
    <router-view />
  </div>
</template>

<script>
import { collection, getDocs } from "firebase/firestore";
import firestore from "@/firestore.js";
import Button from "primevue/button";

export default {
  components: { Button },
  data() {
    return {
      allQuestions: [],
    };
  },
  computed: {
    actualModule() {
      return this.$store.state.actualModule;
    },
    actualQuestions() {
      this.getAllQuestions();
      return this.allQuestions;
    },
  },
  methods: {
    async getAllQuestions() {
      this.allQuestions = [];
      const docSnap = await getDocs(
        collection(firestore, "moduls", this.actualModule.label, "questions")
      );

      docSnap.forEach((doc) => {
        this.allQuestions.push(doc.data());
      });
    },
    routeToQuestion(question) {
      this.$store.state.actualQuestion = question;
      console.log(question);
      this.$router.push({
        name: "QuestionDetails",
        params: {
          question: question,
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.question-list-wrapper {
  color: #300044;
  min-height: 10rem;
  width: 80%;
  h2 {
    text-align: center;
    width: 100%;
  }
  .list-wrapper {
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    ul {
      padding: 0;
      margin: 0;
      width: 100%;
      display: flex;
      align-items: center;
      flex-direction: column;
      padding-bottom: 2rem;
    }

    .p-button {
      margin: 0.35rem 0;
      width: 80%;
      color: var(--font-color);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .p-button:hover {
      color: var(--white-color);
      background-color: var(--background-color);
    }
  }
}
</style>
