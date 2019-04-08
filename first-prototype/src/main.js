import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import StoryPage from './components/story-page'

Vue.use(VueRouter)

const routes = [
	{ path: '/', component: StoryPage }
]
const router = new VueRouter({
	mode: 'history',
	routes
})

Vue.config.productionTip = false

new Vue({
	router,
	render: h => h(App),
}).$mount('#app')
