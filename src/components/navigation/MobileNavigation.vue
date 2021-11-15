<template>
  <nav
    v-if="this.$store.state.user !== null && mobileNavigation"
    class="nav-wrapper"
  >
    <ul class="nav-list">
      <router-link class="nav-element" :to="{ name: 'About' }"
        >Über uns</router-link
      >
      <router-link class="nav-element" :to="{ name: 'Moduls' }"
        >Module einsehen</router-link
      >
      <router-link class="nav-element" :to="{ name: 'Questions' }"
        >Fragen eingeben</router-link
      >
      <router-link class="nav-element" :to="{ name: 'Literatur' }"
        >Literatur</router-link
      >
    </ul>
  </nav>
</template>

<script>
export default {
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

<style lang="scss" scoped>
.nav-wrapper {
  padding: 0;
  _position: relative;
  _top: 0;
  _left: 0;
  z-index: 1;
  width: 6rem;
  height: 100%;
  background-color: var(--white-color);
  transition: 400ms ease-in-out;

  .nav-list {
    all: unset;
    list-style: none;
    display: flex;
    flex-flow: column;
    align-items: center;
    margin: 0;
    padding: 0;
    height: 100%;

    .nav-element {
      display: block;
      width: 85%;
      min-width: 2.5rem;
      margin: 0.5rem 0.125rem;
      font-size: 0.7rem;
      transition: max-width 400ms ease-in-out;
      color: blue;
    }
    .nav-element:hover {
      width: 85%;
      min-width: 2.5rem;
      margin: 0.5rem 0.125rem;
      transition: max-width 400ms ease-in-out;
      color: orange;
    }
  }
}
</style>
