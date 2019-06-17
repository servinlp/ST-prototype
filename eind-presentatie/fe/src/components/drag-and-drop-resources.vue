<template>
	<div class="drag-and-drop"
	@dragend="dragEnd"
	@dragexit="dragEnd"
	@dragleave="dragEnd"
	@drop="drop">
		<p class="title">Drop it!</p>
		<input type="file">
	</div>
</template>

<script>
export default {
	data() {
		return {
			dragOver: false
		}
	},
	methods: {
		dragOverIt() {
			this.dragOver = true
		},
		dragEnd() {
			this.$parent.showDrop = false
		},
		drop(e) {
			e.preventDefault()
			e.stopPropagation()
			this.$emit('getFile', e.dataTransfer.files[0])
			this.dragEnd()
		},
	}
}
</script>

<style lang="scss" scoped>
.drag-and-drop {
	position: absolute;
	z-index: 1;
	width: 100%;
	height: 100%;
	background: rgba(255, 255, 255, 0.3);

	.title {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-size: 7vw;
		margin: 0;
		pointer-events: none;
	}

	input {
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: -1;
		opacity: 0;
	}
}
</style>

