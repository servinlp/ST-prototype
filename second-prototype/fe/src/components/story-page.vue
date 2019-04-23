<template>
<div>
	<div v-if="!externalView" class="story-container">
		<story v-if="slideIndex" ref="story"></story>
		<full-screen v-if="story" v-bind:target="story"></full-screen>
		<enter-story-view></enter-story-view>
	</div>
	<div v-else class="presentator-view">
		<story v-if="slideIndex" ref="story"></story>
		<tree-structure></tree-structure>
		<story-notes></story-notes>
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
import storyNotes from './story-notes'
import treeStructure from './tree-structure'

export default {
	components: {
		story,
		fullScreen,
		enterStoryView,
		storyControlsScreen,
		storyNotes,
		treeStructure,
	},
	data() {
		return {
			story: null,
		}
	},
	mounted() {
		this.$nextTick(() => {
			this.$nextTick(() => {
				this.story = this.$refs.story
				console.log(this.story, this.slideIndex)
			})
		})
		if (this.$route.params.room) {
			this.$socket.emit('joinRoom', {id: this.$route.params.room})
		}
	},
	computed: mapState([
		'externalView',
		'slideIndex'
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
.presentator-view {
	font-size: 0;
	.story {
		width: 50%;
		display: inline-block;
		vertical-align: top;
	}
	.tree-structure {
		width: 50%;
		height: 70vh;
		display: inline-block;
	}
	.notes {
		// flex: 0 0 100%;
	}
}
</style>

