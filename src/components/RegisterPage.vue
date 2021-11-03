<template>
  <h2>Register</h2>
  <div class="register-form">
    <InputText
      v-model="login"
      type="email"
      pattern="true"
      placeholder="isba-E-Mail-Adresse"
    />
    <Password
      v-model="password"
      style="password"
      inputClass="input-password"
      placeholder="Enter password"
    />
    <Password
      v-model="passwordConfirmation"
      style="password"
      inputClass="input-password"
      :feedback="false"
      placeholder="Confirm password"
    />
    <Button @click="registerUser" class="p-button-outlined"> Register </Button>
  </div>
  <Button @click="routeToLogin" class="p-button-outlined"> Zum Login </Button>
</template>

<script>
import Button from "primevue/button";
import Password from "primevue/password";
import InputText from "primevue/inputtext";
import firestore from "@/firestore";
import { setDoc, doc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default {
  components: { Button, Password, InputText },
  data() {
    return {
      login: null,
      password: null,
      passwordConfirmation: null,
    };
  },
  methods: {
    registerUser() {
      if (
        this.password === this.passwordConfirmation &&
        this.login.length > 5
      ) {
        /*"@stud.isba.studium.de" ===
          this.login.substring(this.login.length - 21, this.login.length)*/
        console.log("works");

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, this.login, this.password);

        //this.createUser();
      } else {
        console.log(this.login);
      }
    },

    createUser() {
      setDoc(doc(firestore, "users", this.login), {
        Email: this.login,
        login: "testUser200",
      });
    },
    routeToLogin() {
      this.$router.push({ name: "Login" });
    },
  },
};
</script>

<style lang="scss" scoped>
.register-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-bottom: 1rem;
}
</style>
