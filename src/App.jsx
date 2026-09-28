import { useState } from 'react'
import './App.css'

function App() {
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])

  function addTask(event) {
    event.preventDefault()

    if (task.trim() === '') {
      return
    }

    const newTask = {
      id: Date.now(),
      text: task.trim(),
      completed: false,
    }

    setTasks([...tasks, newTask])
    setTask('')
  }

  function toggleTask(id) {
    setTasks(
      tasks.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    )
  }

  function deleteTask(id) {
    setTasks(tasks.filter((item) => item.id !== id))
  }

  return (
    <div className="app">
      <h1>Task Manager</h1>

      <form onSubmit={addTask} className="task-form">
        <input
          type="text"
          placeholder="Enter a task"
          value={task}
          onChange={(event) => setTask(event.target.value)}
        />

        <button type="submit">Add Task</button>
      </form>

      {tasks.length === 0 ? (
        <p className="empty-message">No tasks yet.</p>
      ) : (
        <ul className="task-list">
          {tasks.map((item) => (
            <li key={item.id} className="task-item">
              <span className={item.completed ? 'completed' : ''}>
                {item.text}
              </span>

              <div>
                <button onClick={() => toggleTask(item.id)}>
                  {item.completed ? 'Undo' : 'Complete'}
                </button>

                <button onClick={() => deleteTask(item.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default App