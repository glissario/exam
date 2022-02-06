<template>
  <div class="about-wrapper">
    <h2>Klausuren-Fragensammlung</h2>
    <p>
      Die MedAssSchaft stellt auf dieser Seite eine Plattform zur Verfügung, auf
      der Prüfungsfragen geteilt werden können.
    </p>
    <p>Auch Literaturtipps für die einzelnen Module können geteilt werden</p>

    <a
      class="insta"
      href="https://instagram.com/med_ass_schaft"
      target="_blank"
      rel="noopenen noopener"
    >
      <img src="@/assets/insta.svg" />
      Follow us!
    </a>
    <a
      class="insta"
      href="https://www.facebook.com/profile.php?id=100070834391839"
      target="_blank"
      rel="noopenen noopener"
    >
      <img src="@/assets/facebook.svg" />
      Like us!
    </a>
  </div>
</template>

<style lang="scss" scoped>
.about-wrapper {
  width: 80%;
  min-height: 10rem;
  margin: 0 auto;
}
img {
  height: 1rem;
  margin: 0;
  width: auto;
  margin-right: 0.25rem;
}
.insta {
  display: flex;
  align-items: center;
  justify-content: center;
}
a {
  text-decoration: none;
  color: var(--third-color);
}
</style>
