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
        className="btn btn-outline-secondary btn-sm px-3"
        onClick={onPrev}
        disabled={isFirst}
      >
        ‹
      </button>

      <div className="text-center">
        {isToday && (
          <div className="mb-1">
            <span className="badge bg-primary" style={{ fontSize: '0.7rem', letterSpacing: '1px' }}>
              Today
            </span>
          </div>
        )}
        <div className="date-display">{formatted}</div>
      </div>

      <button
        className="btn btn-outline-secondary btn-sm px-3"
        onClick={onNext}
        disabled={isLast}
      >
        ›
      </button>
    </div>
  )
}

export default DateNavigator
