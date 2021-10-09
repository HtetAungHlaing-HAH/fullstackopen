import React, { useState } from 'react'


//Header component
const Header = (props) => (
  <div>
    <h1>{props.text}</h1>
  </div>
)

//Display component
const Display = (props) => <div>{props.text} {props.value}</div>

//Button component
const Button = (props) => <button onClick={props.handleClick}>{props.text}</button>

//main App component
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  

  return(
    <div>
      <Header text='give feedback' />
      <Button handleClick={() => setGood(good +1)} text='good' />
      <Button handleClick={() => setNeutral(neutral +1)} text='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='bad' /> 
      <Header text='statistics' />
      <Display text='good' value={good} />
      <Display text='neutral' value={neutral} />
      <Display text='bad' value={bad} />
    </div>
  )
}


export default App;
