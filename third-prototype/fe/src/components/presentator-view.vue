<template>
<div class="presentator-view">
	<tree-structure></tree-structure>
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
	display: flex;
	justify-content: space-between;
	
	.story {
		width: 50%;
		display: inline-block;
		vertical-align: top;
	}
}
</style>