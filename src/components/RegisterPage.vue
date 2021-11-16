<template>
  <div class="register-form">
    <div class="input-email">
      <InputText
        v-model="login"
        type="email"
        pattern="true"
        placeholder="isba-E-Mail-Adresse"
        :class="invalidLogin ? 'p-invalid' : null"
      />
      <small v-if="invalidLogin" id="username2-help" class="p-error"
        >E-Mail ist keine isba-Mailadresse</small
      >
    </div>
    <Password
      v-model="password"
      style="password"
      :inputClass="
        invalidPassword ? 'input-password p-invalid' : 'input-password'
      "
      placeholder="Enter password"
    />
    <div class="input-password">
      <Password
        v-model="passwordConfirmation"
        style="password"
        :inputClass="
          invalidPassword ? 'input-password p-invalid' : 'input-password'
        "
        :feedback="false"
        placeholder="Confirm password"
      />
      <small v-if="invalidPassword" id="username2-help" class="p-error"
        >Passwörter stimmen nicht überein</small
      >
    </div>
    <Button @click="registerUser" class="p-button-outlined">
      {{ validRegistration }}
    </Button>
  </div>
  <Button @click="routeToLogin" class="p-button-outlined"> Zum Login </Button>
</template>

<script>
import Button from "primevue/button";
import Password from "primevue/password";
import InputText from "primevue/inputtext";
import firestore from "@/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default {
  components: { Button, Password, InputText },
  data() {
    return {
      login: null,
      invalidLogin: false,
      invalidPassword: false,
      password: null,
      passwordConfirmation: null,
      invalidRegistration: true,
    };
  },
  computed: {
    validRegistration() {
      return this.invalidRegistration
        ? "Register"
        : "Registrierung erfolgreich";
    },
  },
  methods: {
    registerUser() {
      this.invalidLogin = false;
      this.invalidPassword = false;

      if (
        this.password === this.passwordConfirmation &&
        "@stud.isba.studium.de" ===
          this.login.substring(this.login.length - 21, this.login.length)
      ) {
        console.log("works");

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, this.login, this.password);
        this.invalidRegistration = false;
        setTimeout(() => this.routeToLogin(), 3000);
      } else {
        if (
          "@stud.isba.studium.de" !==
          this.login.substring(this.login.length - 21, this.login.length)
        ) {
          this.invalidLogin = true;
          setTimeout(() => (this.invalidLogin = false), 2500);
        }
        if (this.password !== this.passwordConfirmation) {
          this.invalidPassword = true;
          setTimeout(() => (this.invalidPassword = false), 2500);
        }
      }
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
  padding-bottom: 2rem;
  color: var(--font-color);

  .input-email,
  .input-password {
    display: flex;
    flex-direction: column;
  }

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
