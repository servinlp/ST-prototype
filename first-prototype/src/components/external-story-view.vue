<template>
<div class="story-container">
	<story ref="story"></story>
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
		this.story = this.$refs.story
		if (this.$route.params.room) {
			this.$socket.emit('joinRoom', {hi: 'asdas', id: this.$route.params.room})
		}
	},
	sockets: {
		closeStoryView() {
			window.close()
		}
	},
	computed: mapState({
		externalView: state => state.n.state.externalView
	})
}
</script>

<style lang="scss">

</style>


