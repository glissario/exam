<template>
  <div class="login-form">
    <InputText v-model="login" placeholder="E-Mail" />
    <Password
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
import { setDoc, getDoc, doc } from "firebase/firestore";

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
      const docRef = doc(firestore, "user", "glissario");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    },
    createUser() {
      setDoc(doc(firestore, "user"), {
        Email: this.$store.getters.getCurrentUserID,
        login: this.userRole,
      });
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
    border: 2px solid #573643;
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
