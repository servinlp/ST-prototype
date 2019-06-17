<template>
<div id="app">
	<router-view></router-view>
</div>
</template>

<script>
export default {
	name: 'app',
	mounted() {
		this.$store.state.slideIndex = this.$route.query.slideIndex || '1'
	},
}
</script>

<style lang="scss">
@font-face {
    font-family: 'Avenir-Black';
    src: url('/fonts/Avenir-Black.woff2') format('woff2'),
        url('/fonts/Avenir-Black.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'Avenir-Roman';
    src: url('/fonts/Avenir-Roman.woff2') format('woff2'),
        url('/fonts/Avenir-Roman.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'Avenir-Heavy';
    src: url('/fonts/Avenir-Heavy.woff2') format('woff2'),
        url('/fonts/Avenir-Heavy.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'Calibri-Italic';
    src: url('/fonts/Calibri-Italic.woff2') format('woff2'),
        url('/fonts/Calibri-Italic.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}



body {
	margin: 0;
	background: #232323;
}
#app {
  font-family: 'Open Sans', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

button {
	cursor: pointer;
}

:focus {
	outline: none;
}
</style>
