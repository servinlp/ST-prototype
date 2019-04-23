<template>
<div class="story">
	<div ref="slide" v-html="slides[slideIndex].slide"></div>
</div>
</template>

<script>

import { mapState } from 'vuex'

export default {
	data() {
		return {
			// slides,
			// slideIndex: this.$route.query.slideIndex || '1',
		}
	},
	mounted() {
		this.$nextTick(() => this.setLinkEvents())
	},
	sockets: {
		goToSlide(index) {
			this.goToSlide(index)
		}
	},
	methods: {
		goToSlide(index) {
			if (index === this.$store.state.slideIndex) return
			this.removeLinkEvents()
			this.$socket.emit('goToSlide', {
				id: this.$route.params.room,
				index
			})
			this.$store.state.slideIndex = index
			this.$router.push({
				query: { slideIndex: index }
			})
			this.$nextTick(() => this.setLinkEvents())
		},
		setLinkEvents() {
			const links = this.$refs.slide.querySelectorAll('[data-link]')
			links.forEach(link => {
				link.addEventListener('click', () => this.goToSlide(link.dataset.link))
			})
		},
		removeLinkEvents() {
			const links = this.$refs.slide.querySelectorAll('[data-link]')
			links.forEach(link => {
				link.removeEventListener('click', () => this.goToSlide(link.dataset.link))
			})
		}
	},
	watch: {
		'$route.query.slideIndex'(to) {
			this.goToSlide(to || '1')
		},
	},
	computed: mapState([
		'externalView',
		'slides',
		'slideIndex',
	])
}
</script>

<style lang="scss">
	.story {
		font-size: 0;
		svg {
			max-width: 100%;
			max-height: 100vh;
			width: auto;
			height: auto;
			text {
				font-family: inherit !important;
			}
		}
		[data-link] {
			cursor: pointer;
		}

		[data-link].BoundingBox {
			position: relative;
			z-index: 1000;
			fill: rgba(0,0,0,0);
		}

		.TextShape {
			pointer-events: none;
		}
	}
</style>
