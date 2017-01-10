export default class Todo {
	
	static fromJson(json){
		return new Todo(json.id, json.title, json.description, json.done)
	}

	constructor(id = 0, title = "", description = "", done = false) {
		this.id = id;
		this.title = title;
		this.description = description;
		this.done = done;
	}

	toJson() {
		return {
			"id": this.id,
			"title": this.title,
			"description": this.description,
			"done": this.done
		}
	}

	finish() {
		this.done = true;
	}
}