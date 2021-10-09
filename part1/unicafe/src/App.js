import React, { useState } from 'react'


//Header component
const Header = (props) => (
  <div>
    <h1>{props.text}</h1>
  </div>
)

//Display component
const Display = ({text, value}) => <div>{text} {value}</div>

//Button component
const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

//Statistics component
const Statistics = (props) => {
  
  //conditional rendering on total feedbacks (Note : stats[3].value is total)
  if(props.stats[3].value === 0)
  {
    return(
      <div>
        No feedbacks given
      </div>
    )
  }

  return(
    <>
      <Display text={props.stats[0].text} value={props.stats[0].value} />
      <Display text={props.stats[1].text} value={props.stats[1].value} />
      <Display text={props.stats[2].text} value={props.stats[2].value} />
      <Display text={props.stats[3].text} value={props.stats[3].value} />
      <Display text={props.stats[4].text} value={props.stats[4].value} />
      <Display text={props.stats[5].text} value={props.stats[5].value} />
    </>
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
    {
      text : 'good',
      value : good
    },
    {
      text : 'neutral',
      value : neutral
    },
    {
      text : 'bad',
      value : bad
    },
    {
      text : 'total',
      value : total
    },
    {
      text : 'average',
      value : averageScore
    },
    {
      text : 'positive',
      value : percentOfPositive
    }
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
