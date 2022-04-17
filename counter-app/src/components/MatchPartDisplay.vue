<template>
  <p class="is-huge is-center">{{ matchPart }}.</p>
  <p class="title is-3">{{ tourneyPart }}</p>
</template>

<script>
import { ipcRenderer } from "electron";

export default {
  name: 'MatchPartDisplay',
  data() {
    return {
      matchPart: 1,
      tourneyPart: 'Skupina',
    };
  },
  mounted() {
    ipcRenderer.on('timer:match-part', (event, part) => this.matchPart = part);
    ipcRenderer.on('timer:tourney-part', (event, part)  => this.tourneyPart = part);
  }
}
</script>

<style scoped>
.is-huge {
  font-size: 10vh;
}
</style>
