<template>
	<button class="fullscreen mdc-icon-button material-icons" @click="toggleFullscreen">fullscreen</button>
</template>

<script>
export default {
	props: [ 'target' ],
	methods: {
		toggleFullscreen() {
			if (!document.webkitFullscreenElement) {
				document.documentElement.webkitRequestFullscreen();
			} else if (document.webkitExitFullscreen) {
				document.webkitExitFullscreen(); 
			}
		}
	}
}
</script>

<style lang="scss">
.fullscreen {
	position: fixed;
	bottom: 20px;
	right: 20px;
	color: white;
}
</style>


