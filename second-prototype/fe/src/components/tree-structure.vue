<template>
<div class="tree-structure">
	<tree-nodes v-for="(item, i) in structure" :key="i" :structure="item"></tree-nodes>
</div>	
</template>

<script>
import treeNodes from './tree-node'
import structure from './structure'

export default {
	components: {
		treeNodes,
	},
	data() {
		return {
			structure
		}
	}
}
</script>

<style lang="scss">
.tree-structure {
	overflow: auto;
// 	width: 50%;
// 	display: inline-flex;
//     height: 70vh;
//     justify-content: center;
//     flex-direction: row;
//     flex-wrap: wrap;

// 	svg {
// 		width: auto;
//     	height: 100px;
// 	}
}
</style>
