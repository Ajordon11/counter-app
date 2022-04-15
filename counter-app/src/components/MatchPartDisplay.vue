<template>
  <p class="is-huge is-center">{{ matchPart }}.</p>
  <p class="title is-3">Finale</p>
</template>

<script>
// const { ipcRenderer } = require('electron');

export default {
  name: 'MatchPartDisplay',
  data() {
    return {
      matchPart: 1,
    };
  },
  mounted() {
    this.emitter.on('timer:match-part', (part) => this.matchPart = part);
  }
}
</script>

<style scoped>
.is-huge {
  font-size: 10vh;
}
</style>
