document.addEventListener("DOMContentLoaded", function () {
    loadTasks();
});

function addTask() {
    let taskName = document.getElementById("task").value.trim();
    let priority = document.getElementById("priority").value;
    let deadline = document.getElementById("deadline").value;

    if (!taskName || !deadline) {
        alert("Please enter both task and deadline!");
        return;
    }

    fetch("/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: taskName, priority: priority, deadline: deadline })
    }).then(() => {
        document.getElementById("task").value = "";
        document.getElementById("deadline").value = "";
        loadTasks();
    });
}

function loadTasks() {
    fetch("/get_tasks")
    .then(response => response.json())
    .then(data => {
        let taskList = document.getElementById("task-list");
        let taskContainer = document.getElementById("task-container");

        taskList.innerHTML = ""; // Clear old tasks

        if (data.tasks.length === 0) {
            taskContainer.style.display = "none";  // Hide table if no tasks
            return;
        } 

        taskContainer.style.display = "block"; // Show table if tasks exist

        data.tasks.forEach((task, index) => {
            let row = document.createElement("tr");

            row.innerHTML = `
                <td class="${task.completed ? 'completed' : ''}">${task.name}</td>
                <td>${task.priority}</td>
                <td>${task.deadline}</td>
                <td><input type="checkbox" onclick="toggleComplete(${index})" ${task.completed ? 'checked' : ''}></td>
                <td>
                    <button class="edit" onclick="editTask(${index})">✏ Edit</button>
                    <button class="delete" onclick="deleteTask(${index})">🗑 Delete</button>
                </td>
            `;

            taskList.appendChild(row);
        });
    });
}

function deleteTask(index) {
    fetch("/delete", { 
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify({ index }) 
    }).then(() => loadTasks());
}

function toggleComplete(index) {
    fetch("/toggle", { 
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify({ index }) 
    }).then(() => loadTasks());
}

function editTask(index) {
    let newTask = prompt("Enter new task name:");
    if (!newTask) return;

    let newDeadline = prompt("Enter new deadline (YYYY-MM-DD):");
    if (!newDeadline) return;

    fetch("/edit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ index, name: newTask, deadline: newDeadline })
    }).then(() => loadTasks());
}
document.addEventListener("DOMContentLoaded", function () {
    const toggleSwitch = document.getElementById("theme-toggle");
    const body = document.body;
    const container = document.querySelector(".container");
    const buttons = document.querySelectorAll("button");
    const themeLabel = document.getElementById("theme-label");

    // Check for saved theme preference
    if (localStorage.getItem("dark-mode") === "enabled") {
        body.classList.add("dark-mode");
        container.classList.add("dark-mode");
        buttons.forEach(btn => btn.classList.add("dark-mode"));
        toggleSwitch.checked = true;
        themeLabel.innerText = "Dark Mode";
    }

    // Toggle theme on switch
    toggleSwitch.addEventListener("change", function () {
        if (toggleSwitch.checked) {
            body.classList.add("dark-mode");
            container.classList.add("dark-mode");
            buttons.forEach(btn => btn.classList.add("dark-mode"));
            localStorage.setItem("dark-mode", "enabled");
            themeLabel.innerText = "Dark Mode";
        } else {
            body.classList.remove("dark-mode");
            container.classList.remove("dark-mode");
            buttons.forEach(btn => btn.classList.remove("dark-mode"));
            localStorage.setItem("dark-mode", "disabled");
            themeLabel.innerText = "Light Mode";
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const voiceBtn = document.getElementById("voice-btn");
    const taskInput = document.getElementById("task"); // Ensure this matches your input field ID

    // Check if the browser supports Speech Recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        alert("Your browser does not support speech recognition.");
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = "en-US";

    voiceBtn.addEventListener("click", function () {
        recognition.start();
    });

    recognition.onresult = function (event) {
        const transcript = event.results[0][0].transcript;
        taskInput.value = transcript; // Set the recognized speech into the input field
    };

    recognition.onerror = function (event) {
        console.error("Speech recognition error:", event.error);
    };
});
function sortTasks(criteria) {
    fetch(`/get_tasks?sort_by=${criteria}`)
    .then(response => response.json())
    .then(data => {
        displayTasks(data.tasks);
    });
}

function loadTasks() {
    fetch("/get_tasks")
    .then(response => response.json())
    .then(data => {
        displayTasks(data.tasks);
    });
}

function displayTasks(tasks) {
    let taskList = document.getElementById("task-list");
    let taskContainer = document.getElementById("task-container");

    taskList.innerHTML = ""; // Clear previous tasks

    if (tasks.length === 0) {
        taskContainer.style.display = "none";  // Hide table if no tasks
        return;
    } 

    taskContainer.style.display = "block"; // Show table if tasks exist

    tasks.forEach((task, index) => {
        let row = document.createElement("tr");

        row.innerHTML = `
            <td class="${task.completed ? 'completed' : ''}">${task.name}</td>
            <td>${task.priority}</td>
            <td>${task.deadline}</td>
            <td><input type="checkbox" onclick="toggleComplete(${index})" ${task.completed ? 'checked' : ''}></td>
            <td>
                <button class="edit" onclick="editTask(${index})">✏ Edit</button>
                <button class="delete" onclick="deleteTask(${index})">🗑 Delete</button>
            </td>
        `;

        taskList.appendChild(row);
    });
}
