<template>
<div class="tree-structure" ref="treeStructure" v-if="largestLevel">
	<div class="transform-container" :style="scaleStyles">
		<tree-nodes v-for="(item, i) in structure" :key="i" :structure="item" :largestLevel="largestLevel"></tree-nodes>
	</div>
	<div class="zoom">
		<button class="zoom-out" v-on:click="zoomOut">
			<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 40" x="0px" y="0px"><title>zoom-out</title><path d="M31.008 27.231l-7.58-6.447c-0.784-0.705-1.622-1.029-2.299-0.998 1.789-2.096 2.87-4.815 2.87-7.787 0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12c2.972 0 5.691-1.081 7.787-2.87-0.031 0.677 0.293 1.515 0.998 2.299l6.447 7.58c1.104 1.226 2.907 1.33 4.007 0.23s0.997-2.903-0.23-4.007zM12 20c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zM6 10h12v4h-12z"/></svg>
		</button>
		<button class="zoom-in" v-on:click="zoomIn">
			<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 40" x="0px" y="0px"><title>zoom-in</title><path d="M31.008 27.231l-7.58-6.447c-0.784-0.705-1.622-1.029-2.299-0.998 1.789-2.096 2.87-4.815 2.87-7.787 0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12c2.972 0 5.691-1.081 7.787-2.87-0.031 0.677 0.293 1.515 0.998 2.299l6.447 7.58c1.104 1.226 2.907 1.33 4.007 0.23s0.997-2.903-0.23-4.007zM12 20c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zM14 6h-4v4h-4v4h4v4h4v-4h4v-4h-4z"/></svg>
		</button>
		<button v-on:click="toggleFullscreen">
			<svg v-if="!oldTreeNode" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 32 40" x="0px" y="0px"><title>maximize</title><path d="M1.14-0.001c-0.63 0.001-1.141 0.512-1.141 1.142 0 0.056 0.004 0.111 0.012 0.166l-0.001-0.006v8.989c0 0.005 0 0.010 0 0.016 0 0.631 0.512 1.142 1.142 1.142s1.142-0.511 1.142-1.142c0-0.006 0-0.011 0-0.017v0.001-6.379l7.188 7.188c0.207 0.207 0.492 0.334 0.807 0.334 0.631 0 1.142-0.512 1.142-1.142 0-0.316-0.128-0.601-0.335-0.808l-7.188-7.188h6.38c0.005 0 0.010 0 0.016 0 0.631 0 1.142-0.512 1.142-1.142s-0.511-1.142-1.142-1.142c-0.006 0-0.011 0-0.017 0h-8.997c-0.045-0.007-0.098-0.011-0.151-0.011zM30.826 0c-0.044 0.001-0.086 0.005-0.127 0.011l0.006-0.001h-8.995c-0.005 0-0.010 0-0.016 0-0.631 0-1.142 0.511-1.142 1.142s0.511 1.142 1.142 1.142c0.006 0 0.011 0 0.017 0h6.379l-7.188 7.188c-0.207 0.207-0.335 0.492-0.335 0.808 0 0.631 0.512 1.142 1.143 1.142 0.315 0 0.601-0.128 0.808-0.334l7.188-7.188v6.379c0 0.005 0 0.010 0 0.016 0 0.631 0.511 1.142 1.142 1.142s1.142-0.511 1.142-1.142c0-0.006 0-0.011 0-0.017v0.001-8.997c0.006-0.045 0.010-0.098 0.010-0.151 0-0.631-0.511-1.142-1.142-1.142-0.011 0-0.023 0-0.034 0.001h0.002zM1.135 20.554c-0.624 0.010-1.126 0.517-1.126 1.142 0 0.006 0 0.011 0 0.017v-0.001 9.137c0 0.001 0 0.002 0 0.003s0 0.002 0 0.003v0c0 0.033 0.002 0.066 0.005 0.098l-0.001-0.005c0.001 0.009 0.001 0.014 0.001 0.019v-0.004c0.003 0.034 0.008 0.063 0.013 0.092l-0.001-0.007c0.003 0.018 0.005 0.029 0.007 0.039l-0.001-0.007c0.024 0.111 0.061 0.21 0.109 0.3l-0.003-0.006c0.007 0.015 0.012 0.023 0.017 0.031l-0.003-0.006c0.017 0.030 0.031 0.054 0.047 0.078l-0.003-0.004c0.007 0.012 0.012 0.019 0.017 0.026l-0.003-0.004c0.064 0.091 0.137 0.17 0.22 0.237l0.002 0.002c0.003 0.002 0.006 0.006 0.010 0.009l0.001 0.001c0.186 0.147 0.422 0.238 0.679 0.244h0.001c0.006 0.001 0.015 0.001 0.025 0.001h9.139c0.005 0 0.010 0 0.016 0 0.631 0 1.142-0.511 1.142-1.142s-0.511-1.142-1.142-1.142c-0.006 0-0.011 0-0.017 0h-6.378l7.187-7.188c0.213-0.208 0.345-0.497 0.345-0.818 0-0.631-0.511-1.142-1.142-1.142-0.011 0-0.023 0-0.034 0.001h0.002c-0.308 0.009-0.585 0.139-0.785 0.344v0l-7.188 7.188v-6.38c0-0.005 0-0.010 0-0.015 0-0.631-0.512-1.142-1.142-1.142-0.006 0-0.012 0-0.018 0h0.001zM30.832 20.554c-0.624 0.010-1.126 0.517-1.126 1.142 0 0.006 0 0.011 0 0.017v-0.001 6.38l-7.188-7.188c-0.208-0.214-0.498-0.346-0.819-0.346-0.001 0-0.001 0-0.001 0v0c-0.63 0.001-1.141 0.512-1.141 1.142 0 0.321 0.133 0.611 0.346 0.818l7.187 7.188h-6.379c-0.005 0-0.010 0-0.016 0-0.631 0-1.142 0.511-1.142 1.142s0.511 1.142 1.142 1.142c0.006 0 0.011 0 0.017 0h9.136c0.12 0 0.237-0.019 0.346-0.054l-0.008 0.002c0.007-0.003 0.008-0.004 0.009-0.004l-0.006 0.003c0.043-0.013 0.078-0.026 0.113-0.041l-0.007 0.003c0.009-0.004 0.011-0.005 0.013-0.006l-0.006 0.003c0.039-0.017 0.071-0.033 0.102-0.050l-0.006 0.003c0.005-0.003 0.006-0.005 0.007-0.005l-0.003 0.002c0.059-0.033 0.109-0.066 0.156-0.103l-0.002 0.002c0.017-0.013 0.030-0.024 0.044-0.036l-0.002 0.001c0.026-0.022 0.049-0.044 0.071-0.067v0c0.001-0.001 0.002-0.002 0.003-0.003v0c0.050-0.052 0.096-0.109 0.135-0.171l0.003-0.005c-0.003 0.006-0.002 0.005-0.002 0.005l0.003-0.006c0.017-0.026 0.036-0.058 0.053-0.091l0.003-0.006c-0.003 0.006-0.002 0.005-0.002 0.005l0.003-0.006c0.031-0.060 0.059-0.13 0.079-0.203l0.002-0.008c-0.001 0.006-0.001 0.005-0.001 0.003l0.002-0.008c0.023-0.082 0.037-0.175 0.039-0.272v-0.001c0.001-0.006 0.001-0.015 0.001-0.025v-9.139c0-0.005 0-0.010 0-0.015 0-0.631-0.511-1.142-1.142-1.142-0.006 0-0.012 0-0.018 0h0.001z"/></svg>
			<svg v-else xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 125" style="enable-background:new 0 0 100 100;" xml:space="preserve"><path d="M41,24.3V38c0,1.7-1.3,3-3,3H24.3c-1.7,0-3-1.3-3-3s1.3-3,3-3h6.4L5.9,10.1c-1.2-1.2-1.2-3.1,0-4.2C7,4.7,9,4.7,10.1,5.9  L35,30.8v-6.4c0-1.7,1.3-3,3-3S41,22.7,41,24.3z M38,59H24.3c-1.7,0-3,1.3-3,3s1.3,3,3,3h6.4L5.9,89.9c-1.2,1.2-1.2,3.1,0,4.2  C6.5,94.7,7.2,95,8,95s1.5-0.3,2.1-0.9L35,69.2v6.4c0,1.7,1.3,3,3,3s3-1.3,3-3V62C41,60.3,39.7,59,38,59z M62,41h13.7  c1.7,0,3-1.3,3-3s-1.3-3-3-3h-6.4l24.9-24.9c1.2-1.2,1.2-3.1,0-4.2c-1.2-1.2-3.1-1.2-4.2,0L65,30.8v-6.4c0-1.7-1.3-3-3-3s-3,1.3-3,3  V38C59,39.7,60.3,41,62,41z M69.2,65h6.4c1.7,0,3-1.3,3-3s-1.3-3-3-3H62c-1.7,0-3,1.3-3,3v13.7c0,1.7,1.3,3,3,3s3-1.3,3-3v-6.4  l24.9,24.9c0.6,0.6,1.4,0.9,2.1,0.9s1.5-0.3,2.1-0.9c1.2-1.2,1.2-3.1,0-4.2L69.2,65z"/></svg>
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
		transition: transform 0.3s ease;
	}

	.zoom {
		position: absolute;
		bottom: 0;
		left: 0;

		button {
			background: white;
			    width: 40px;
				height: 40px;
				padding: 7px;
				border: none;
				margin-left: 5px;

			svg {
				fill: #2c3e50;
			}
		}
	}
}
</style>
