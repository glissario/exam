<template>
  <div class="literatur-wrapper">
    <h2>Literatur-Tipps</h2>
    <i class="pi pi-plus-circle" @click="showPopup = true"></i>
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
          v-model="special"
          id="question"
          type="text"
          aria-describedby="username1-help"
        />
      </form>
    </section>
  </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "LiteraturDetails",
  data() {
    return {
      showPopup: false,
    };
  },
  methods: {
    addLiterature() {
      return (this.showPopup = true);
    },
  },
});
</script>

<style lang="scss" scoped>
.literatur-wrapper {
  min-height: 20rem;
  position: relative;
  .pi-plus-circle {
    font-size: 2rem;
  }
  h2 {
    margin-top: 2rem;
  }
  .popup-add-literature {
    position: absolute;
    top: 0;
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
      }
    }
  }
}
</style>
