<template>
  <div class="base-timer container">
    <svg
        class="base-timer__svg"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
    >
      <g class="base-timer__circle">
        <circle
            class="base-timer__path-elapsed"
            cx="50"
            cy="50"
            r="45"
        ></circle>
        <path
            :stroke-dasharray="circleDasharray"
            class="base-timer__path-remaining"
            :class="remainingPathColor"
            d="
            M 50, 50
            m -45, 0
            a 45,45 0 1,0 90,0
            a 45,45 0 1,0 -90,0
          "
        ></path>
      </g>
    </svg>
    <span class="base-timer__label title">{{ formattedTimeLeft }}</span>
  </div>
</template>

<script>

import { ipcRenderer } from "electron";
const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;

const COLOR_CODES = {
  info: {
    color: "green",
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD,
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD,
  },
};
/**
 * @source https://medium.com/js-dojo/how-to-create-an-animated-countdown-timer-with-vue-89738903823f
 */
export default {
  data() {
    return {
      timePassed: 0,
      timerInterval: null,
      isPaused: true,
      timeLimit: 5 * 60, // 5 minutes
    };
  },

  computed: {
    circleDasharray() {
      return `${(this.timeFraction * FULL_DASH_ARRAY).toFixed(0)} 283`;
    },

    formattedTimeLeft() {
      const timeLeft = this.timeLeft;
      const minutes = Math.floor(timeLeft / 60);
      let seconds = timeLeft % 60;

      if (seconds < 10) {
        seconds = `0${seconds}`;
      }

      return `${minutes}:${seconds}`;
    },

    timeLeft() {
      return this.timeLimit - this.timePassed;
    },

    timeFraction() {
      const rawTimeFraction = this.timeLeft / this.timeLimit;
      return rawTimeFraction - (1 / this.timeLimit) * (1 - rawTimeFraction);
    },

    remainingPathColor() {
      const {alert, warning, info} = COLOR_CODES;

      if (this.timeLeft <= alert.threshold) {
        return alert.color;
      } else if (this.timeLeft <= warning.threshold) {
        return warning.color;
      } else {
        return info.color;
      }
    },
  },
  mounted() {
    ipcRenderer.on("timer:start", this.startTimer);
    ipcRenderer.on("timer:pause", () => this.isPaused = true);
    ipcRenderer.on("timer:time-limit", (event, time) => {
      this.onTimesUp();
      this.timeLimit = time;
    });
  },

  watch: {
    timeLeft(newValue) {
      if (newValue === 0) {
        this.onTimesUp();
      }
    },
  },

  methods: {
    onTimesUp() {
      console.log("Time's up!");
      clearInterval(this.timerInterval);
      this.timePassed = 0;
      this.isPaused = true;
      this.timerInterval = null;
    },

    startTimer() {
      this.isPaused = false;
      if (this.timerInterval) {
        return;
      }
      this.timerInterval = setInterval(() => {
        if (this.isPaused) {
          return;
        }
        this.timePassed += 1;
      }, 1000);
    },
  },
};
</script>

<style scoped lang="scss">
.base-timer {
  position: relative;
  width: 650px;
  height: 650px;

  &__svg {
    transform: scaleX(-1);
  }

  &__circle {
    fill: none;
    stroke: none;
  }

  &__path-elapsed {
    stroke-width: 7px;
    stroke: grey;
  }

  &__path-remaining {
    stroke-width: 7px;
    stroke-linecap: round;
    transform: rotate(90deg);
    transform-origin: center;
    transition: 1s linear all;
    fill-rule: nonzero;
    stroke: currentColor;

    &.green {
      color: rgb(65, 184, 131);
    }

    &.orange {
      color: orange;
    }

    &.red {
      color: red;
    }
  }

  &__label {
    position: absolute;
    width: 650px;
    height: 650px;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 250px;
  }
}
</style>
