<template>
  <h2>All Questions</h2>
  <ul>
    <li v-for="(question, index) in allQuestions" :key="index">
      {{ question.question }}
    </li>
  </ul>
</template>

<script>
import { collection, getDocs, listCollections } from "firebase/firestore";
import firestore from "@/firestore.js";
import moduls from "@/components/moduls/modulePlan.json";

export default {
  data() {
    return {
      allQuestions: [],
      allModuls: [],
    };
  },
  async created() {
    console.log(moduls.root);
    for (let i = 0; i < moduls.root.length; i++) {
      for (let j = 0; j < moduls.root[i].children.length; j++) {
        this.allModuls.push(moduls.root[i].children[j].label);
      }
    }
    console.log(this.allModuls[0]);
    for (let i = 0; i < this.allModuls.length; i++) {
      const docSnap = await getDocs(
        collection(firestore, "moduls", this.allModuls[i], "questions")
      );
      //const docSnap1 = await listCollections(collection(firestore, "moduls"));
      docSnap.forEach((doc) => {
        this.allQuestions.push(doc.data());
      });
    }
    console.log(this.allQuestions);
  },
};
</script>
