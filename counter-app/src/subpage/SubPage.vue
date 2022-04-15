<template>
  <MainToolbar/>
</template>

<script>

import MainToolbar from "@/components/MainToolbar";

export default {
  name: 'SubPage',
  components: {
    MainToolbar
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  overflow: hidden;
}
</style>
