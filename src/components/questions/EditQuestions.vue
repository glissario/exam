<template>
  <div class="question-detail-wrapper" v-if="actualQuestion">
    <section class="editor-popup" v-if="openPopup">
      <i class="pi pi-times-circle" @click="openPopup = !openPopup"></i>
      <i class="pi pi-save" v-if="noteValue !== null"></i>
      <Textarea v-model="questionDetail" id="keyword" type="text" />
    </section>
    <i class="pi pi-times-circle" @click="closeDetails"></i>
    <i class="pi pi-pencil" @click="getQuestionDetails()"></i>
    <h3>
      {{ actualQuestion.question }}
    </h3>
    <span v-html="actualQuestion.description"></span>
    <Button @click="showDetails" class="p-button-secondary">
      {{ keywordButtonText }}
    </Button>
    <ul v-if="showKeys">
      <li v-for="(keyword, index) in this.actualQuestion.keyword" :key="index">
        {{ keyword }}
      </li>
    </ul>

    <!--div v-if="actualQuestion.author" class="author-wrapper">
      <div></div>
      <p>{{ "von " + actualQuestion.author }}</p>
    </div-->
    <div v-if="noteValue !== ''" class="notes">
      <i class="pi pi-times-circle"></i>
      <h3>Eigene Notizen</h3>

      <span v-html="noteValue"></span>
    </div>
  </div>
</template>

<script>
import Button from "primevue/button";
import Textarea from "primevue/textarea";

import { getDoc, doc, setDoc } from "firebase/firestore";
import firestore from "@/firestore.js";
import { defineComponent } from "@vue/runtime-core";
//import InputText from "primevue/inputtext";

export default defineComponent({
  components: { Button, Textarea /*, InputText*/ },
  data() {
    return {
      showKeys: false,
      openPopup: false,
      noteValue: "",
      questionDetail: "",
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
  async created() {
    const docSnap = await getDoc(
      doc(
        firestore,
        "moduls",
        this.$store.state.actualModule.label,
        "questions",
        this.actualQuestion.question,
        "userNotes",
        this.$store.state.user.uid
      )
    );
    if (docSnap.exists()) {
      this.noteValue = docSnap.data().note;
    } else {
      // doc.data() will be undefined in this case
    }
  },

  methods: {
    showDetails() {
      this.showKeys = !this.showKeys;
    },
    closeDetails() {
      this.$store.state.actualQuestion = null;
    },
    getQuestionDetails() {
      this.openPopup = !this.openPopup;
      console.log(this.$store.state.actualQuestion);
      this.questionDetail = this.$store.state.actualQuestion.description;
      console.log(this.questionDetail);
    },
    async saveNotes() {
      await setDoc(
        doc(
          firestore,
          "moduls",
          this.$store.state.actualModule.label,
          "questions",
          this.actualQuestion.question,
          "userNotes",
          this.$store.state.user.uid
        ),
        {
          note: this.noteValue,
        }
      );
    },
  },
});
</script>

<style lang="scss" scoped>
.question-detail-wrapper {
  position: relative;
  color: var(--font-color);
  width: 80%;
  margin: 1rem auto;
  border: 1px solid var(--font-color);
  textarea {
    margin-top: 2.5rem;
    height: 100%;
  }
  .pi-times-circle {
    position: absolute;
    top: 1rem;
    right: 1rem;
    cursor: pointer;
  }
  .pi-pencil {
    position: absolute;
    top: 1rem;
    right: 3rem;
    cursor: pointer;
  }
  .pi-save {
    position: absolute;
    top: 1rem;
    right: 3rem;
    cursor: pointer;
  }
  h3 {
    hyphens: auto;
    padding-top: 0.5rem;
  }
  @media screen and (max-width: 600px) {
    h3 {
      font-size: 1.1rem;
      padding-top: 1rem;
    }
  }

  .description-list {
    width: 75%;
    margin: 1rem auto;
    padding: 0;
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
  .p-inputtext {
    width: 80%;
  }
  .editor-popup {
    position: absolute;
    color: var(--Font-color);
    background-color: var(--white-color);
    opacity: 0.9;
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
  .notes {
    h3 {
      text-align: center;
    }
    width: 75%;
    margin: 0 auto;
    text-align: left;
  }
}
</style>
