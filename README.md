✅ To-Do List Web App
A sleek and interactive To-Do List built with HTML, CSS, and JavaScript — enhanced with deadline tracking, priority settings, sorting options, light/dark theme toggle 🌗, and even voice input 🎙️

✨Features
🔹 Add Tasks with
  ✔️ Title
  🚦 Priority (High, Medium, Low)
  📅 Deadline

🔹 Interactive Table View:
  📝 View tasks in a clean, tabular format
  ✅ Mark tasks as completed
  ✏️ Edit / 🗑️ Delete tasks

🔹 Sorting Options:
  🔃 Sort tasks by Deadline or Priority for better planning

🔹 Theme Toggle:
  🌞 Light Mode / 🌙 Dark Mode switch

🔹 Voice Input (Beta) 🎙️
  🗣️ Speak to add tasks quickly (requires browser mic access)

🖼️ UI Overview
The interface is responsive and beginner-friendly with modern design:
📌 Task | 🚦 Priority | 📅 Deadline | ✅ Done | 🛠️ Actions

🛠️ How to Run Locally
Clone the repository
git clone https://github.com/yourusername/todo-list-app.git
cd todo-list-app
Set up a Python Flask server (if you're using url_for):

Install Flask:
pip install flask
Create app.py with a basic route:

from flask import Flask, render_template
app = Flask(__name__)
@app.route('/')
def index():
    return render_template('index.html')
if __name__ == '__main__':
    app.run(debug=True)
    
Place your index.html in a templates/ folder and CSS/JS files inside static/
Run the app
python app.py

Open your browser and go to http://127.0.0.1:5000/

📁 Project Structure

├── app.py
├── templates/
│   └── index.html
├── static/
│   ├── style.css
│   └── script.js

🚀 Future Enhancements

🔄 Persistent task storage (localStorage or database)
👥 User login and task sync
📱 Mobile responsiveness
🔔 Notifications for approaching deadlines

🙋‍♀️ Developed By

Haritha Sai Barama
📧barmaharithasai@gmail.com
🔗 linkedin.com/in/haritha-sai-barama-6167a525b                                                                  
