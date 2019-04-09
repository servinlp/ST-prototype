<template>
<div class="story-container">
	<story ref="story"></story>
	<full-screen v-if="story" v-bind:target="story"></full-screen>
	<p v-if="!externalView">hoi</p>
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
	},
	computed: mapState([
		'externalView'
	])
}
</script>

<style lang="scss">

</style>


