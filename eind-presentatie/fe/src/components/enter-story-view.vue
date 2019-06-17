<template>
	<button class="enter-story-view  mdc-icon-button material-icons" :class="{external: externalView}" @click="toggleExternalStoryView">
		<svg v-if="!externalView" class="give-fill" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 24 24"><path d="M21.1 9.3v9.1c0 1.4-1.2 2.6-2.6 2.6H5.4c-1.4 0-2.6-1.2-2.6-2.6V5.3c0-1.4 1.2-2.6 2.6-2.6h9.3" fill="none" stroke="#010101" stroke-linecap="round" stroke-miterlimit="10"/><path fill="#010101" d="M16.6 1.4l2.3 2.3-8 8 1.4 1.4 8-8 2.3 2.3v-6z"/></svg>
		<svg v-else id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 24 24"><path d="M21.1 7.3v11.1c0 1.4-1.2 2.6-2.6 2.6H5.4c-1.4 0-2.6-1.2-2.6-2.6V5.3c0-1.4 1.2-2.6 2.6-2.6h11.3" fill="none" stroke="#010101" stroke-linecap="round" stroke-miterlimit="10"/><path fill="#010101" d="M16.9 13.1l-2.3-2.3 8-8-1.4-1.4-8 8-2.3-2.3v6z"/></svg>
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
	right: 60px;
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
	// .give-fill {
		[stroke] {
			stroke: white;
		}
		path:not([stroke]) {
			fill: white;
		}
	// }
	svg:not(.give-fill) rect {
		fill: none;
	}
}
</style>
