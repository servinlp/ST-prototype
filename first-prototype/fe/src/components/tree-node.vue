<template>
<div class="tree-node">
	<div class="slide" @click="goToSlide" v-html="slides[structure.current].slide" :class="{active: structure.current === slideIndex}"></div>
	<tree-nodes v-for="(item, i) in structure.children" :key="i" :structure="item"></tree-nodes>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
	name: 'tree-nodes',
	props: ['structure'],
	methods: {
		goToSlide() {
			this.$store.state.slideIndex = this.structure.current
			this.$socket.emit('goToSlide', {
				id: this.$route.params.room,
				index: this.structure.current
			})
		}
	},
	computed: mapState([
		'slides',
		'slideIndex',
	])
}
</script>

<style lang="scss">
.tree-node {
	display: flex;
    justify-content: center;
    justify-content: space-around;
	// align-content: center;
    // flex-direction: row;
	align-content: stretch;
    flex-wrap: wrap;

	flex-grow: 1;
    flex-basis: 0;

	.slide {
		flex: 0 0 100%;
		display: flex;
		justify-content: center;
		align-items: flex-start;
		margin-bottom: 5vh;

		&.active svg {
			box-shadow: 4px 4px 0 white, -4px -4px 0 white, 4px -4px 0 white, -4px 4px 0 white;
		}
	}


	svg {
		cursor: pointer;
		width: 8vw;
    	height: auto;
	}
}
</style>
