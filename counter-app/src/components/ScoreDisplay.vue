<template>
  <div class="tile is-child box">
    <p class="title is-2">{{ team1 }}</p>
    <p class="is-score-text">{{ score1 }}</p>
  </div>
  <div class="tile is-child box">
    <p class="title is-2">{{ team2 }}</p>
    <p class="is-score-text">{{ score2 }}</p>
  </div>
</template>

<script>
import { ipcRenderer } from "electron";

export default {
  name: 'ScoreDisplay',
  data() {
    return {
      score1: 0,
      score2: 0,
      team1: 'Domaci',
      team2: 'Hostia',
    }
  },
  mounted() {
    ipcRenderer.on('score:team1', (event, score) => this.score1 = score);
    ipcRenderer.on('score:team2', (event, score) => this.score2 = score);
    ipcRenderer.on('score:name:team1', (event, name1) => this.team1 = name1);
    ipcRenderer.on('score:name:team2', (event, name2) => this.team2 = name2);
  }
}
</script>

<style>
  .is-score-text {
    font-size: 24vh;
  }
</style>
