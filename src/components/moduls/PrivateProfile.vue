<template>
  <div
    v-if="!this.$store.state.user.emailVerified"
    class="verification-wrapper"
  >
    <div v-if="false">
      <label for="display-name">Display-Name: </label>
      <InputText
        @keyup.enter="setUserName"
        v-model="userName"
        id="display-name"
        type="text"
        placeholder="neuer Username"
        :disabled="this.$store.state.user.displayName !== null"
      />
    </div>
    <small v-if="invalidUserName" id="username2-help" class="p-error"
      >zu kurzer Display-Name</small
    >
    <Button class="p-button-outlined">{{ verifiedButtonText }}</Button>
  </div>
  <div v-if="false">
    <button @click="emailVerification">verify</button>
    <button @click="resetPw">reset pw</button>
    <button @click="getUser">view user</button>
  </div>
  <div v-if="this.$store.state.user.emailVerified" class="profile-wrapper">
    <h2>Deine hinterlegten Daten</h2>
    <div class="profil-data-wrapper">
      <div class="profil-data">
        <label for="display-name">Display-Name: </label>
        <p>{{ this.$store.state.user.displayName }}</p>
      </div>
      <div class="profil-data">
        <label for="eMail">E-Mail: </label>
        <p>{{ this.$store.state.user.email }}</p>
      </div>

      <Password
        v-model="password"
        style="password"
        :inputClass="
          invalidPassword ? 'input-password p-invalid' : 'input-password'
        "
        placeholder="change password"
      />
      <Password
        v-model="passwordConfirmation"
        @keyup.enter="changePw"
        style="password"
        :inputClass="
          invalidPassword ? 'input-password p-invalid' : 'input-password'
        "
        :feedback="false"
        placeholder="Confirm password"
      />
    </div>
  </div>
</template>

<script>
import Password from "primevue/password";
import {
  sendEmailVerification,
  getAuth,
  sendPasswordResetEmail,
  updateProfile,
  updatePassword,
} from "firebase/auth";

import firestore from "@/firestore.js";
import Button from "primevue/button";
import InputText from "primevue/inputtext";

export default {
  components: { Button, InputText, Password },
  data() {
    return {
      userName: "",
      invalidUserName: false,
      password: "",
      passwordConfirmation: "",
      invalidPassword: false,
    };
  },
  computed: {
    verifiedButtonText() {
      return this.$store.state.user.emailVerified
        ? "E-Mail bereits verifiziert"
        : "Bitte E-Mail verifizieren";
    },
  },
  methods: {
    setUserName() {
      if (this.userName.length > 3) {
        const auth = getAuth();

        updateProfile(this.$store.state.user, {
          displayName: this.userName,
        }).catch((error) => {
          this.invalidUserName = true;
          setTimeout(() => (this.invalidUserName = false), 2500);
        });
      } else {
        this.invalidUserName = true;
        setTimeout(() => (this.invalidUserName = false), 2500);
      }
    },
    getUser() {
      console.log(this.$store.state.user);
    },
    emailVerification() {
      sendEmailVerification(this.$store.state.user);
    },
    resetPw() {
      const auth = getAuth();
      sendPasswordResetEmail(auth, this.$store.state.user.email);
    },
    changePw() {
      updatePassword(this.$store.state.user, this.Password).then(() => {
        console.log("works");
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.verification-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;

  width: 50%;
  .p-button {
    width: 100%;
    color: var(--font-color);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .p-button:hover {
    color: var(--white-color);
    background-color: var(--font-color);
  }
}
.profil-data-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .profil-data {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    margin: 0.15rem 0;
    width: 50%;
    grid-template-columns: 1fr 2fr;
    p {
      margin: 0.15rem 0;
    }
    label {
      width: 33%;
      text-align: left;
    }
  }
}
@media screen and (max-width: 600px) {
  .profile-wrapper {
    width: 100%;
    .profil-data-wrapper {
      .profil-data {
        width: 80%;
        .label {
          font-size: 2rem;
        }
      }
    }
  }
}
</style>
