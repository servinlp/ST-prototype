<template>
<div class="story-container">
	<story ref="story"></story>
	<full-screen v-if="story" v-bind:target="story"></full-screen>
</div>
</template>

<script>
import story from './story'
import fullScreen from './full-screen'
export default {
	components: {
		story,
		fullScreen
	},
	data() {
		return {
			story: null
		}
	},
	mounted() {
		this.story = this.$refs.story
	},
}
</script>

<style lang="scss">
.story-container {
	width: 100%;
	height: 100vh;
	display: flex;
	justify-content: center;
	flex-direction: column;
}
</style>

