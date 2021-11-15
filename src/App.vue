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
:root {
  --font-color: #300044;
  --secondary-color: #006874;
  --third-color: #ad6a6c;
  --background-color: #573643;
  --white-color: #fafafa;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--font-color);
  background-color: var(--white-color);
  max-width: 50rem;
  margin: 0 auto;
}
html {
  background-color: var(--background-color);
}

img {
  margin: 0;
  max-width: 250px;
}

.p-button {
  margin: 5rem;
}
</style>
