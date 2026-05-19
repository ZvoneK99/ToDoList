import { useState } from 'react'

function TaskInput({ onAdd }) {
  const [text, setText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (text.trim() === '') return
    onAdd(text.trim())
    setText('')
  }

  return (
    <form onSubmit={handleSubmit} className="d-flex gap-2 mb-4">
      <input
        type="text"
        className="form-control task-input"
        placeholder="> type new task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit" className="btn btn-primary px-4" style={{ whiteSpace: 'nowrap' }}>
        EXEC
      </button>
    </form>
  )
}

export default TaskInput
