<template>
<div id="app">
	<router-view></router-view>
</div>
</template>

<script>
export default {
	name: 'app',
	mounted() {
		this.updateStorage()
		console.log('set storage event')
		document.addEventListener('storage', (e) => {
			console.log('hello', e)
		})
		document.addEventListener('storage', () => this.updateStorage())
	},
	destroyed() {
		document.removeEventListener('storage', this.updateStorage)
	},
	methods: {
		updateStorage() {
			console.log('run updateStorage')
			this.$store.commit('updateStore');
		}
	}
}
</script>

<style lang="scss">
body {
	margin: 0;
	background: #232323;
}
#app {
  font-family: 'Open Sans', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

button {
	cursor: pointer;
}
</style>
