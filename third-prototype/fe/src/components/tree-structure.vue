<template>
<div class="tree-structure" ref="treeStructure" v-if="largestLevel">
	<div class="transform-container" :style="scaleStyles">
		<tree-nodes v-for="(item, i) in structure" :key="i" :structure="item" :largestLevel="largestLevel"></tree-nodes>
	</div>
	<div class="zoom">
		<button class="zoom-out mdc-fab mdc-fab--mini" @click="zoomOut">
			<span class="material-icons mdc-fab__icon">zoom_out</span>
			<span class="mdc-fab__label">Zoom out</span>
		</button>
		<button class="zoom-in mdc-fab mdc-fab--mini" @click="zoomIn">
			<span class="material-icons mdc-fab__icon">zoom_in</span>
			<span class="mdc-fab__label">Zoom in</span>
		</button>
		<button class="mdc-fab mdc-fab--mini" @click="toggleFullscreen">
			<span v-if="zoomLevel !== 1" class="material-icons mdc-fab__icon">zoom_out_map</span>
			<svg v-else class="mdc-fab__icon" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24"><defs><path id="SVGID_1_" d="M0 0h24v24H0z"/></defs><clipPath id="SVGID_2_"><use xlink:href="#SVGID_1_" overflow="visible"/></clipPath><path d="M20.4 9.6l-2.3-2.3L21 4.4 19.6 3l-2.9 2.9-2.3-2.3v6h6zm-10.8-6L7.3 5.9 4.4 3 3 4.4l2.9 2.9-2.3 2.3h6v-6zm-6 10.8l2.3 2.3L3 19.6 4.4 21l2.9-2.9 2.3 2.3v-6h-6zm10.8 6l2.3-2.3 2.9 2.9 1.4-1.4-2.9-2.9 2.3-2.3h-6v6z" clip-path="url(#SVGID_2_)"/><g><defs><path id="SVGID_3_" d="M0 0h24v24H0z"/></defs><clipPath id="SVGID_4_"><use xlink:href="#SVGID_3_" overflow="visible"/></clipPath><path d="M0 0h24v24H0V0z" clip-path="url(#SVGID_4_)" fill="none"/></g></svg>
			<span v-if="zoomLevel !== 1" class="mdc-fab__label">Fullscreen</span>
		</button>
	</div>
</div>	
</template>

<script>
import treeNodes from './tree-node'
import structure from './structure'
import { mapState } from 'vuex'

export default {
	components: {
		treeNodes,
	},
	data() {
		return {
			structure,
			largestLevel: null,
			zoomLevel: null,
			tmpZoomLevel: null,
			oldTreeNode: null,
			oldTreeStructure: null,
		}
	},
	mounted() {
		this.largestLevel = this.getLargestLevel(this.structure[0]).reduce((a, b) => a > b ? a : b)
	},
	methods: {
		getLargestLevel(layer, sizes = []) {
			layer.children.forEach(childLayer => {
				sizes.push(childLayer.children.length)
				sizes = this.getLargestLevel(childLayer, sizes)
			})
			return sizes
		},
		zoomOut() {
			const {scale} = this.$store.state.treeStructureActiveTree
			if (!this.zoomLevel) {
				this.zoomLevel = scale - 1
			} else {
				this.zoomLevel -= 1
			}
		},
		zoomIn() {
			const {scale} = this.$store.state.treeStructureActiveTree
			if (!this.zoomLevel) {
				this.zoomLevel = scale + 1
			} else {
				this.zoomLevel += 1
			}
		},
		toggleFullscreen() {
			if (this.zoomLevel === 1) {
				this.outFullscreen()
			} else {
				this.goFullscreen()
			}
		},
		outFullscreen() {
			this.zoomLevel = this.tmpZoomLevel
		},
		goFullscreen() {
			this.tmpZoomLevel = this.zoomLevel
			this.zoomLevel = 1
		}
	},
	watch: {
		'$route.query.slideIndex'() {
			this.oldTreeStructure = null
			this.oldTreeNode = null
		},
	},
	computed: mapState({
		treeStructureActiveTree: (state) => state.treeStructureActiveTree,
		scaleStyles(state) {
			if (!state.treeStructureActiveNode) {
				return {
					transform: ''
				}
			}

			const { scale } = state.treeStructureActiveTree
			const newScale = this.zoomLevel || scale
			return {
				transform: `scale(${newScale})`,
				'transform-origin': state.treeStructureActiveTree['transform-origin']
			}
		}
	}),
	watch: {
		treeStructureActiveTree() {
			this.zoomLevel = null
		}
	},
}
</script>

<style lang="scss">
.tree-structure {
	position: relative;
	display: block;
	width: 100%;
	overflow: hidden;
	.transform-container {
		position: relative;
		transition: transform 0.3s ease, transform-origin 0.3s ease;
	}

	.zoom {
		position: absolute;
		bottom: 0;
		left: 0;
		vertical-align: bottom;

		button {
			background: white;
			padding: 7px;
			margin: 0 0 5px 5px;
			
			svg {
				fill: black;
			}
		}
	}
	.mdc-fab .material-icons {
		color: #2c3e50;
	}
}
</style>
