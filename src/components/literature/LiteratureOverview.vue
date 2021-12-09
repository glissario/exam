<template>
  <div class="literatur-wrapper">
    <h2>Literatur-Tipps</h2>
    <i class="pi pi-plus-circle" @click="showPopup = true"></i>
    <ul v-for="(book, index) in allLiterature" :key="index">
      <literature-details
        :title="book.title"
        :details="book.bookSpecial"
        :author="book.author"
      />
    </ul>

    <section v-if="showPopup" class="popup-add-literature">
      <i class="pi pi-times" @click="showPopup = false"></i>
      <h3>Neue Frage</h3>
      <form
        class="literature-form"
        v-if="this.$store.state.user.displayName !== null"
      >
        <label for="question">Buchtitel: </label>
        <InputText
          v-model="title"
          id="question"
          type="text"
          aria-describedby="username1-help"
        />
        <label for="question">Warum empfehle ich das Buch?</label>
        <InputText
          v-model="bookSpecial"
          id="question"
          type="text"
          aria-describedby="username1-help"
        />
        <Button
          v-if="this.$store.state.user.displayName !== null"
          @click="submitLiterature"
          >Absenden
        </Button>
      </form>
    </section>
  </div>
</template>

<script>
import LiteratureDetails from "@/components/literature/LiteratureDetails.vue";
import Button from "primevue/button";
import { defineComponent } from "@vue/runtime-core";
import { doc, setDoc } from "firebase/firestore";
import firestore from "@/firestore.js";
import { collection, getDocs } from "firebase/firestore";

export default defineComponent({
  name: "LiteraturOverview",
  components: { Button, LiteratureDetails },
  data() {
    return {
      showPopup: false,
      title: "",
      bookSpecial: "",
      allLiterature: [],
    };
  },
  async created() {
    const docSnap = await getDocs(collection(firestore, "literature"));

    docSnap.forEach((doc) => {
      this.allLiterature.push(doc.data());
    });
  },
  methods: {
    addLiterature() {
      return (this.showPopup = true);
    },
    async submitLiterature() {
      await setDoc(doc(firestore, "literature", this.title), {
        title: this.title,
        bookSpecial: this.bookSpecial,
        author: this.$store.state.user.displayName,
      });
      this.title = "";
      this.bookSpecial = "";
    },
  },
});
</script>

<style lang="scss" scoped>
.literatur-wrapper {
  min-height: 20rem;
  position: relative;
  width: 80%;
  margin: 0 auto;
  .pi-plus-circle {
    font-size: 2rem;
  }
  h2 {
    margin-top: 2rem;
  }
  ul {
    margin: 0;
    padding: 0;
  }
  .popup-add-literature {
    position: absolute;
    top: 0;
    color: white;
    background-color: var(--background-color);
    opacity: 0.9;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;

    z-index: 2;
    .pi-times {
      position: absolute;
      top: 1rem;
      right: 1rem;
    }
    .literature-form {
      display: flex;
      flex-direction: column;
      width: 80%;
      .p-inputtext {
        width: 100%;
        opacity: 1;
      }
    }
    .p-button {
      margin-top: 1rem;
      background-color: var(--white-color);
      color: var(--background-color);
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
