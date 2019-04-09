<template>
<div>
	<div v-if="!externalView" class="story-container">
		<story ref="story"></story>
		<full-screen v-if="story" v-bind:target="story"></full-screen>
		<enter-story-view></enter-story-view>
	</div>
	<div v-else>
		<story-controls-screen></story-controls-screen>
	</div>
</div>
</template>

<script>
import { mapState } from 'vuex'

import story from './story'
import fullScreen from './full-screen'
import enterStoryView from './enter-story-view'
import storyControlsScreen from './story-controls-screen'

export default {
	components: {
		story,
		fullScreen,
		enterStoryView,
		storyControlsScreen,
	},
	data() {
		return {
			story: null,
		}
	},
	mounted() {
		this.story = this.$refs.story
		if (this.$route.params.room) {
			this.$socket.emit('joinRoom', {id: this.$route.params.room})
		}
	},
	computed: mapState([
		'externalView'
	])
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

