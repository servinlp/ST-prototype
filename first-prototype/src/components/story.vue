<template>
<div class="story">
	<div ref="slide" v-html="slides[slideIndex]"></div>
</div>
</template>

<script>
import slides from './slides.js'
import { mapState } from 'vuex'

export default {
	data() {
		return {
			slides,
			slideIndex: this.$route.query.slideIndex || '1',
		}
	},
	mounted() {
		this.$nextTick(() => this.setLinkEvents())
	},
	methods: {
		goToSlide(index) {
			this.removeLinkEvents()
			this.slideIndex = index
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
		externalView(to, from) {
			console.log('externalView', to, from)
		}
	},
	computed: mapState([
		'externalView'
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
		}
		[data-link] {
			cursor: pointer;
		}
	}
</style>
