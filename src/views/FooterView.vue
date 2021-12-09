<template>
  <Button
    v-if="this.$store.state.user"
    @click="logout"
    class="p-button-outlined"
  >
    Logout
  </Button>
</template>

<script>
import Button from "primevue/button";

export default {
  components: { Button },
  methods: {
    logout() {
      this.$router.push({ name: "Login" });
      this.$store.state.user = null;
    },
  },
};
</script>

<style scoped>
Button {
  margin: 1rem 0;
}
</style>
