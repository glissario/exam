<template>
  <button v-if="this.$store.state.user" @click="logout" class="outlined-button">
    Logout
  </button>
</template>

<script>
export default {
  components: {},
  methods: {
    logout() {
      this.$router.push({ name: "Login" });
      this.$store.state.user = null;
    },
  },
};
</script>

<style scoped>
button {
  margin: 2rem auto;
}
</style>
