import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

import StoryPage from './components/story-page'
import externalStoryView  from './components/external-story-view'

Vue.use(VueRouter)
Vue.use(Vuex)

const routes = [
	{ path: '/', component: StoryPage },
	{ path: '/external-view', component: externalStoryView }
]
const router = new VueRouter({
	mode: 'history',
	routes
})

const vuexPersist = new VuexPersist({
	key: 'my-app',
	storage: localStorage
  })

const store = new Vuex.Store({
	plugins: [vuexPersist.plugin],
	state: {
		externalView: false,
	},
	mutations: {
		toggleExternalView(state) {
			state.externalView = !state.externalView
		},
		updateStore(state) {
			console.log('run udateStore')
			// Check if the ID exists
			if(localStorage.getItem('my-app')) {
				// Replace the state object with the stored item
				this.replaceState(
					Object.assign(state, JSON.parse(localStorage.getItem('my-app')))
				);
			}
		}
	},
})

Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app')
