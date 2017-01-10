<template>
	<div id="todo-list-page">
		<h1>TO-DO List</h1>
		<div>
			<h4>Add new TODO</h4>
			<div class="form-inline">
				<div class="form-group">
					<label>Title</label>
					<input  class="form-control" v-model="actualTodo.title" />
				</div>	
				<div class="form-group">
					<label>Description</label>
					<input class="form-control" v-model="actualTodo.description" />
				</div>
				<button class="btn btn-primary" v-if="updateMode == false" v-on:click="save">Add</button>
				<button class="btn btn-primary" v-if="updateMode == true" v-on:click="update">Update</button>
				<button class="btn btn-danger"  v-on:click="save">Cancel</button>
			</div>
		</div>

		<br />
		<ul class="list-group">
			<todo-item v-for="todo in todos" 
				:todo="todo" :key="todo.id" 
				v-on:update-todo="wantUpdateATodo"
				v-on:todo-removed="removeATodo"
				/>
		</ul>
	</div>
</template>

<script>
	import Todo from "../models/todo.js"
	import TodoApi from "../models/todoApi.js"
	import TodoItem from "./TodoItem.vue"

	let todoApi = null
	export default {
		data() {
			return {
				todos: [],
				actualTodo: new Todo(),
				updateMode: false
			}
		},
		mounted: function() {
			todoApi = new TodoApi(this.$http)
			todoApi.getAll(
				(todos) => this.todos = todos,
			 	(error) => console.log(error))
			this.$on("update-todo", this.wantUpdateATodo)
		},
		methods: {
			wantUpdateATodo: function(todoId) {
				this.actualTodo = this.todos.filter((t) => t.id === todoId)[0]
				this.updateMode = true
			},
			removeATodo: function(todo) {
				let index = this.todos.indexOf(todo)
				if (index > -1) {
				    this.todos.splice(index, 1);
				}
			},
			save: function (evt) {
				let lastId = this.todos[this.todos.length - 1].id;
				this.actualTodo.id = lastId + 1

				todoApi.insert(this.actualTodo,
					(newTodo) => {
						this.actualTodo = new Todo()
						this.todos.push(newTodo)
					},
					(error) => console.log("Error")
				)
			},
			update: function (evt) {
				todoApi.update(this.actualTodo,
					(updatedTodo) => {
						this.actualTodo = new Todo()
						this.updateMode = false
					},
					(error) => console.log("Error")
				)
			}
		}, components: {
			TodoItem
		}
	}

</script>

<style>

	
</style>