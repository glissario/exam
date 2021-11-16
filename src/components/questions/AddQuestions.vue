<template>
  <div class="question-wrapper">
    <form
      class="question-form"
      v-if="this.$store.state.user.displayName !== null"
    >
      <label for="module">Modul: </label>
      <Dropdown
        v-model="selectedModule"
        id="module"
        :options="semesterOptions"
        optionLabel="label"
        optionGroupLabel="label"
        optionGroupChildren="children"
      />
      <label for="question">Frage: </label>
      <InputText
        v-model="question"
        id="question"
        type="text"
        aria-describedby="username1-help"
      />

      <label for="description">Beschreibung: </label>
      <InputText v-model="description" id="description" type="text" />

      <div
        class="keyword-wrapper"
        v-for="index in amoutOfKeywords"
        :key="index"
        :keyword="'keyword' + index"
      >
        <label for="keyword">Schlüsselwort: </label>
        <InputText v-model="keyword[index - 1]" id="keyword" type="text" />
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
    </form>
    <Button
      v-if="this.$store.state.user.displayName !== null"
      @click="submitQuestion"
      >Absenden
    </Button>
    <div v-if="this.$store.state.user.displayName === null">
      <p>
        Bei Einsicht der Fragen ist der Autor ersichtlich. Hierfür wird ein
        Display-Name benötigt, welcher bei Dir aktuell nicht hinterlegt ist.
        Sobald Du einen anlegst kannst Du Fragen speichern
      </p>
      <div>
        <label for="description">Display-Name: </label>
        <InputText v-model="displayName" id="displayName" type="text" />
      </div>
      <Button
        v-if="this.$store.state.user.displayName === null"
        @click="setDisplayName"
        >Namen eintragen
      </Button>
    </div>
  </div>
</template>

<script>
import InputText from "primevue/inputtext";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { getAuth, updateProfile } from "firebase/auth";

import firestore from "@/firestore.js";
import Dropdown from "primevue/dropdown";
import moduls from "@/components/moduls/modulePlan.json";

import Button from "primevue/button";

export default {
  components: { InputText, Button, Dropdown },
  data() {
    return {
      amoutOfKeywords: 1,
      question: "",
      description: "",
      displayName: "",
      semesterOptions: null,
      selectedModule: null,
      keyword: [],
    };
  },
  created() {
    this.semesterOptions = moduls.root;
  },
  methods: {
    addKeyword() {
      this.amoutOfKeywords++;
      this.keyword.push();
      console.log(this.$store.state.user.displayName);
    },
    removeKeyword() {
      return this.amoutOfKeywords > 1
        ? this.amoutOfKeywords-- && this.keyword.pop()
        : this.amoutOfKeywords;
    },
    setDisplayName() {
      console.log(this.$store.state.user.displayName);
      if (this.displayName.length > 3) {
        const auth = getAuth();

        updateProfile(this.$store.state.user, {
          displayName: this.displayName,
        })
          .then(() => {
            // Profile updated!
            // ...
          })
          .catch((error) => {
            // An error occurred
            // ...
          });
      }
    },
    async submitQuestion() {
      console.log(this.keyword);
      for (let i = 0; i < this.amoutOfKeywords; i++) {
        console.log("test");
      }
      await setDoc(
        doc(
          firestore,
          "moduls",
          this.selectedModule.label,
          "questions",
          this.question
        ),
        {
          modul: this.selectedModule.label,
          question: this.question,
          description: this.description,
          keyword: this.keyword,
          author: this.$store.state.user.displayName,
        }
      );
      this.question = "";
      this.description = "";
      (this.amoutOfKeywords = 1), (this.keyword = []);
    },
  },
};
</script>

<style lang="scss" scoped>
.question-wrapper {
  min-height: 10rem;
  width: 100%;
  padding-right: 0.5rem;
  padding-bottom: 2rem;
  margin: 0 auto;
  .question-form {
    color: var(--font-color);
    display: grid;
    grid-template-columns: 1fr 3fr;
    margin-bottom: 2rem;

    .keyword-wrapper {
      grid-column: 1/3;
      display: grid;
      grid-template-columns: 1fr 3fr;
    }
  }
  label {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  Button {
    background-color: var(--font-color);
  }
  Button + Button {
    margin-left: 1.5rem;
  }
  .p-button:hover {
    color: var(--white-color);
    background-color: var(--font-color);
  }
}
</style>
