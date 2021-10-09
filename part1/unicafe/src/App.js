import React, { useState } from 'react'


//Header component
const Header = (props) => (
  <div>
    <h1>{props.text}</h1>
  </div>
)

//StatisticLine component
const StatisticLine = ({text, value}) => <div>{text} {value}</div>

//Button component
const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

//Statistics component
const Statistics = (props) => {
  
  //conditional rendering on total feedbacks (Note : stats[3].value is total)
  if(props.stats[3] === 0)
  {
    return(
      <div>
        No feedbacks given
      </div>
    )
  }

  return(
    <div>
      <StatisticLine text="good" value={props.stats[0]} />
      <StatisticLine text="neutral" value={props.stats[1]} />
      <StatisticLine text="bad" value={props.stats[2]} />
      <StatisticLine text="total" value={props.stats[3]} />
      <StatisticLine text="average" value={props.stats[4]} />
      <StatisticLine text="positive" value={props.stats[5]} />
    </div>
  )
}

//main App component
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  //statistics calculations
  const total = good + neutral + bad
  const averageScore = ((good * 1) + (neutral * 0) + (bad * (-1))) / total
  const percentOfPositive = (good * 100) / total + '%'

  //statistics array for display
  const statistics = [
    good,
    neutral,
    bad,
    total,
    averageScore,
    percentOfPositive
  ]


  return(
    <div>
      <Header text='give feedback' />
      <Button handleClick={() => setGood(good +1)} text='good' />
      <Button handleClick={() => setNeutral(neutral +1)} text='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='bad' /> 
      <Header text='statistics' />
      <Statistics stats={statistics} />
    </div>
  )
}


export default App;
