<template>
  <div class="container">
    <BaseTimer :time-limit="60"/>
    <ScoreDisplay :match="match"/>
    <button class="button" @click="addScore">Gol domaci</button>
  </div>
</template>

<script>
import BaseTimer from "@/components/BaseTimer";
import ScoreDisplay from "@/components/ScoreDisplay";

export default {
  name: 'HelloWorld',
  components: {
    BaseTimer,
    ScoreDisplay
  },
  props: {
    msg: String
  },
  data() {
    return {
      match: {
        team1: "Kalamicki diabli",
        team2: "Ruzomberski zradcovia",
        score1: 0,
        score2: 1,
      }
    }
  },
  methods: {
    addScore() {
      this.emitter.emit('addScore', this.match.score2++);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
