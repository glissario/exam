<template>
  <div class="question-wrapper">
    <section
      @click="openPopup = !openPopup"
      class="help-popup"
      v-if="openPopup"
    >
      <h2>Was zu beachten ist:</h2>
      <ol>
        <li>Jedes Feld ist auszufüllen, um die Frage speichern zu können</li>
        <li>Gute Schlüsselwörter ermöglichen eine präzise Suche</li>
      </ol>
    </section>
    <form
      class="question-form"
      v-if="
        this.$store.state.user && this.$store.state.user.displayName !== null
      "
    >
      <i
        @click="openPopup = !openPopup"
        :class="openPopup ? 'pi pi-times-circle' : 'pi pi-question-circle'"
      ></i>
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
      <label for="description-text">Beschreibung </label>

      <editor-content class="editor" :editor="editor" />
      <div
        class="keyword-wrapper"
        v-for="index in amoutOfKeywords"
        :key="index"
        :keyword="'keyword' + index"
      >
        <label for="keyword">{{ index + ". Schlüsselwort" }} </label>
        <div class="keyword-line">
          <InputText v-model="keyword[index - 1]" id="keyword" type="text" />
          <button v-if="index == '1'" @click="addKeyword">
            <i class="pi pi-plus-circle" size="2rem"></i>
          </button>
          <button v-if="index == '1'" @click="removeKeyword">
            <i class="pi pi-minus-circle" size="2rem"></i>
          </button>
        </div>
      </div>
    </form>
    <button
      v-if="
        this.$store.state.user && this.$store.state.user.displayName !== null
      "
      @click="submitQuestion"
      class="outlined-button"
    >
      Absenden
    </button>
  </div>
</template>

<script>
import { doc, setDoc } from "firebase/firestore";
import { getAuth, updateProfile } from "firebase/auth";

import firestore from "@/firestore.js";
import Dropdown from "primevue/dropdown";
import moduls from "@/components/moduls/modulePlan.json";
import InputText from "primevue/inputtext";
import { Editor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";

export default {
  components: { InputText, Dropdown, EditorContent },
  data() {
    return {
      amoutOfKeywords: 1,
      amoutOfDescriptions: 1,
      question: "",
      displayName: "",
      semesterOptions: null,
      selectedModule: null,
      keyword: [],
      description: [],
      descriptionText: "",
      openPopup: false,
      editor: null,
    };
  },
  created() {
    this.semesterOptions = moduls.root;
  },
  mounted() {
    this.editor = new Editor({
      content: "",
      extensions: [StarterKit],
    });
  },
  methods: {
    addKeyword() {
      this.amoutOfKeywords++;
      this.keyword.push();
    },
    testIt() {
      console.log(this.editor.options.element.firstChild.innerText);
      this.editor.options.element.firstChild.innerText = "";
      //this.editor.options.element.innerText = "";
    },
    removeKeyword() {
      return this.amoutOfKeywords > 1
        ? this.amoutOfKeywords-- && this.keyword.pop()
        : this.amoutOfKeywords;
    },
    addDescription() {
      this.amoutOfDescriptions++;
      this.description.push();
    },
    removeDescription() {
      return this.amoutOfDescriptions > 1
        ? this.amoutOfDescriptions-- && this.description.pop()
        : this.amoutOfKeywords;
    },
    async submitQuestion() {
      const date = new Date();
      let month = (date.getMonth() + 1).toString();
      month.length === 1 ? (month = "0" + month) : month;
      const submitDate =
        date.getDate() + "." + month + "." + date.getFullYear();

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
          description: this.editor.getHTML(),
          keyword: this.keyword,
          author: this.$store.state.user.displayName,
          date: submitDate,
        }
      );
      this.question = "";
      this.selectedModule = null;
      this.editor.options.element.firstChild.innerText = "";
      this.amoutOfKeywords = 1;
      this.keyword = [];
    },
  },
};
</script>

<style lang="scss" scoped>
.question-wrapper {
  position: relative;
  min-height: 10rem;
  width: 100%;
  padding-right: 0.5rem;
  margin: 0 auto;
  .pi-question-circle,
  .pi-times-circle {
    position: absolute;
    top: -2rem;
    right: 1rem;
    z-index: 10;
  }
  .question-form {
    color: var(--font-color);
    display: grid;
    grid-template-columns: 1fr 3fr;
    margin-bottom: 2rem;

    .editor {
      background-color: white;
      border: 1px solid RGB(206, 212, 218);
      text-align: left;
      margin: 0;
      .ProseMirror p {
        margin: 4rem;
      }
    }
    .editor:hover {
      border-color: #2196f3;
    }

    .keyword-wrapper {
      grid-column: 1/3;
      display: grid;
      grid-template-columns: 1fr 3fr;
      .keyword-line {
        display: grid;
        grid-template-columns: 1fr 3rem 3rem;
        grid-column-gap: 0.5rem;
        width: 100%;
      }
      .p-inputtext {
        width: 100%;
        color: var(--font-color);
      }
    }
  }

  .help-popup {
    position: absolute;
    color: white;
    background-color: var(--background-color);
    opacity: 0.8;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    text-align: left;

    z-index: 2;
  }

  label {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .m-l {
    margin-left: 0.5rem;
  }
  .p-button {
    background-color: var(--font-color);
  }

  .p-button:hover {
    color: var(--font-color);
    background-color: var(--white-color);
  }
}

@media screen and (max-width: 400px) {
  .p-dropdown,
  .p-inputtext {
    width: 10rem;
  }
}
</style>
