<template>
<div class="presenter-timer">
	<button class="mdc-icon-button material-icons" @click="resetTimer">autorenew</button>
	<div>{{minutes}}:{{seconds}}</div>
</div>
</template>

<script>
export default {
	data() {
		return {
			startDate: null,
			minutes: null,
			seconds: null,
		}
	},
	mounted() {
		this.startDate = Date.now()
		requestAnimationFrame(this.setTimer)
	},
	methods: {
		resetTimer() {
			this.startDate = Date.now()
		},
		setTimer() {
			const allSeconds = (Date.now() - this.startDate) / 1000
			this.seconds = String(Math.round(allSeconds % 60)).padStart(2, '0')
			this.minutes = Math.round(allSeconds / 60)
			requestAnimationFrame(this.setTimer)
		}
	}
}
</script>

<style lang="scss" scoped>
.presenter-timer {
	position: absolute;
	bottom: 0;
	left: 0;
	display: flex;
	transform: translateX(-110%);
	color: white;

	div {
		font-size: 2rem;
	}
}
</style>
