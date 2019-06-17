<template>
<div class="story-container">
	<question-popup v-if="question"></question-popup>
	<resource-viewer v-if="fileViewer" :file="fileViewer"></resource-viewer>
	<story v-if="slideIndex" ref="story"></story> 
	<full-screen v-if="story" v-bind:target="story"></full-screen>
</div>
</template>

<script>
import story from './story'
import fullScreen from './full-screen'
import presentatorView from './presentator-view'
import enterStoryView from './enter-story-view'
import questionPopup from './question-popup'
import { mapState } from 'vuex'

import { apiUrl } from '../main'

export default {
	components: {
		story,
		fullScreen,
		enterStoryView,
		presentatorView,
		questionPopup,
	},
	data() {
		return {
			story: null,
			fileViewer: null,
			es: null,
		}
	},
	sockets: {
		closeStoryView() {
			window.close()
		},
		showQuestion(question) {
			this.$store.state.question = question
		},
	},
	mounted() {
		if (this.$route.params.room) {
			this.$socket.emit('joinRoom', {id: this.$route.params.room})
		}
		this.$store.state.externalView = this.$route.params.room
		this.$nextTick(() => {
			this.$nextTick(() => {
				this.story = this.$refs.story
			})
		})

		this.es = new EventSource(`${apiUrl}stream`)
		this.es.onerror = () => {
			setTimeout(() => {
				this.es = new EventSource(`${apiUrl}stream`)
			}, 2000)
		}
		this.es.addEventListener('receiveFile', e => {
			this.fileViewer = JSON.parse(e.data)
		})
	},
	computed: mapState([
		'externalView',
		'slideIndex',
		'question',
	])
}
</script>

<style lang="scss">

</style>


