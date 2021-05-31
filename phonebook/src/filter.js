const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div className="field">
      <div className="control">
        <input className="input" value={filter} onChange={handleFilterChange} placeholder="Search for..." />
      </div>
    </div>
  )
}

export default Filter