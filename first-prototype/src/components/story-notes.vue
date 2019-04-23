<template>
<div class="notes">
	<button class="smaller" @click="smaller">A</button>
	<button class="larger" @click="larger">A</button>
	<p :style="notesStyle">{{slides[slideIndex].notes}}</p>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
	data() {
		return {
			fontSize: 1,
		}
	},
	methods: {
		smaller() {
			this.fontSize -= 0.1
		},
		larger() {
			this.fontSize += 0.1
		},
	},
	computed: mapState({
		externalView: state => state.externalView,
		slides: state => state.slides,
		slideIndex: state => state.slideIndex,
		notesStyle() {
			return `font-size: ${this.fontSize}rem;`
		}
	})
}
</script>

<style lang="scss">
.notes {
	height: 30vh;

	.smaller,
	.larger {
		color: white;
		background: none;
		border: none;
		text-decoration: underline;
	}
	.smaller {
		font-size: 0.8rem;
	}
	.larger {
		font-size: 1.2rem;
	}
	p {
		height: calc(100% - 2rem);
		overflow: auto;
		background: white;
		padding: 1rem;
		box-sizing: border-box;
		margin-bottom: 0;
		margin-top: 1rem;
	}
}
</style>
