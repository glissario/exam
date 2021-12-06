<template>
  <AllQuestions />

  <img
    style="
      -webkit-user-select: none;
      margin: auto;
      background-color: hsl(0, 0%, 25%);
    "
    src="http://192.168.1.254:8192/"
  />
</template>

<script>
import AllQuestions from "@/components/questions/AllQuestions.vue";
export default {
  components: { AllQuestions },
};
</script>
