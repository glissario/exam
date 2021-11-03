<template>
  <img src="./assets/MedAssSchaft.jpg" />
  <div id="nav">
    <top-navigation />
  </div>
  <router-view />
</template>

<script>
import TopNavigation from "@/components/TopNavigation.vue";

export default {
  components: { TopNavigation },
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
</style>
