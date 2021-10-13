import React from 'react';

//Persons component
const Persons = ({person}) =>
{
    return(
        <div>
            {person.name} {person.number}
        </div>
    )
}

export default Persons

