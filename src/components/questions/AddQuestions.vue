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
        <li>
          Es können beliebig viele Beschreibungen der Aufgabe hinzugefügt werden
        </li>
        <li>
          Gleiches gilt für die Schlüsselwörter - diese sind später suchbar
        </li>
      </ol>
    </section>
    <form
      class="question-form"
      v-if="this.$store.state.user.displayName !== null"
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
      <editor-content
        class="editor"
        :editor="editor"
        v-model="descriptionText"
      />
      <!--div
        class="description-wrapper"
        v-for="index in amoutOfDescriptions"
        :key="index"
        :keyword="'description' + index"
      >
        <label for="description">{{ index }}. Beschreibung </label>
        <div class="description-line">
          <InputText
            v-model="description[index - 1]"
            id="description"
            type="text"
          />
          <Button v-if="index == '1'" @click="addDescription">
            <i class="pi pi-plus-circle" size="2rem"></i>
          </Button>
          <Button v-if="index == '1'" @click="removeDescription">
            <i class="pi pi-minus-circle" size="2rem"></i>
          </Button>
        </div>
      </div-->

      <div
        class="keyword-wrapper"
        v-for="index in amoutOfKeywords"
        :key="index"
        :keyword="'keyword' + index"
      >
        <label for="keyword">{{ index + ". Schlüsselwort" }} </label>
        <div class="keyword-line">
          <InputText v-model="keyword[index - 1]" id="keyword" type="text" />
          <Button v-if="index == '1'" @click="addKeyword">
            <i class="pi pi-plus-circle" size="2rem"></i>
          </Button>
          <Button v-if="index == '1'" @click="removeKeyword">
            <i class="pi pi-minus-circle" size="2rem"></i>
          </Button>
        </div>
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
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { getAuth, updateProfile } from "firebase/auth";

import firestore from "@/firestore.js";
import Dropdown from "primevue/dropdown";
import moduls from "@/components/moduls/modulePlan.json";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import { Editor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";

export default {
  components: { InputText, Button, Dropdown, EditorContent },
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
      content: "Beschreibe die Frage",
      extensions: [StarterKit],
    });
  },
  methods: {
    addKeyword() {
      this.amoutOfKeywords++;
      this.keyword.push();
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
    setDisplayName() {
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
          description: this.descriptionText,
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
  position: relative;
  min-height: 10rem;
  width: 100%;
  padding-right: 0.5rem;
  padding-bottom: 2rem;
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
      padding: 0;
      div {
        p {
          margin: 5rem;
          padding: 1rem;
        }
      }
    }
    .editor:hover {
      border-color: #2196f3;
    }
    .description-wrapper {
      grid-column: 1/3;
      display: grid;
      grid-template-columns: 1fr 3fr;

      .description-line {
        display: grid;
        grid-template-columns: 1fr 3rem 3rem;
        grid-column-gap: 0.5rem;
        width: 100%;
      }
      Button {
        width: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .p-inputtext {
        width: 100%;
      }
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
    justify-content: start;
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
  Button {
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
