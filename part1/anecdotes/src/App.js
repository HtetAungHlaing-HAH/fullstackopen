import React, { useState } from 'react';

//Header component
const Header = (props) => (
  <div>
    <h1>
      {props.text}
    </h1>
  </div>
)

//Display component
const Display = (props) => {
  //conditional rendering on singular/plural of vote
  if(props.vote[props.state] > 1)
  {
    return(
      <div>
        has {props.vote[props.state]} votes
      </div>
    )
  }
  return(
    <div>
      has {props.vote[props.state]} vote
    </div>
  )
}

//Button component
const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

//main App component
const App = () => {

  //anecdotes array
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(
    Array(anecdotes.length).fill(0)
  )
  
  //to display most-voted anecdote
  const mostVotes = vote.indexOf(Math.max(...vote))

  //to display random anecdote
  const handleRandom = () => {
    const rand = Math.floor(Math.random()*anecdotes.length)
    return setSelected(rand)
  }

  //to calculate and store votes
  const handleVote = () => {
    const copyVote = [...vote]
    copyVote[selected] += 1
    return setVote(copyVote)
  }

  return(
    <div>
      <Header text='Anecdote of the day' />
      {anecdotes[selected]}
      <Display vote={vote} state={selected} />
      <div>
        <Button handleClick={handleVote} text='vote' />
        <Button handleClick={handleRandom} text='next anecdote' />
      </div>
      <Header text='Anecdote with most votes' />
      {anecdotes[mostVotes]}
    </div>
  )
}

export default App;
