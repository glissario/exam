<template>
  <div class="login-form">
    <InputText v-model="login" placeholder="E-Mail" />
    <Password
      @keyup.enter="checkLogin"
      v-model="password"
      class="pw-wrapper"
      :feedback="false"
      placeholder="Enter password"
    />
    <Button @click="checkLogin" class="p-button-outlined"> Login </Button>

    <Button @click="routeToRegister" class="p-button-outlined p-blue">
      Zur Registrierung
    </Button>
  </div>
</template>

<script>
import Button from "primevue/button";
import Password from "primevue/password";
import InputText from "primevue/inputtext";
import firestore from "@/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default {
  components: { Button, Password, InputText },
  data() {
    return {
      password: null,
      login: null,
    };
  },
  methods: {
    async checkLogin() {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.login, this.password).then(
        (userCredential) => {
          // Signed in
          this.$store.state.user = userCredential.user;
          this.$router.push({ name: "Moduls" });
        }
      );
    },

    routeToRegister() {
      this.$router.push({ name: "Register" });
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
  color: var(--font-color);

  .p-inputtext {
    width: 18rem;
  }
  .p-inputtext {
    color: var(--third-color);
    border: 1px solid var(--third-color);
    margin: 0.35rem 0;
  }

  .p-button {
    color: var(--third-color);
    margin: 0.35rem 0;
    width: 13.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .p-password {
    border: 1px solid var(--third-color);
    width: 18rem;
  }
  .p-button {
    width: 18rem;
  }
}
.pw-wrapper {
  width: 100%;
  background-color: white;
}
</style>
