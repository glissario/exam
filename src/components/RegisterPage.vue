<template>
  <section>
    <div class="register-form">
      <div class="input-email">
        <InputText
          v-model="login"
          type="email"
          pattern="true"
          placeholder="isba-E-Mail-Adresse"
          :class="noIsbaMailAdress ? 'p-invalid' : null"
        />
        <small v-if="noIsbaMailAdress" id="username2-help" class="p-error"
          >E-Mail ist keine isba-Mailadresse</small
        >
        <small v-if="emailInUse" id="username2-help" class="p-error"
          >E-Mail ist bereits vorhanden</small
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
        <small v-if="weakPassword" id="username2-help" class="p-error"
          >zu schwaches Passwort</small
        >
        <small v-if="unknownError" id="username2-help" class="p-error"
          >ein unbekannter Fehler ist aufgetreten</small
        >
        <small v-if="registerConfirmation" id="username2-help" class="p-success"
          >Anmeldung hat geklappt</small
        >
      </div>
      <button @click="registerUser" class="outlined-button">
        {{ validRegistration }}
      </button>
    </div>
    <button @click="routeToLogin" class="outlined-button">Zum Login</button>
  </section>
</template>

<script>
import Password from "primevue/password";
import InputText from "primevue/inputtext";
import firestore from "@/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default {
  components: { Password, InputText },
  data() {
    return {
      login: null,
      noIsbaMailAdress: false,
      emailInUse: false,
      unknownError: false,
      weakPassword: false,
      invalidPassword: false,
      password: null,
      passwordConfirmation: null,
      registerConfirmation: false,
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
      this.noIsbaMailAdress = false;
      this.invalidPassword = false;

      if (
        this.password === this.passwordConfirmation &&
        "@stud.isba-studium.de" ===
          this.login.substring(this.login.length - 21, this.login.length)
      ) {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, this.login, this.password)
          .then((user) => {
            console.log(user);
            this.registerConfirmation = true;
            setTimeout(() => this.routeToLogin(), 3000);
          })
          .catch((error) => {
            const errorCode = error.code;

            if (errorCode == "auth/email-already-in-use") {
              this.emailInUse = true;
              setTimeout(() => (this.emailInUse = false), 2500);
            }
            if (errorCode == "auth/weak-password") {
              this.weakPassword = true;
              setTimeout(() => (this.weakPassword = false), 2500);
            }
            if (
              errorCode !== "auth/weak-password" &&
              errorCode !== "auth/email-already-in-use"
            ) {
              this.unknownError = true;
              setTimeout(() => (this.unknownError = false), 2500);
            }

            // setTimeout(() => this.routeToLogin(), 3000);
          });
      } else if (
        "@stud.isba-studium.de" !==
        this.login.substring(this.login.length - 21, this.login.length)
      ) {
        this.noIsbaMailAdress = true;
        setTimeout(() => (this.noIsbaMailAdress = false), 2500);
      }
      if (this.password !== this.passwordConfirmation) {
        this.invalidPassword = true;
        setTimeout(() => (this.invalidPassword = false), 2500);
      }
    },
    routeToLogin() {
      this.$router.push({ name: "Login" });
    },
  },
};
</script>

<style lang="scss">
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
