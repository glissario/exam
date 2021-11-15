<template>
  <nav
    v-if="this.$store.state.user !== null && !mobileNavigation"
    class="nav-wrapper"
  >
    <router-link :to="{ name: 'About' }">Über uns</router-link>
    <router-link :to="{ name: 'Moduls' }">Module einsehen</router-link>
    <router-link :to="{ name: 'Questions' }">Fragen eingeben</router-link>
    <router-link :to="{ name: 'Literatur' }">Literatur</router-link>
  </nav>
</template>

<script>
export default {
  name: "MainNavigation",

  data() {
    return {
      mobileNavigation: window.matchMedia(screen && "(max-width:600x)").matches,
    };
  },
  created() {
    window.addEventListener("resize", this.checkMobileNavigation);
    this.checkMobileNavigation();
  },
  methods: {
    checkMobileNavigation() {
      this.mobileNavigation = window.matchMedia(
        screen && "(max-width:600px)"
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
