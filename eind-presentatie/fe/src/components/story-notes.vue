<template>
<div class="notes" v-if="slideIndex">
	<button class="smaller" @click="smaller">A</button>
	<button class="larger" @click="larger">A</button>
	<p :style="notesStyle">{{slides[slideIndex].notes}}</p>
	<presenter-timer></presenter-timer>
	<presenter-questions></presenter-questions>
</div>
</template>

<script>
import { mapState } from 'vuex'
import presenterQuestions from './presenter-questions'
import presenterTimer from './presenter-timer'

export default {
	components: {
		presenterTimer,
		presenterQuestions,
	},
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
	position: relative;
	width: 50%;

	.smaller,
	.larger {
		position: absolute;
		background: none;
		border: none;
		text-decoration: underline;
		z-index: 1;
	}
	.smaller {
		right: 20px;
		font-size: 0.8rem;
	}
	.larger {
		right: 0;
		font-size: 1.2rem;
	}
	
	> p {
		height: 100vh;
		overflow: auto;
		background: white;
		padding: 1rem 2rem 1rem 1rem;
		box-sizing: border-box;
		margin: 0;
	}
}
</style>
