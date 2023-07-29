import { useState } from 'react'

const StatisticLine = (props) => <p>{props.cellValue} {props.optional}</p>

const Statistics = (props) =>{
  if(props.all === 0){
    return(
      <p>No feedback given</p>
    )
  }
  return(
    <div>
        <table>
          <tbody>
            <tr>
              <td><StatisticLine cellValue={'good'} /></td>
              <td><StatisticLine cellValue={props.good} /></td>
            </tr>
            <tr>
              <td><StatisticLine cellValue={'neutral'} /></td>
              <td><StatisticLine cellValue={props.neutral} /></td>
            </tr>
            <tr>
              <td><StatisticLine cellValue={'bad'} /></td>
              <td><StatisticLine cellValue={props.bad} /></td>
            </tr>
            <tr>
              <td><StatisticLine cellValue={'all'} /></td>
              <td><StatisticLine cellValue={props.all} /></td>
            </tr>
            <tr>
              <td><StatisticLine cellValue={'average'} /></td>
              <td><StatisticLine cellValue={(props.good-props.bad)/props.all} /></td>
            </tr>
            <tr>
              <td><StatisticLine cellValue={'positive'} /></td>
              <td><StatisticLine cellValue={(props.good*100)/props.all} optional={'%'} /></td>
            </tr>
          </tbody>
        </table>
    </div>
  )
}

const Button = (props) => <button onClick={props.handleClick} >{props.text}</button>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] =useState(0);


  const handleGood = () =>{
    const updatedGood = good+1
    setGood(updatedGood)
    setAll(updatedGood+neutral+bad)
  }

  const handleNeutral = () =>{
    const updatedNeutral= neutral+1
    setNeutral(updatedNeutral)
    setAll(good+updatedNeutral+bad)
  } 

  const handleBad = () =>{
    const updatedBad= bad+1
    setBad(updatedBad)
    setAll(good+neutral+updatedBad)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGood} text={'good'}/>
      <Button handleClick={handleNeutral} text={'neutral'}/>
      <Button handleClick={handleBad} text={'bad'}/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={all}/>
    </div>
  )
}

export default App