<template>
  <img src="./assets/MedAssSchaft.jpg" />
  <div id="nav">
    <top-navigation />
  </div>
  <router-view />

  <footer-view />
</template>

<script>
import TopNavigation from "@/components/TopNavigation.vue";

import FooterView from "@/views/FooterView.vue";

export default {
  components: { TopNavigation, FooterView },
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: white;
  max-width: 50rem;
  margin: 0 auto;
}
html {
  background-color: #573643;
}

img {
  margin: 0;
  max-width: 250px;
}

#nav {
  padding: 30px 0;

  a {
    font-weight: bold;
    &.router-link-exact-active {
    }
  }
}

.p-button {
  margin: 5rem;
}
</style>
