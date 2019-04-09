<template>
<div id="app">
	<router-view></router-view>
</div>
</template>

<script>
export default {
	name: 'app',
}
</script>

<style lang="scss">
body {
	margin: 0;
	background: #232323;
}
#app {
  font-family: 'Open Sans', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

button {
	cursor: pointer;
}
</style>
