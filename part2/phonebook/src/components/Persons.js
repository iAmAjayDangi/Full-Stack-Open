const Persons = (props) =>{
    return(
        <>
            {props.persons.map(person => (
                <div key={person.id}>
                    {person.name} {person.number} <button onClick={()=>props.deletePerson(person.id)}>delete</button>
                </div>
            ))}
        </>
    )
}

export default Persons