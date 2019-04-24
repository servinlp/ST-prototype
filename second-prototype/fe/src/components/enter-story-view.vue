<template>
	<button class="enter-story-view" :class="{external: externalView}" @click="toggleExternalStoryView">
		<svg v-if="!externalView" class="give-fill" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 20" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.414" x="0px" y="0px"><path d="M14 2.707L8.354 8.353a.5.5 0 0 1-.707-.707L13.293 2H9.5a.5.5 0 0 1 0-1h5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0V2.707zM5 3H2.499C1.671 3 1 3.669 1 4.496v9.009c0 .825.679 1.496 1.502 1.496h8.995a1.5 1.5 0 0 0 1.502-1.502v-2.498a.5.5 0 0 0-1 0v2.498a.5.5 0 0 1-.502.502H2.502A.504.504 0 0 1 2 13.505V4.496C2 4.222 2.223 4 2.499 4H5a.5.5 0 0 0 0-1z" fill-rule="nonzero"/></svg>
		<svg v-else width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="20" height="20" fill="#E5E5E5"/><path d="M9 3H4C2.34315 3 1 4.34315 1 6V16C1 17.6569 2.34315 19 4 19H14C15.6569 19 17 17.6569 17 16V11" stroke="white"/><path d="M6.5 13C6.5 13.2761 6.72386 13.5 7 13.5L11.5 13.5C11.7761 13.5 12 13.2761 12 13C12 12.7239 11.7761 12.5 11.5 12.5L7.5 12.5L7.5 8.5C7.5 8.22386 7.27614 8 7 8C6.72386 8 6.5 8.22386 6.5 8.5L6.5 13ZM16.6464 2.64645L6.64645 12.6464L7.35355 13.3536L17.3536 3.35355L16.6464 2.64645Z" fill="white"/></svg>
	</button>
</template>

<script>
import { mapState } from 'vuex'

const ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const ID_LENGTH = 8;

export default {
	methods: {
		generate() {
			var rtn = '';
			for (var i = 0; i < ID_LENGTH; i++) {
				rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
			}
			return rtn;
		},
		toggleExternalStoryView() {
			if (!this.$store.getters.getExternalView) {
				const room = this.generate()
				this.$socket.emit('createRoom', {id: room })
				window.open(`${location.origin}/${room}/external-view?slideIndex=${this.$route.query.slideIndex || 1}`, 'A presentation', 'innerHeight=540,innerWidth=960,top=300,left=900')
			} else {
				this.$socket.emit('closeStoryView', {id: this.$route.params.room})
			}
			this.$store.commit('toggleExternalView')
		},
	},
	computed: mapState({
		externalView: state => state.externalView
	})
}
</script>

<style lang="scss">
.enter-story-view {
	position: fixed;
	bottom: 20px;
	right: 20px;
	background: none;
	border: none;
	padding: 0;

	&.external {
		bottom: 0;
		right: 0;
		width: 50px;
		height: 50px;
		padding: 1rem;
		background: #232323;
	}

	svg {
		width: 20px;
	}
	.give-fill {
		fill: white;
	}
	svg:not(.give-fill) rect {
		fill: none;
	}
}
</style>
