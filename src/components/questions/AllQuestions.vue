<template>
  <h2>All Questions</h2>

  <Button
    @click="routeToQuestions(modul)"
    v-for="(modul, index) in allQuestions"
    :key="index"
    class="p-button-outlined"
  >
    {{ modul.question }}
  </Button>

  <QuestionDetails v-if="this.$store.state.actualQuestion" />
</template>

<script>
import { collection, getDocs } from "firebase/firestore";
import Button from "primevue/button";
import firestore from "@/firestore.js";
import moduls from "@/components/moduls/modulePlan.json";
import QuestionDetails from "@/components/questions/QuestionDetails.vue";

export default {
  components: { QuestionDetails, Button },
  data() {
    return {
      allQuestions: [],
      allModuls: [],
    };
  },
  async created() {
    for (let i = 0; i < moduls.root.length; i++) {
      for (let j = 0; j < moduls.root[i].children.length; j++) {
        this.allModuls.push(moduls.root[i].children[j].label);
      }
    }

    for (let i = 0; i < this.allModuls.length; i++) {
      const docSnap = await getDocs(
        collection(firestore, "moduls", this.allModuls[i], "questions")
      );
      //const docSnap1 = await listCollections(collection(firestore, "moduls"));
      docSnap.forEach((doc) => {
        this.allQuestions.push(doc.data());
      });
    }
  },
  methods: {
    routeToQuestions(modul) {
      this.$store.state.actualQuestion = modul;
    },
  },
};
</script>
