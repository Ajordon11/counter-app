<template>
  <div class="score">
    <div class="score__team">
      <div class="score__team-name subtitle">{{ match.team1 }}</div>
      <div class="score__team-score title">{{ match.score1 }}</div>
    </div>
    <div class="score__team">
      <div class="score__team-name subtitle">{{ match.team2 }}</div>
      <div class="score__team-score title">{{ score2 }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScoreDisplay',
  props: {
    match: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      score2: this.match.score2
    }
  },
  mounted() {
    this.emitter.on('addScore', score => {
          this.score2 = score;
        }
    );
  }
}
</script>

<style>

</style>
