<template>
  <div class="login-form">
    <Password v-model="password" :feedback="false" />
    <Button @click="checkLogin" class="p-button-outlined"> Login </Button>
  </div>
</template>

<script>
import Button from "primevue/button";
import Password from "primevue/password";
import firestore from "@/firestore";
import { setDoc, doc } from "firebase/firestore";

export default {
  components: { Button, Password },
  data() {
    return {
      password: null,
    };
  },
  methods: {
    checkLogin() {
      this.$store.state.isLoggedIn = true;
      this.$router.push({ name: "Moduls" });
    },
    createUser() {
      setDoc(doc(firestore, "user"), {
        Email: this.$store.getters.getCurrentUserID,
        login: this.userRole,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.login-form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-bottom: 2rem;

  .p-password {
    color: #da7573;
    border: 2px solid #573643;
    width: 30rem;

    .p-inputtext {
      width: 100%;
    }
  }
  input {
    width: 100%;
  }

  .p-button {
    color: #da7573;
    margin: 0.35rem 0;
    width: 30rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .p-button:hover {
    color: black;
  }
}
</style>
