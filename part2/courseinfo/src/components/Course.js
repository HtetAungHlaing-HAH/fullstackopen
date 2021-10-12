import React from 'react';


//Header component
const Header = (props) => {
    return (
      <h2>{props.name}</h2>
    )
  }
  
  //Total component
  const Total = (props) => {
    //array reduce method to calculate total ex
    const total = props.parts.reduce((sum ,part) => sum + part.exercises, 0 )
    return(
      <strong>total of {total} exercises</strong>
    ) 
  }
  
  //Part component
  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>    
    )
  }
  
  
  //Content component
  const Content = (props) => {
    const parts = [...props.parts]
    return (
      <div>
        {parts.map(part => <Part key={part.id} part={part} />)}
      </div>
    )
  }
  
  //Course component
  const Course = (props) => {
    const {course} = props
    return(
      <div>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  
  }

  export default Course;