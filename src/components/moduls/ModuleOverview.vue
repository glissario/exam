<template>
  <div class="content-wrapper">
    <div class="action-wrapper">
      <TreeSelect
        @change="changeRoute"
        v-model="selectedModule"
        :options="nodes"
        placeholder="Wähle ein Modul"
      />
      <InputText
        type="text"
        v-model="keyword"
        class="keyword-search"
        placeholder="Oder suche ein Schlüsselwort"
        @keyup.enter="getKeywordQuestions"
      />
    </div>
    <h2 v-if="actualKeyword">{{ actualKeyword }}</h2>
    <div class="list-wrapper" v-if="searchedQuestions.length > 0">
      <ul>
        <Button
          v-for="(question, index) in searchedQuestions"
          :key="index"
          class="p-button-outlined"
          @click="routeToQuestion(question)"
        >
          {{ question.question }}
        </Button>
      </ul>
    </div>
    <router-view />
  </div>
</template>

<script>
import moduls from "./modulePlan.json";
import { collection, getDocs, where, query } from "firebase/firestore";
import firestore from "@/firestore.js";

import TreeSelect from "primevue/treeselect";
import InputText from "primevue/inputtext";
import Button from "primevue/button";

export default {
  components: { TreeSelect, InputText, Button },
  data() {
    return {
      selectedModule: null,
      allModules: [],
      searchedQuestions: [],
      semester: null,
      nodes: null,
      moduls,
      keyword: "",
      actualKeyword: "",
    };
  },
  computed: {
    actualModule() {
      return this.$store.state.actualModule;
    },
    actualSemester() {
      return this.$store.state.actualSemester;
    },
  },

  mounted() {
    this.nodes = this.moduls.root;
  },
  watcher: {},
  methods: {
    changeRoute() {
      this.$router.push({ name: "Moduls" });
      this.$store.state.actualSemester = this.filteredSemester();
      this.searchedQuestions = [];
      this.actualKeyword = "";
      if (
        this.$store.state.actualSemester != null &&
        this.$store.state.actualSemester.key.length > 5
      ) {
        this.$router.push({ name: "SemesterOverview" });
        this.$store.state.actualQuestion = null;
      } else {
        for (let i = 0; i < this.nodes.length; i++) {
          if (this.nodes[i].children.length > 0) {
            for (let j = 0; j < this.nodes[i].children.length; j++) {
              if (
                Object.keys(this.selectedModule)[0].toString() ==
                this.nodes[i].children[j].key.toString()
              ) {
                this.$store.state.actualModule = this.nodes[i].children[j];
                this.$router.push({ name: "QuestionOverview" });
                this.$store.state.actualQuestion = null;
                return;
              }
            }
          }
        }
      }
    },
    filteredSemester() {
      if (this.selectedModule !== null) {
        this.semester = this.nodes.find((node) => {
          return node.key == Object.keys(this.selectedModule)[0].toString();
        });
        return this.semester;
      } else {
        return null;
      }
    },
    async getKeywordQuestions() {
      this.$router.push({ name: "Moduls" });
      this.actualKeyword = this.keyword;
      this.$store.state.actualModule = null;
      this.$store.state.actualQuestion = null;
      this.searchedQuestions = [];
      this.allModules = [];

      this.getAllModules();
      for (let i = 0; i < this.allModules.length; i++) {
        const docSnap = collection(
          firestore,
          "moduls",
          this.allModules[i],
          "questions"
        );
        const q = query(docSnap, where("modul", "==", this.allModules[i]));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          if (doc.data().keyword.includes(this.keyword)) {
            this.searchedQuestions.push(doc.data());
          }
        });
      }
      this.keyword = "";
    },

    getAllModules() {
      if (this.moduls.root.length > 0) {
        for (let i = 0; i < this.moduls.root.length; i++) {
          if (this.moduls.root[i].children.length > 0) {
            for (let j = 0; j < this.moduls.root[i].children.length; j++) {
              this.allModules.push(this.moduls.root[i].children[j].label);
            }
          }
        }
      }
      return this.allModules;
    },
    routeToQuestion(question) {
      this.$store.state.actualQuestion = question;
      this.$router.push({
        name: "SearchQuestionDetails",
        params: {
          question: question.question,
        },
      });
    },
  },
};
</script>

<style lang="scss">
.content-wrapper {
  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction: column;
  min-height: 10rem;
  margin-top: 0.5rem;
  width: 100%;
  .action-wrapper {
    display: flex;
    flex-direction: column;
    width: 80%;
    .keyword-search {
      margin: 0;
      margin-top: 1rem;
      width: 100%;
    }
  }
  .list-wrapper {
    width: 100%;
    display: flex;
    align-items: start;
    justify-content: center;
    ul {
      padding: 0;
      margin: 0;
      width: 80%;
      display: flex;
      align-items: center;
      flex-direction: column;
      padding-bottom: 2rem;
    }
    .p-button {
      margin: 0.35rem 0;
      width: 100%;
      color: var(--secondary-color);
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
@media screen and (max-width: 600px) {
  .content-wrapper {
    .action-wrapper {
      flex-direction: column;
      .keyword-search {
        margin-left: 0rem;
      }
    }
  }
}
</style>
