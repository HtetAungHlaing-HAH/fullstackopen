import React from 'react';

//PersonForm component
const PersonForm = (props) => {
    return (
      <form>
        <div>
          name: <input value={props.name} onChange={props.nameHandler}/>
        </div>
        <div>
          number: <input  value={props.number} onChange={props.numberHandler} />
        </div>
        <div>
          <button type="submit" onClick={props.addHandler}>add</button>
        </div>
      </form>
    )
}

export default PersonForm;