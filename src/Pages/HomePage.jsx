import { useState, useEffect } from 'react'
import TaskInput from '../Komponente/TaskInput'
import TaskList from '../Komponente/TaskList'
import FilterButtons from '../Komponente/FilterButtons'
import DateNavigator from '../Komponente/DateNavigator'

function toDateKey(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function buildDateRange() {
  const dates = []
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  for (let i = 0; i <= 7; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    dates.push(toDateKey(d))
  }
  return dates
}

const DATE_RANGE = buildDateRange()

function HomePage() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks')
    return saved ? JSON.parse(saved) : []
  })
  const [filter, setFilter] = useState('All')
  const [dateIndex, setDateIndex] = useState(0)

  const selectedDate = DATE_RANGE[dateIndex]

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = (text) => {
    const newTask = { id: Date.now(), text, completed: false, date: selectedDate }
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

  const tasksForDay = tasks.filter((task) => task.date === selectedDate)

  const filteredTasks = tasksForDay.filter((task) => {
    if (filter === 'Active') return !task.completed
    if (filter === 'Completed') return task.completed
    return true
  })

  const activeCount = tasksForDay.filter((t) => !t.completed).length

  return (
    <div className="app-wrapper">
      <div className="mb-4">
        <p className="task-count mb-2">&gt; SYSTEM READY_</p>
        <h1 className="app-title">
          TASK<span>/</span>LIST
        </h1>
        <p className="task-count mt-2">
          &gt; {activeCount} task{activeCount !== 1 ? 's' : ''} pending
          <span className="cursor">_</span>
        </p>
      </div>

      <div className="card-dark p-4">
        <DateNavigator
          selectedDate={selectedDate}
          onPrev={() => setDateIndex((i) => i - 1)}
          onNext={() => setDateIndex((i) => i + 1)}
          isFirst={dateIndex === 0}
          isLast={dateIndex === DATE_RANGE.length - 1}
        />
        <hr className="section-divider" />
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
