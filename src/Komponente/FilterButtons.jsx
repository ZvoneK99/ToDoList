const FILTERS = ['All', 'Active', 'Completed']

function FilterButtons({ activeFilter, onFilterChange }) {
  return (
    <div className="d-flex gap-2 mb-3">
      {FILTERS.map((filter) => (
        <button
          key={filter}
          className={`btn filter-btn ${activeFilter === filter ? 'btn-primary' : 'btn-outline-secondary'}`}
          onClick={() => onFilterChange(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  )
}

export default FilterButtons
