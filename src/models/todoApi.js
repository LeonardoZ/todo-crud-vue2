	
import Todo from "./todo.js"

export default class TodoService {

	constructor(vueHttpResource) {
		this.http = vueHttpResource;
		this.baseUrl = "http://localhost:3000/todos" 
	}

	get(id, todoCallback, errorCallback) {
		let defaultSuccessCallback = (response) => {
			let todo =  Todo.fromJson(response.body)
			todoCallback(todo)
		}
		return this.http.get(this.baseUrl + `/${id}`).then(defaultSuccessCallback, errorCallback);
	}

	getAll(todosCallback, errorCallback) {
		let defaultSuccessCallback = (response) => {
			let todos = response.body.map((todo) => Todo.fromJson(todo))
			todosCallback(todos)
		}
		return this.http.get(this.baseUrl).then(defaultSuccessCallback, errorCallback);
	}

	update(todo, finishedCallback, errorCallback) {
		let defaultSuccessCallback = (response) => {
			let newTodo = Todo.fromJson(response.body)
			finishedCallback(newTodo)
		}
		return this.http
				.put(this.baseUrl + `/${todo.id}`,  todo.toJson())
				.then(defaultSuccessCallback, errorCallback);
	}

	insert(todo, insertedCallback, errorCallback) {
		let defaultSuccessCallback = (response) => {
			let newTodo = Todo.fromJson(response.body)
			insertedCallback(newTodo)
		}
		return this.http
				.post(this.baseUrl,  todo.toJson())
				.then(defaultSuccessCallback, errorCallback);
	}

	remove(todo, finishedCallback, errorCallback) {
		let defaultSuccessCallback = (response) => {
			finishedCallback(response.body)
		}
		return this.http
				.delete(this.baseUrl + `/${todo.id}`)
				.then(defaultSuccessCallback, errorCallback);
	}



}