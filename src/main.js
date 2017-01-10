
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import App from './App.vue'
import TodoList from "./components/TodoList.vue"
import 'bootstrap/dist/css/bootstrap.css' // << import CSS
import 'font-awesome/css/font-awesome.css' // << import CSS
window.jQuery = require('jquery'); // << import jquery global
require('bootstrap'); // << import js bootstrap


Vue.use(VueResource);
Vue.use(VueRouter)

const routes = [
  { path: '/', component: TodoList }
]

const router = new VueRouter({
  routes // short for routes: routes
})

const app = new Vue({
  router
}).$mount('#app')
