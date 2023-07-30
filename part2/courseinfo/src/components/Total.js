const Total = ({parts})=>{

    const sum = parts.reduce((accumlator, currentValue) => accumlator + currentValue.exercises,0)

    return(
        <p><b>total of {sum} exercises</b></p>
    )
}

export default Total