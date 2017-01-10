<template>
	<li class="list-group-item">
		<div>
			<strong>{{ todo.title }}</strong>
			<br />
			<p>{{ todo.description }}</p>
		</div>
		<template v-if="!todo.done">
			<button class="btn btn-default btn-sm" v-on:click="setFinished">
				Finished?
			</button>

			<button class="btn btn-success btn-sm" v-on:click="updateContent">
				Update content
			</button>
		</template>

		<template v-else>
			<label class="btn btn-default btn-sm">
				Finished
			</button>
		</template>

		<button class="btn btn-danger btn-sm" v-on:click="removeTodo">
			Remove
		</button>
	</li>
</template>

<script>
	import TodoApi from "../models/todoApi.js"

	let todoApi = null
	export default {
		data: function() {
			return {}
		},
		mounted: function(){
			todoApi = new TodoApi(this.$http)
		},
		props: ["todo"],
		methods: {
			setFinished: function(evt) {
				this.todo.done = true
				todoApi.update(this.todo,
				 (newTodo) =>  console.log(newTodo), 
				 (error) => console.log(error))
			},
			updateContent: function(evt) {
				this.$emit("update-todo", this.todo.id);
			},
			removeTodo: function(evt) {
				todoApi.remove(this.todo,
				 (result) => this.$emit("todo-removed", this.todo), 
				 (error) => console.log(error))
			}
		},
	}

</script>

<style>
	
</style>