<template>
	<button class="enter-story-view" @click="toggleExternalStoryView">
		<svg v-if="!externalView" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 20" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.414" x="0px" y="0px"><path d="M14 2.707L8.354 8.353a.5.5 0 0 1-.707-.707L13.293 2H9.5a.5.5 0 0 1 0-1h5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0V2.707zM5 3H2.499C1.671 3 1 3.669 1 4.496v9.009c0 .825.679 1.496 1.502 1.496h8.995a1.5 1.5 0 0 0 1.502-1.502v-2.498a.5.5 0 0 0-1 0v2.498a.5.5 0 0 1-.502.502H2.502A.504.504 0 0 1 2 13.505V4.496C2 4.222 2.223 4 2.499 4H5a.5.5 0 0 0 0-1z" fill-rule="nonzero"/></svg>
		<svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 20" filll-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.414" x="0px" y="0px"><path d="M14 2.707L8.354 8.353a.5.5 0 0 1-.707-.707L13.293 2H9.5a.5.5 0 0 1 0-1h5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0V2.707zM5 3H2.499C1.671 3 1 3.669 1 4.496v9.009c0 .825.679 1.496 1.502 1.496h8.995a1.5 1.5 0 0 0 1.502-1.502v-2.498a.5.5 0 0 0-1 0v2.498a.5.5 0 0 1-.502.502H2.502A.504.504 0 0 1 2 13.505V4.496C2 4.222 2.223 4 2.499 4H5a.5.5 0 0 0 0-1z" fill-rule="nonzero"/></svg>
	</button>
</template>

<script>
import { mapState } from 'vuex'

const ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const ID_LENGTH = 8;

export default {
	sockets: {
		closeStoryView() {
			this.$router.push({
				name: 'story',
				params: { room: '' }
			})
		},
		joinedRoom(data) {
			this.$router.push({
				name: 'story',
				params: { room: data.id }
			})
		}
	},
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
				window.open(`${location.origin}/${room}/external-view`, 'A presentation', 'innerHeight=540,innerWidth=960,top=300,left=500')
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

	svg {
		fill: white;
		width: 20px;
	}
}
</style>