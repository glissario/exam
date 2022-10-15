<template>
  <li class="literature-details">
    <h3 @click="showDetails = !showDetails">{{ title }}</h3>
    <p v-if="showDetails">{{ details }}</p>
    <div class="author-wrapper">
      <p class="like" @click="voting" :style="{ fontWeight: litIsVoted }">
        {{ "Gefällt mir (" + overallVotes + ")" }}
      </p>
      <div class="space"></div>
      <!--p v-if="showDetails" class="author">{{ author }}</p-->
    </div>
  </li>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";

import { doc, setDoc, getDoc } from "firebase/firestore";
import firestore from "@/firestore.js";

export default defineComponent({
  name: "LiteratureDetails",
  data() {
    return {
      showDetails: false,
      isVoted: false,
      overallVotes: 0,
    };
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
  },
  async created() {
    const userVote = await getDoc(
      doc(firestore, "literature", this.title, "voting", this.author)
    );
    if (userVote.exists()) {
      userVote.data().voted == 1
        ? (this.isVoted = true)
        : (this.isVoted = false);
    }
    const overallVote = await getDoc(
      doc(firestore, "literature", this.title, "voting", "overall")
    );
    if (overallVote.exists()) {
      this.overallVotes = overallVote.data().voted;
    }
  },
  computed: {
    litIsVoted() {
      return this.isVoted ? "bold" : "normal";
    },
  },
  methods: {
    voting() {
      this.isVoted ? this.overallVotes-- : this.overallVotes++;
      this.isVoted = !this.isVoted;
      this.voteLiterature();
    },
    async voteLiterature() {
      await setDoc(
        doc(firestore, "literature", this.title, "voting", this.author),
        {
          voted: this.isVoted ? 1 : 0,
        }
      );
      await setDoc(
        doc(firestore, "literature", this.title, "voting", "overall"),
        {
          voted: this.overallVotes,
        }
      );
    },
  },
});
</script>

<style lang="scss" scoped>
.literature-details {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  list-style: none;
  border: 1px solid var(--background-color);

  .author-wrapper {
    display: flex;
    flex-direction: row;
    width: 100%;
    .space {
      width: 100%;
    }
    p {
      color: var(--third-color);
      width: 25%;
    }
    .like {
      cursor: pointer;
    }
  }
}
</style>
