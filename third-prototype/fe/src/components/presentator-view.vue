<template>
<div class="presentator-view" tabindex="0"
	@dragover="dragResourceOver"
	@keydown.ctrl.187.prevent="increase"
	@keydown.ctrl.189.prevent="decrease"
	@keydown.ctrl.48.prevent="toggleFullscreen"
	@keydown.ctrl.49.prevent="outFullscreen">
	<resource-viewer v-if="fileViewer" :file="fileViewer"></resource-viewer>
	<drag-and-drop-resources v-if="showDrop" @getFile="gotFile"></drag-and-drop-resources>
	<tree-structure ref="tree"></tree-structure>
	<story-notes></story-notes>
	<story-controls-screen></story-controls-screen>
</div>
</template>

<script>
import story from './story'
import storyControlsScreen from './story-controls-screen'
import storyNotes from './story-notes'
import treeStructure from './tree-structure'
import dragAndDropResources from './drag-and-drop-resources'
import resourceViewer from './resource-viewer'

import { mapState } from 'vuex'
import { apiUrl } from '../main.js'

export default {
	components: {
		story,
		storyControlsScreen,
		storyNotes,
		treeStructure,
		dragAndDropResources,
		resourceViewer,
	},
	data() {
		return {
			showDrop: false,
			fileViewer: null,
		}
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
		dragResourceOver() {
			this.showDrop = true
		},
		gotFile(file) {
			if (file.type.includes('image/')) {
				this.fileViewer = file
			}

			this.sendFile()
		},
		sendFile() {
			const data = new FormData()
			data.append('file', this.fileViewer)

			fetch(`${apiUrl}getFile`, {
				method: 'POST',
				body: data
			}).then(res => res.json())
			.then(res => console.log(res))
			.catch(err => console.error(err))
		},
		increase() {
			this.$refs.tree.zoomIn()
		},
		decrease() {
			this.$refs.tree.zoomOut()
		},
		toggleFullscreen() {
			this.$refs.tree.toggleFullscreen()
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