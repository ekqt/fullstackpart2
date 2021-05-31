const Person = ({ person, removePerson }) => {
    return (
        <div className="card mb-3">
            <div className="card-content">
                <p key={person.id} className="title is-5">{person.name}</p>
                <p className="subtitle is-6 mb-2">{person.number}</p>
                <button className="button is-small is-outlined" onClick={removePerson}> Delete </button>
            </div>
        </div>
    )
}

export default Person