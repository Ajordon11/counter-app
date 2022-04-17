<template>
  <article class="panel is-primary ">
    <p class="panel-heading">Ovládací panel</p>
    <div class="panel-block is-justify-content-center">
      <div class="field has-addons is-centered">
        <p class="control">
          <button class="button" :class="{ 'is-static': isCountdownPaused}" @click="pauseTimer()">
            <span class="icon">
              <i class="fa fa-pause"></i>
            </span>
          </button>
        </p>
        <p class="control">
          <button class="button" :class="{ 'is-static': !isCountdownPaused}" @click="startTimer()">
            <span class="icon">
              <i class="fa fa-play"></i>
            </span>
          </button>
        </p>
        <p class="control">
          <button class="button" @click="setCountdownLimit(5 * 60)">
            5 minút
          </button>
        </p>
        <p class="control">
          <button class="button" @click="setCountdownLimit(7 * 60)">
            7 minút
          </button>
        </p>
        <p class="control">
          <button class="button" @click="setCountdownLimit(8 * 60)">
            8 minút
          </button>
        </p>
        <p class="control">
          <button class="button" @click="setCountdownLimit(10 * 60)">
            10 minút
          </button>
        </p>
      </div>
    </div>
    <div class="panel-block is-justify-content-center">
      <div class="field has-addons is-centered">
        <div class="control">
          <input type="text" class="input" v-model="team1" @keyup.enter="changeTeam1Name">
        </div>
        <p class="control">
          <button class="button" @click="scoreTeam1()">
            <span class="icon">
              <i class="fa fa-add"></i>
            </span>
          </button>
        </p>
        <p class="control">
          <button class="button" @click="scoreTeam1(true)">
            <span class="icon">
              <i class="fa fa-minus"></i>
            </span>
          </button>
        </p>
      </div>
    </div>
    <div class="panel-block is-justify-content-center">
      <div class="field has-addons is-centered">
        <div class="control">
          <input type="text" class="input" v-model="team2" @keyup.enter="changeTeam2Name">
        </div>
        <p class="control">
          <button class="button" @click="scoreTeam2()">
              <span class="icon">
                <i class="fa fa-add"></i>
              </span>
          </button>
        </p>
        <p class="control">
          <button class="button" @click="scoreTeam2(true)">
              <span class="icon">
                <i class="fa fa-minus"></i>
              </span>
          </button>
        </p>
      </div>
    </div>
    <div class="panel-block is-justify-content-center">
      <div class="field has-addons is-centered">
        <p class="control">
          <button class="button" @click="resetScore()">
            <span class="icon-text">Reset</span>
            <span class="icon">
              <i class="fa fa-refresh"></i>
            </span>
          </button>
        </p>
        <p class="control">
          <button class="button" @click="changeMatchPart()">
            <span class="icon">
              <i class="fa fa-add"></i>
            </span>
          </button>
        </p>
        <p class="control">
          <button class="button" @click="changeMatchPart(true)">
            <span class="icon">
              <i class="fa fa-minus"></i>
            </span>
          </button>
        </p>
        <div class="control">
          <div class="select">
            <select @change="changeTourneyPart">
              <option v-for="part in tourneyParts" :key="part" :value="part">{{ part }}</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import { ipcRenderer } from "electron";

export default {
  name: 'MainToolbar',
  props: {
    title: {
      type: String,
      default: 'Hlavný panel'
    }
  },
  data() {
    return {
      score1: 0,
      score2: 0,
      team1: 'Domaci',
      team2: 'Hostia',
      countdownLimit: 0,
      isCountdownPaused: true,
      matchPart: 1,
      tourneyPart: 'Skupina',
      tourneyParts: ['Skupina', 'Štvrťfinále', 'Semifinále', 'Finále', 'O 3. miesto'],
    }
  },
  methods: {
    scoreTeam1(subtract = false) {
      if (subtract && this.score1 <= 0) {
        return;
      } else if (subtract) {
        this.score1--;
      } else {
        this.score1++;
      }
      ipcRenderer.send('score:team1', this.score1);
    },
    scoreTeam2(subtract = false) {
      if (subtract && this.score2 <= 0) {
        return;
      } else if (subtract) {
        this.score2--;
      } else {
        this.score2++;
      }
      ipcRenderer.send('score:team2', this.score2);
    },
    resetScore() {
      this.score1 = 0;
      this.score2 = 0;
      ipcRenderer.send('score:team1', this.score1);
      ipcRenderer.send('score:team2', this.score2);
    },
    startTimer() {
      this.isCountdownPaused = !this.isCountdownPaused;
      ipcRenderer.send('timer:start');
    },
    pauseTimer() {
      this.isCountdownPaused = !this.isCountdownPaused;
      ipcRenderer.send('timer:pause');
    },
    setCountdownLimit(limit) {
      this.countdownLimit = limit;
      this.isCountdownPaused = true;
      ipcRenderer.send('timer:time-limit', this.countdownLimit);
    },
    changeTeam1Name(event) {
      this.team1 = event.target.value;
      ipcRenderer.send('score:name:team1', this.team1);
    },
    changeTeam2Name(event) {
      this.team2 = event.target.value;
      ipcRenderer.send('score:name:team2', this.team2);
    },
    changeMatchPart(subtract = false) {
      if (subtract && this.matchPart <= 0) {
        return;
      } else if (subtract) {
        this.matchPart--;
      } else {
        this.matchPart++;
      }
      ipcRenderer.send('timer:match-part', this.matchPart);
    },
    changeTourneyPart(event) {
      this.tourneyPart = event.target.value;
      ipcRenderer.send('timer:tourney-part', this.tourneyPart);
    }
  }
}
</script>

<style scoped>
</style>
