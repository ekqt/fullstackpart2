const PersonForm = ({ addName, newName, newNumber, handleNameChange, handleNumberChange }) => {
  return (
    <form onSubmit={addName}>
      <div>
        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <input className="input" value={newName} onChange={handleNameChange} placeholder="John Doe" />
          </div>
        </div>
        <div className="field">
          <label className="label">Number</label>
          <div className="control">
            <input className="input" value={newNumber} onChange={handleNumberChange} placeholder="(+420) 555-000-000" />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <button className="button is-outlined" type="submit">Add</button>
          </div>
        </div>
      </div>
    </form >
  )
}

export default PersonForm