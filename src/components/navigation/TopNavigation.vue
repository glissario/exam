<template>
  <nav
    v-if="this.$store.state.user !== null && !mobileNavigation"
    class="nav-wrapper"
  >
    <div v-if="this.$store.state.user.emailVerified">
      <router-link :to="{ name: 'About' }">Das Projekt</router-link>
      <router-link :to="{ name: 'Moduls' }">Module einsehen</router-link>
      <router-link :to="{ name: 'Questions' }">Fragen eingeben</router-link>
      <router-link :to="{ name: 'Literatur' }">Literatur</router-link>
      <router-link :to="{ name: 'Internship' }">Praktika</router-link>
      <router-link :to="{ name: 'Profil' }">Profil</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: "MainNavigation",

  data() {
    return {
      mobileNavigation: window.matchMedia(screen && "(max-width:735px)")
        .matches,
    };
  },
  created() {
    window.addEventListener("resize", this.checkMobileNavigation);
    this.checkMobileNavigation();
  },
  computed: {
    verifiedUser() {
      return true;
    },
  },
  methods: {
    checkMobileNavigation() {
      this.mobileNavigation = window.matchMedia(
        screen && "(max-width:735px)"
      ).matches;
    },
  },
};
</script>

<style lang="scss">
.nav-wrapper {
  padding: 30px 0;
  a {
    font-weight: bold;
    text-decoration: none;
    padding: 0.5rem 0.25rem;
    margin: 0 0.25rem;
    color: var(--font-color);
    border: 2px solid var(--font-color);
  }

  a.router-link-active {
    color: var(--secondary-color);
    border: 2px solid var(--secondary-color);
    cursor: pointer;
  }
}
</style>
