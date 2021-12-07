<template>
  <section>
    <div class="login-form">
      <InputText v-model="login" placeholder="E-Mail" />
      <Password
        @keyup.enter="checkLogin"
        v-model="password"
        class="pw-wrapper"
        :feedback="false"
        placeholder="Enter password"
      />
      <small v-if="showError" id="username2-help" class="p-error"
        >falsches Passwort</small
      >
      <div class="pw-wrapper">
        <Button @click="resetPw" class="reset-pw p-button-outlined"
          >neues Passwort</Button
        >

        <Button @click="checkLogin" class="p-button-outlined"> Login </Button>
      </div>
    </div>
    <Button @click="routeToRegister" class="p-button-outlined p-blue">
      Zur Registrierung
    </Button>
  </section>
</template>

<script>
import Button from "primevue/button";
import Password from "primevue/password";
import InputText from "primevue/inputtext";
import firestore from "@/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

export default {
  components: { Button, Password, InputText },
  data() {
    return {
      password: null,
      login: null,
      showError: false,
      delay: 200,
    };
  },
  methods: {
    async checkLogin() {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.login, this.password)
        .then((userCredential) => {
          // Signed in
          this.$store.state.user = userCredential.user;

          if (this.$store.state.user.emailVerified) {
            this.$router.push({ name: "Moduls" });
          } else {
            this.$router.push({ name: "Profil" });
          }
        })
        .catch((error) => {
          this.showError = true;
          setTimeout(() => (this.showError = false), 2500);
        });
    },
    resetPw() {
      const auth = getAuth();
      sendPasswordResetEmail(auth, this.login);
    },
    routeToRegister() {
      this.$router.push({ name: "Register" });
    },
  },
};
</script>

<style lang="scss">
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
    //border: 1px solid var(--third-color);
    width: 18rem;
  }

  .p-button {
    width: 18rem;
  }
  .p-button:hover {
    color: var(--white-color);
    background-color: var(--background-color);
  }
}
.pw-wrapper {
  width: 18rem;
  background-color: white;
  display: flex;
  flex-direction: row;

  .reset-pw {
    width: 30%;
    font-size: 12px;
  }
  .p-button:hover {
    color: var(--white-color);
    background-color: var(--background-color);
  }
}
</style>
