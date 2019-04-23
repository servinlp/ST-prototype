<template>
	<div class="story-controls-screen">
		<enter-story-view></enter-story-view>
	</div>
</template>

<script>
import enterStoryView from './enter-story-view'
export default {
	components: {
		enterStoryView,
	},
	mounted() {
		// document.addEventListener('storage', )
	},
	destory() {
		// document.removeEventListener('storage', )
	},
	methods: {
		storageSwitch() {}
	}
}
</script>

<style lang="scss">
.story-controls-screen {

}
</style>
