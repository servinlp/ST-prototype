<template>
<div class="tree-structure">
	<tree-nodes v-for="(item, i) in structure" :key="i" :structure="item"></tree-nodes>
</div>	
</template>

<script>
import treeNodes from './tree-node'

export default {
	components: {
		treeNodes,
	},
	data() {
		return {
			structure: [
				{
					current: '1',
					children: [
						{
							current: '2.1',
							children: [
								{
									current: '2.1.1'
								}
							]
						},
						{
							current: '2.2'
						},
						{
							current: '2.3',
							children: [
								{
									current: '2.3.1'
								},
								{
									current: '2.3.2'
								}
							]
						}
					]
				}
			]
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
