import React from 'react';

//Filter component
const Filter = (props) => {
    return(
      <div>
        {props.text}<input value={props.value} onChange={props.filterHandler} />
      </div>
    )
}

export default Filter;

