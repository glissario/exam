<template>
  <div class="question-list-wrapper">
    <h2>{{ this.actualModule.label }}</h2>
    <div class="list-wrapper" v-if="allQuestions.length > 0">
      <ul>
        <Button
          v-for="(question, index) in allQuestions"
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
  async created() {
    const docSnap = await getDocs(
      collection(firestore, "moduls", this.actualModule.label, "questions")
    );
    console.log(typeof docSnap);
    docSnap.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      this.allQuestions.push(doc.data());
    });
    console.log(this.allQuestions);
  },
  computed: {
    actualModule() {
      return this.$store.state.actualModule;
    },
  },
  methods: {
    routeToQuestion(question) {
      console.log(question);
      this.$store.state.actualQuestion = question;
      this.$router.push({
        name: "QuestionDetails",
        params: {
          question: question.question,
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
  ul {
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-bottom: 2rem;
  }

  .p-button {
    margin: 0.35rem 0;
    width: 80%;
    color: var(--secondary-color);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .p-button:hover {
    color: var(--white-color);
    background-color: var(--background-color);
  }
}
</style>
