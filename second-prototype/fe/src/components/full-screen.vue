<template>
	<button class="fullscreen" @click="toggleFullscreen">
		<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 125" enable-background="new 0 0 100 100" xml:space="preserve"><g><path d="M39.976,7.321H8.051c-1.719,0-3.112,1.393-3.112,3.112V41.74c0,1.719,1.394,3.112,3.112,3.112   c1.719,0,3.113-1.393,3.113-3.112V13.546h28.812c1.719,0,3.112-1.394,3.112-3.113S41.695,7.321,39.976,7.321z"/><path d="M91.949,7.321H60.023c-1.719,0-3.111,1.393-3.111,3.112s1.393,3.113,3.111,3.113h28.813V41.74   c0,1.719,1.393,3.112,3.113,3.112c1.719,0,3.111-1.393,3.111-3.112V10.433C95.061,8.714,93.668,7.321,91.949,7.321z"/><path d="M39.976,86.246H11.164V58.051c0-1.719-1.394-3.111-3.113-3.111c-1.719,0-3.112,1.393-3.112,3.111v31.309   c0,1.719,1.394,3.111,3.112,3.111h31.925c1.719,0,3.112-1.393,3.112-3.111C43.088,87.639,41.695,86.246,39.976,86.246z"/><path d="M91.949,55.146c-1.721,0-3.113,1.395-3.113,3.113v28.195H60.023c-1.719,0-3.111,1.393-3.111,3.111s1.393,3.113,3.111,3.113   h31.926c1.719,0,3.111-1.395,3.111-3.113V58.26C95.061,56.541,93.668,55.146,91.949,55.146z"/></g></svg>
	</button>
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
	background: none;
	border: none;
	padding: 0;

	svg {
		fill: white;
		width: 20px;
	}
}
</style>


