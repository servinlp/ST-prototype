<template>
<div class="questions">
	<div class="questions-container"  :class="{active: questionsOpen}">
		<div class="question-section">
			<p>Vragen:</p>
			<div class="single-question" v-on:click="selectQuestion(q)" v-for="(q, index) in questions" :key="index">
				{{q.question}}
				<div class="votes">
					<button class="mdc-icon-button material-icons" disabled>compare_arrows</button>{{q.upvotes}}
				</div>
			</div>
		</div>
	</div>
	<button class="mdc-fab questions-button" v-on:click="toggleQuestions">
		<span class="mdc-fab__icon material-icons">?</span>
	</button>
	<div class="number" v-if="questions.length !== 0">{{questions.length}}</div>
</div>
</template>

<script>
export default {
	data() {
		return {
			questionsOpen: false,
			questions: [{
				question: 'laa',
				upvotes: 1,
			}, {
				question: 'laa',
				upvotes: 4
			}
		],
		}
	},
	sockets: {
		getQuestion(question) {
			this.questions.push(question)
		},
		upvoteQuestion(num) {
			this.questions[Number(num)].upvotes += 1;
		}
	},
	methods: {
		toggleQuestions() {
			this.questionsOpen = !this.questionsOpen
		},
		selectQuestion(question) {
			this.$store.state.question = question
			this.$socket.emit('showQuestion', {
				question,
				id: this.$route.params.room
			})
		}
	}
}
</script>

<style lang="scss">
.questions {
	position: absolute;
	left: 0;
	bottom: 0;
	width: 100%;
}
.questions-button {
	position: relative;
	left: 10px;
	bottom: 10px;
	width: 45px;
    height: 45px;
	background: #232323;
	color: white;
	span {
		font-size: 20px;
		font-family: 'Open Sans', Helvetica, Arial, sans-serif;
	}
}

.questions-container {
	z-index: 1;
    position: relative;
	font-size: 1rem;
	height: 80vh;
	width: 90%;
	margin: 0 auto 5vh;
	transform: scale(0);
	transform-origin: left bottom;
	transition: transform 0.3s ease;

	&::after {
		content: "";
		position:absolute;
		bottom: -38px;
		width: 39px;
		height: 40px;
		border-left: 2px solid gray;
		background: white;
	}

	&::before {
		content: "";
		position: absolute;
		bottom: -38px;
		width: 1px;
		height: 57px;
		border-left: 2px solid gray;
		transform-origin: left bottom;
		transform: rotate(45deg);
    	z-index: 1;
	}

	&.active {
		transform: scale(1);
	}
}

.question-section {
	height: 100%;
	width: 100%;
	border: 2px solid gray;
    background: transparent;
	padding: 20px;
    box-sizing: border-box;
    overflow: auto;

	.single-question {
		position: relative;
		border: 2px solid gray;
		padding: 10px;
		margin-bottom: 30px;
		min-height: 100px;
		box-sizing: border-box;
		cursor: pointer;

		&::after {
			content: "";
			position:absolute;
			left: -2px;
			bottom: -18px;
			width: 17px;
			height: 20px;
			border-left: 2px solid gray;
			background: white;
		}

		&::before {
			content: "";
			position: absolute;
			left: -2px;
			bottom: -18px;
			width: 1px;
			height: 26px;
			border-left: 2px solid gray;
			transform-origin: left bottom;
			transform: rotate(45deg);
			z-index: 1;
		}
	}
}

.number {
	position: absolute;
    left: 40px;
    bottom: 40px;
    background: red;
    border-radius: 50%;
    width: 15px;
    height: 15px;
    color: white;
    text-align: center;
	font-size: 12px;
    line-height: 15px;
}

.votes {
	position: absolute;
    right: 10px;
    bottom: 10px;

	button {
		padding: 0;
		width: 30px;
		height: 30px;
		transform: rotate(90deg);
		vertical-align: sub;
	}
}
</style>
