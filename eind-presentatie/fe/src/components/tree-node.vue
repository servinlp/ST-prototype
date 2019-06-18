<template>
<div class="tree-node" :style="treeStyle">
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
		treeStyle() {
			if (this.structure.width) {
				return {
					width: this.structure.width
				}
			}
		},
		slideStyle() {
			if (this.structure.width) {
				return {
				}
			}
		}
	})
}
</script>

<style lang="scss">
.tree-node {
	position: relative;
	display: inline-block;
	vertical-align: top;

	.slide {
		flex: 0 0 100%;
		padding-bottom: 10px;
		width: 6vw;
		display: block;
		margin: 0 auto;
		vertical-align: top;

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
