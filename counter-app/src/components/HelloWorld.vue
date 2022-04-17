<template>
  <div class="tile is-ancestor no-overflow">
    <div class="tile is-5 is-vertical is-parent">
    <ScoreDisplay/>
    </div>
    <div class="tile is-parent">
      <div class="tile is-child box">
        <BaseTimer />
        <MatchPartDisplay />
      </div>
    </div>
  </div>
</template>

<script>


import BaseTimer from "@/components/BaseTimer";
import ScoreDisplay from "@/components/ScoreDisplay";
import MatchPartDisplay from "@/components/MatchPartDisplay";
import { ipcRenderer } from "electron";
export default {
  name: 'HelloWorld',
  components: {
    BaseTimer,
    ScoreDisplay,
    MatchPartDisplay
  },
  mounted() {
    ipcRenderer.on('main-test', (event, payload)  => console.log('event captured in hello world ', payload));
  },
  methods: {
    click() {
      ipcRenderer.send('test', 'hello to main');
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  html, body {
    overflow: hidden;
  }
</style>
