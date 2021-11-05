<template>
  <div class="login-form">
    <InputText v-model="login" placeholder="E-Mail" />
    <Password
      @keyup.enter="checkLogin"
      v-model="password"
      style="password"
      inputClass="input-password"
      :feedback="false"
      placeholder="Enter password"
    />
    <Button @click="checkLogin" class="p-button-outlined"> Login </Button>
  </div>

  <Button @click="routeToRegister" class="p-button-outlined">
    Zur Registrierung
  </Button>
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

  .p-inputtext {
    width: 13.8rem;
  }
  .p-password {
    color: #da7573;
    border: 1px solid #573643;
    .input-password {
      width: 100%;
      background-color: blue;
    }
  }
  .password {
    .input-password {
      width: 100%;
      background-color: red;
    }
  }

  .p-button {
    color: #da7573;
    margin: 0.35rem 0;
    width: 13.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .p-button:hover {
    color: black;
  }
}

.p-inputtext {
  width: 100%;
}
</style>
