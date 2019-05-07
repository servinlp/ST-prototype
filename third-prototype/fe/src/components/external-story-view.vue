<template>
<div class="story-container">
	<presentator-view></presentator-view>
</div>
</template>

<script>
import story from './story'
import fullScreen from './full-screen'
import presentatorView from './presentator-view'
import { mapState } from 'vuex'

export default {
	components: {
		story,
		fullScreen,
		presentatorView
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
		this.$store.state.externalView = this.$route.params.room
		this.$nextTick(() => {
			this.$nextTick(() => {
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


