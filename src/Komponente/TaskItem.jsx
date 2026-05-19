function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div className={`task-item d-flex align-items-center gap-3 p-3 mb-2 ${task.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      <span className="task-text flex-grow-1">
        <span style={{ opacity: 0.4, marginRight: '8px' }}>
          {task.completed ? '//' : '▸'}
        </span>
        {task.text}
      </span>
      <button
        className="btn-delete"
        onClick={() => onDelete(task.id)}
        title="Delete task"
      >
        [X]
      </button>
    </div>
  )
}

export default TaskItem
