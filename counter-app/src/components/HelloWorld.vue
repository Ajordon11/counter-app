<template>
  <div class="container">
    <BaseTimer :time-limit="60"/>
  </div>
</template>

<script>
import BaseTimer from "@/components/BaseTimer";

export default {
  name: 'HelloWorld',
  components: {
    BaseTimer
  },
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
