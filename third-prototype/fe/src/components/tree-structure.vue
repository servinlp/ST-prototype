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
			<span class="material-icons mdc-fab__icon">zoom_out_map</span>
			<span class="mdc-fab__label">Fullscreen</span>
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
			zoomLevel: {},
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
			if (!this.zoomLevel[scale]) {
				this.$set(this.zoomLevel, scale, scale)
			}
			if (this.zoomLevel[scale] !== 1) {
				this.$set(this.zoomLevel, scale, this.zoomLevel[scale] - 1)
			}
		},
		zoomIn() {
			const {scale} = this.$store.state.treeStructureActiveTree
			if (!this.zoomLevel[scale]) {
				this.$set(this.zoomLevel, scale, scale)
			}
			if (this.zoomLevel[scale] !== 10) {
				this.$set(this.zoomLevel, scale, this.zoomLevel[scale] + 1)
			}
		},
		toggleFullscreen() {
			if (this.oldTreeNode) {
				this.$store.state.treeStructureActiveTree = this.oldTreeStructure
				this.$store.state.treeStructureActiveNode = this.oldTreeNode
				this.oldTreeStructure = null
				this.oldTreeNode = null
			} else {
				this.oldTreeStructure = this.$store.state.treeStructureActiveTree
				this.oldTreeNode = this.$store.state.treeStructureActiveNode
				this.$store.state.treeStructureActiveTree = null
				this.$store.state.treeStructureActiveNode = null
			}
		}
	},
	watch: {
		'$route.query.slideIndex'() {
			this.oldTreeStructure = null
			this.oldTreeNode = null
		},
	},
	computed: mapState({
		newScale(state) {
			const { scale } = state.treeStructureActiveTree
			return this.zoomLevel[scale] || scale
		},
		scaleStyles(state) {
			if (!state.treeStructureActiveNode) {
				return {
					transform: ''
				}
			}

			const { translate } = state.treeStructureActiveTree
			return {
				transform: `${translate} scale(${this.newScale})`,
			}
		}
	}),
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

		button {
			background: white;
			padding: 7px;
			margin: 0 0 5px 5px;
		}
	}
	.mdc-fab .material-icons {
		color: #2c3e50;
	}
}
</style>
