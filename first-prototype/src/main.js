import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import VueSocketIO from 'vue-socket.io'

import StoryPage from './components/story-page'
import externalStoryView  from './components/external-story-view'

import slides from './components/slides.js'

// First method:
// https://stackoverflow.com/questions/2236828/javascript-communication-between-tabs-windows-with-same-origin/12514384#12514384
// Reason it doesn't work: https://stackoverflow.com/a/35867792

// Second method:
// https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
// Reason it doesn't work: Only one way messages
// Window.parent.postMessage also doesn't work as itself is the parent (something that works with iframes)

Vue.use(VueRouter)
Vue.use(Vuex)

const routes = [
	{ path: '/', component: StoryPage },
	{ name: 'story', path: '/:room', component: StoryPage },
	{ name: 'story-view', path: '/:room/external-view', component: externalStoryView }
]
const router = new VueRouter({
	mode: 'history',
	routes
})

const store = new Vuex.Store({
	state: {
		externalView: false,
		slides,
		slideIndex: null,
	},
	mutations: {
		toggleExternalView() {
			this.state.externalView = !this.state.externalView
		},
		updateStore(state, payload) {
			state.n = payload
		}
	},
	getters: {
		getExternalView(state) {
			return state.externalView
		}
	}
})

Vue.use(new VueSocketIO({
    debug: true,
    connection: 'http://localhost:3000',
    vuex: {
        store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_'
    },
}))

Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app')
