<template>
  <div class="internship-wrapper">
    <h2>Praktika</h2>
    <i class="pi pi-plus-circle" @click="showPopup = true"></i>

    <ul v-for="(intern, index) in allInternship" :key="index">
      <internship-details :internship="intern" />
    </ul>

    <section v-if="showPopup" class="popup-add-literature">
      <i class="pi pi-times" @click="showPopup = false"></i>
      <h3>Praktika</h3>
      <form class="literature-form">
        <label for="question">Arbeitgeber</label>
        <InputText
          v-model="employer"
          id="employer"
          type="text"
          aria-describedby="username1-help"
        />
        <label for="question">Fachbereich</label>
        <InputText
          v-model="speciality"
          id="speciality"
          type="text"
          aria-describedby="username1-help"
        />
        <label for="question">Ansprechpartner</label>
        <InputText
          v-model="contact"
          id="contact"
          type="text"
          aria-describedby="username1-help"
        />
        <Button @click="submitInternalship">Absenden </Button>
      </form>
    </section>
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from "vue";
import InternshipDetails from "./InternshipDetails.vue";
import Button from "primevue/button";
import { doc, setDoc } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import  InternshipModel  from "./internship.model";
import firestore from "@/firestore.js";

export default defineComponent({
  name: "InternshipOverview",
  components: { Button, InternshipDetails },
  data() {
    return {
      showPopup: false,
      employer: "",
      speciality: "",
      contact: "",
      allInternship: [] as InternshipModel[],
    };
  },
  async created() {
    const docSnap = await getDocs(collection(firestore, "internship"));

    docSnap.forEach((doc) => {
      this.allInternship.push(doc.data() as InternshipModel);
    });
    console.log(this.allInternship);
  },
  methods: {
    async submitInternalship() {
      await setDoc(doc(firestore, "internship", this.employer), {
        employer: this.employer,
        speciality: this.speciality,
        contact: this.contact,
        author: "TestAuthor",
      });
      this.employer = "";
      this.speciality = "";
      this.contact = "";
    },
  },
});
</script>

<style lang="scss" scoped>
.internship-wrapper {
  min-height: 20rem;
  position: relative;
  width: 80%;
  margin: 0 auto;

  .pi-plus-circle {
    font-size: 2rem;
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
