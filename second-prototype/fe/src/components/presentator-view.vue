<template>
<div class="presentator-view">
	<story v-if="slideIndex" ref="story"></story>
	<!-- <tree-structure></tree-structure> -->
	<story-notes></story-notes>
	<story-controls-screen></story-controls-screen>
</div>
</template>

<script>
import story from './story'
import storyControlsScreen from './story-controls-screen'
import storyNotes from './story-notes'
import treeStructure from './tree-structure'

import { mapState } from 'vuex'
import { apiUrl } from '../main.js'

export default {
	components: {
		story,
		storyControlsScreen,
		storyNotes,
		treeStructure,
	},
	mounted() {
		window.addEventListener('unload', this.beforeUnload)
	},
	destroyed() {
		window.removeEventListener('unload', this.beforeUnload)
	},
	methods: {
		beforeUnload() {
			navigator.sendBeacon(apiUrl + '/unload', this.$route.params.room);
		},
	},
	computed: mapState([
		'slideIndex'
	])
}
</script>

<style lang="scss">
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