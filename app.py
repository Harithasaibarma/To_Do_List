from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

tasks = []  # Store tasks in memory

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/get_tasks')
def get_tasks():
    sort_by = request.args.get('sort_by', 'default')

    sorted_tasks = tasks.copy()  # Create a copy to avoid modifying original data

    if sort_by == "deadline":
        sorted_tasks.sort(key=lambda task: task["deadline"])  # Sort by deadline (earliest first)
    elif sort_by == "priority":
        priority_order = {"High": 1, "Medium": 2, "Low": 3}
        sorted_tasks.sort(key=lambda task: priority_order[task["priority"]])  # Sort by priority

    return jsonify({"tasks": sorted_tasks})


@app.route('/add', methods=["POST"])
def add_task():
    data = request.json
    tasks.append({
        "name": data["name"],
        "priority": data["priority"],
        "deadline": data["deadline"],
        "completed": False
    })
    return jsonify({"message": "Task added successfully!"})

@app.route('/delete', methods=["POST"])
def delete_task():
    data = request.json
    index = data["index"]
    if 0 <= index < len(tasks):
        del tasks[index]
    return jsonify({"message": "Task deleted successfully!"})

@app.route('/toggle', methods=["POST"])
def toggle_task():
    data = request.json
    index = data["index"]
    if 0 <= index < len(tasks):
        tasks[index]["completed"] = not tasks[index]["completed"]
    return jsonify({"message": "Task status updated!"})

@app.route('/edit', methods=["POST"])
def edit_task():
    data = request.json
    index = data["index"]
    if 0 <= index < len(tasks):
        tasks[index]["name"] = data["name"]
        tasks[index]["deadline"] = data["deadline"]
    return jsonify({"message": "Task updated successfully!"})

if __name__ == '__main__':
    app.run(debug=True)
