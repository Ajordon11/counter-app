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
    <MainToolbar/>
</template>

<script>
// const { ipcRenderer } = require('electron');


import BaseTimer from "@/components/BaseTimer";
import ScoreDisplay from "@/components/ScoreDisplay";
import MatchPartDisplay from "@/components/MatchPartDisplay";
import MainToolbar from "@/components/MainToolbar";

export default {
  name: 'HelloWorld',
  components: {
    BaseTimer,
    ScoreDisplay,
    MainToolbar,
    MatchPartDisplay
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  html, body {
    overflow: hidden;
  }
</style>
