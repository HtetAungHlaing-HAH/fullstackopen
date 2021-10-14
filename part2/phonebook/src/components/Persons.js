import React from 'react';

//SinglePerson component
const SinglePerson = (props) => {
    return(
        <div>
            {props.person.name} {props.person.number}
        </div>
    )
}

//Persons component
const Persons = (props) => {   
    const newPersons =  [...props.persons]
    return(
        <div>
            {newPersons.map(person => <SinglePerson key={person.id} person={person} />)}
        </div>
    )
}

export default Persons;

