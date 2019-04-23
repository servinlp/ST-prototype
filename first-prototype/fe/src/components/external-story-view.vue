<template>
<div class="story-container">
	<story v-if="slideIndex" ref="story"></story>
	<full-screen v-if="story" v-bind:target="story"></full-screen>
</div>
</template>

<script>
import story from './story'
import fullScreen from './full-screen'
import { mapState } from 'vuex'

export default {
	components: {
		story,
		fullScreen
	},
	data() {
		return {
			story: null,
		}
	},
	mounted() {
		if (this.$route.params.room) {
			this.$socket.emit('joinRoom', {id: this.$route.params.room})
		}
		this.$nextTick(() => {
			this.$nextTick(() => {
				console.log(this.$refs.story)
				this.story = this.$refs.story
			})
		})
	},
	sockets: {
		closeStoryView() {
			window.close()
		}
	},
	computed: mapState([
		'externalView',
		'slideIndex',
	])
}
</script>

<style lang="scss">

</style>


