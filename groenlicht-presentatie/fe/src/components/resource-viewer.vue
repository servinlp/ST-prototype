<template>
	<div class="resource-viewer" ref="viewer" @click="stopViewing" @keydown.esc="stopViewing" tabindex="0">
		<button class="mdc-icon-button material-icons" @click="stopViewing">close</button>
		<p v-if="loading">Loading</p>
		<img @click.prevent.stop class="image-resource" v-if="image" :src="image" alt="">
	</div>
</template>

<script>
import { apiUrl } from '../main'
export default {
	props: ['file'],
	data() {
		return {
			image: null,
			loading: false,
		}
	},
	mounted() {
		this.$refs.viewer.focus()
		const type = this.file.type || this.file.mimetype
		if (typeof this.file === 'string') {
			this.fetchImage(this.file)
		} else if (type.includes('image/')) {
			this.loadImage()
		}
	},
	sockets: {
		stopRecourseViewing() {
			this.stopViewing()
		},
	},
	methods: {
		stopViewing() {
			this.$socket.emit('stopRecourseViewing', this.$route.params.room)
			this.$parent.fileViewer = null
		},
		loadImage() {
			const img = new Image();
			const reader = new FileReader();

			this.loading = true

			reader.onload = (e) => {
				this.image = e.target.result;
				this.loading = false
			}
			reader.readAsDataURL(this.file);
		},
		fetchImage(url) {
			this.loading = true
			fetch(apiUrl + url).then(res => res.blob())
			.then(res => {
				const tempURL = new URL(apiUrl)
				this.image = URL.createObjectURL(res)
				this.loading = false
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.resource-viewer {
	position: absolute;
	width: 100%;
	height: 100%;
	z-index: 1;
	background: rgba(0,0,0,0.7);
	display: flex;
	justify-content: center;
	align-items: center;

	p {
		font-size: 7vw;
    	color: white;
	}

	button {
		position: absolute;
		top: 0;
		right: 0;
		color: white;
		font-size: 2rem;
		width: 54px;
    	height: 54px;
	}

	.image-resource {
		width: auto;
		height: auto;
		max-width: 100%;
		max-height: 100%;
		padding: 5vh 5vw;
		box-sizing: border-box;
	}
}
</style>
