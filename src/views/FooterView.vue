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
      this.$store.state.user = null;
      this.$router.push({ name: "Login" });
    },
  },
};
</script>
