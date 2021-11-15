<template>
  <img src="./assets/MedAssSchaft.jpg" />
  <TopNavigation />
  <div class="mobile-wrapper">
    <MobileNavigation />
    <router-view />
  </div>
  <footer-view />
</template>

<script>
import TopNavigation from "@/components/navigation/TopNavigation.vue";
import MobileNavigation from "@/components/navigation/MobileNavigation.vue";

import FooterView from "@/views/FooterView.vue";

export default {
  components: { TopNavigation, MobileNavigation, FooterView },
};
</script>
<style lang="scss">
:root {
  --font-color: #300044;
  --secondary-color: #006874;
  --third-color: #ad6a6c;
  --background-color: #573643;
  --white-color: #fafafa;
  font-size: 18px;
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
  h1 {
    font-size: 2rem;
  }
  h2 {
    font-size: 1.8rem;
  }
  h3 {
    font-size: 1.5rem;
  }
}

img {
  margin: 0 auto;
  max-width: 250px;
}

.p-button {
  margin: 5rem;
}

@media screen and (max-width: 600px) {
  html {
    h2 {
      font-size: 1.5rem;
    }
    label {
      font-size: 0.6rem;
    }
  }
  .mobile-wrapper {
    display: flex;
    flex-direction: row;
    align-items: start;
    justify-content: center;
  }
}
</style>
