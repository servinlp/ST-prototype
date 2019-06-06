<template>
<div class="question-popup" ref="popup" @keydown.esc="close" tabindex="0">
	{{question.question}}
	<button v-on:click="close" class="close mdc-icon-button material-icons">close</button>
	<div class="from">
		<p>Van: {{question.from}}</p>
	</div>
</div>	
</template>

<script>
import { mapState } from 'vuex'
export default {
	mounted() {
		this.$refs.popup.focus()
	},
	sockets: {
		closeQuestion() {
			this.$store.state.question = null
		}
	},
	methods: {
		close() {
			this.$store.state.question = null
			this.$socket.emit('closeQuestion', {
				id: this.$route.params.room
			})
		},
	},
	computed: mapState([
		'question'
	])
}
</script>

<style lang="scss">
.question-popup {
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background: white;
	width: 80vw;
	height: 80vh;
	font-size: 4rem;
	z-index: 10;
	box-sizing: border-box;
	padding: 40px;
	box-shadow: 0 0 100px 30px rgba(0, 0, 0, 0.5);

	.close {
		position: absolute;
		top: 0;
		right: 0;
	}
}

.from {
	position: absolute;
    right: 40px;
    bottom: 40px;

	p {
		display: inline-block;
    	margin: 0;
		font-size: 24px;
	}
}
</style>
