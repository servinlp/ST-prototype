<template>
<div id="app">
	<router-view></router-view>
</div>
</template>

<script>
export default {
	name: 'app',
	mounted() {
		this.$store.state.slideIndex = this.$route.query.slideIndex || '1'
	},
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
  color: #2c3e50;
}

button {
	cursor: pointer;
}

:focus {
	outline: none;
}
</style>
