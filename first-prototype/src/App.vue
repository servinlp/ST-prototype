<template>
<div id="app">
	<div class="story-container">
		<story></story>
	</div>
</div>
</template>

<script>
import story from './components/story'
export default {
  name: 'app',
  components: {
    story
  }
}
</script>

<style lang="scss">
body {
	margin: 0;
}
#app {
  font-family: 'Open Sans', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.story-container {
	width: 100%;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-content: center;
}
</style>
