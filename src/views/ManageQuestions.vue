<template>
  <AllQuestions />

  <img src="http://192.168.1.254:8192/" />
</template>

<script>
import AllQuestions from "@/components/questions/AllQuestions.vue";
export default {
  components: { AllQuestions },
};
</script>

<style>
img {
  height: 100%;
  width: 100%;
}
</style>
