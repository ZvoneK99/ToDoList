function DateNavigator({ selectedDate, onPrev, onNext, isFirst, isLast }) {
  const todayStr = new Date().toDateString()
  const isToday = new Date(selectedDate).toDateString() === todayStr

  const formatted = new Date(selectedDate).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className="d-flex align-items-center justify-content-between mb-4">
      <button
        className="btn date-nav-btn"
        onClick={onPrev}
        disabled={isFirst}
      >
        ←
      </button>

      <div className="text-center">
        {isToday && (
          <div className="mb-1">
            <span className="badge bg-primary">Today</span>
          </div>
        )}
        <div className="date-display">{formatted}</div>
      </div>

      <button
        className="btn date-nav-btn"
        onClick={onNext}
        disabled={isLast}
      >
        →
      </button>
    </div>
  )
}

export default DateNavigator
