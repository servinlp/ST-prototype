<template>
<div v-on:keydown.delete="goBack" v-on:keydown.left="goBack" v-on:keydown.right="goForward">
	<div class="story-container">
		<resource-viewer v-if="fileViewer" :file="fileViewer"></resource-viewer>
		<story v-if="slideIndex" ref="story"></story>
		<enter-story-view v-if="!externalView"></enter-story-view>
		<full-screen v-if="story" v-bind:target="story"></full-screen>
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
import resourceViewer from './resource-viewer'

import { apiUrl } from '../main'

export default {
	components: {
		story,
		fullScreen,
		enterStoryView,
		storyControlsScreen,
		storyNotes,
		treeStructure,
		resourceViewer,
	},
	data() {
		return {
			story: null,
			prevRoute: null,
			es: null,
			fileViewer: null,
		}
	},
	sockets: {
		joinedRoom(data) {
			this.$router.push({
				name: 'story',
				params: { room: data.id },
				query: { slideIndex: this.$route.query.slideIndex },
			})
		},
		closeStoryView() {
			this.$router.push({
				name: 'story',
				params: { room: '' },
				query: { slideIndex: this.$route.query.slideIndex },
			})
			this.$store.commit('removeExternalView')
		},
	},
	mounted() {
		if (this.$route.params.room) {
			this.$router.replace({
				name: 'story-home',
				query: {
					slideIndex: this.$route.query.slideIndex
				},
			})
		}
		this.$store.state.externalView = this.$route.params.room

		this.es = new EventSource(`${apiUrl}stream`)
		this.es.onerror = () => {
			setTimeout(() => {
				this.es = new EventSource(`${apiUrl}stream`)
			}, 2000)
		}
		this.es.addEventListener('receiveFile', e => {
			this.fileViewer = JSON.parse(e.data)
		})

		this.$nextTick(() => {
			this.$nextTick(() => {
				this.story = this.$refs.story
			})
		})
		if (this.$route.params.room) {
			this.$socket.emit('joinRoom', {id: this.$route.params.room})
		}
	},
	methods: {
		goBack() {
			if (this.prevRoute) return
			this.$router.push(this.prevRoute, () => {
				if (this.$router.params.room) {
					this.$socket.emit('goToSlide', {
						id: this.$route.params.room,
						index: this.$route.query.slideIndex
					})
				}
			})
		},
		goForward() {
			const layer = this.findCurrentStructure(this.$store.state.structure)
			if (layer.children.length !== 1) return
			const index = layer.children[0].current
			this.$router.push({
				query: { slideIndex: index }
			})
			this.$socket.emit('goToSlide', {
				id: this.$route.params.room,
				index
			})
		},
		findCurrentStructure(structure) {
			let l
			structure.children.forEach(child => {
				if (child.current === this.$store.state.slideIndex) {
					l = child
				} else {
					const p = this.findCurrentStructure(child)
					if (p) l = p
				}
			})

			return l
		},
	},
	watch: {
		'$route'(to, from) {
			this.prevRoute = from
		},
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
</style>

