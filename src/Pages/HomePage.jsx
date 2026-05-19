import { useState, useEffect } from 'react'
import TaskInput from '../Komponente/TaskInput'
import TaskList from '../Komponente/TaskList'
import FilterButtons from '../Komponente/FilterButtons'

function HomePage() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks')
    return saved ? JSON.parse(saved) : []
  })
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = (text) => {
    const newTask = { id: Date.now(), text, completed: false }
    setTasks((prev) => [newTask, ...prev])
  }

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'Active') return !task.completed
    if (filter === 'Completed') return task.completed
    return true
  })

  const activeCount = tasks.filter((t) => !t.completed).length

  return (
    <div className="app-wrapper">
      <h1 className="app-title mb-1">
        Todo<span>List</span>
      </h1>
      <p className="task-count mb-4">{activeCount} task{activeCount !== 1 ? 's' : ''} remaining</p>

      <div className="card-dark p-4">
        <TaskInput onAdd={addTask} />
        <FilterButtons activeFilter={filter} onFilterChange={setFilter} />
        <TaskList
          tasks={filteredTasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
        />
      </div>
    </div>
  )
}

export default HomePage
