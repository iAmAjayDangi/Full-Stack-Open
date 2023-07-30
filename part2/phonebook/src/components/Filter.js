import Persons from "./Persons"

const Filter = (props) =>{
    return(
        <div>
            filter shown with<input value={props.filterName} onChange={props.handleFilterName} />
            <Persons persons={props.filterPersons} />
      </div>
    )
}

export default Filter