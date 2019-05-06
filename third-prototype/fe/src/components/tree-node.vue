<template>
<div class="tree-node">
	<div class="slide" ref="slide" :style="slideStyle" @click="goToSlide" v-html="slides[structure.current].slide" :class="{active: structure.current === slideIndex}"></div>
	<tree-nodes v-for="(item, i) in structure.children" :key="i" :structure="item" :largestLevel="largestLevel"></tree-nodes>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
	name: 'tree-nodes',
	props: ['structure', 'largestLevel'],
	mounted() {
		if (this.structure.current === this.slideIndex) {
			this.$store.state.treeStructureActiveNode = this.$refs.slide.querySelector('svg')
			this.$store.state.treeStructureActiveTree = this.structure
		}
	},
	sockets: {
		goToSlide(index) {
			if (index === this.structure.current) {
				this.goToSlide(index)
			}
		}
	},
	methods: {
		goToSlide(index) {
			if (typeof index !== 'string' ) {
				index = this.structure.current
			}
			this.$store.state.treeStructureActiveNode = this.$refs.slide.querySelector('svg')
			this.$store.state.treeStructureActiveTree = this.structure
			this.$store.state.slideIndex = index
			this.$socket.emit('goToSlide', {
				id: this.$route.params.room,
				index
			})
			this.$store.state.slideIndex = index
			this.$router.push({
				query: { slideIndex: index }
			})
		}
	},
	computed: mapState({
		slides: state => state.slides,
		slideIndex: state => state.slideIndex,
		slideStyle() {
			return {
				width: 60 / this.largestLevel + 'vw'
			}
		}
	})
}
</script>

<style lang="scss">
.tree-node {
	position: relative;
	display: flex;
    justify-content: center;
    justify-content: space-around;
	align-content: flex-start;
    flex-wrap: wrap;

	flex-grow: 1;
    flex-basis: 0;

	.slide {
		flex: 0 0 100%;
		display: flex;
		justify-content: center;
		align-items: flex-start;
		margin-bottom: 10px;

		&.active svg {
			box-shadow: 4px 4px 0 white, -4px -4px 0 white, 4px -4px 0 white, -4px 4px 0 white;
		}	
	}


	svg {
		cursor: pointer;
		width: inherit;
    	height: auto;
	}
}
</style>
