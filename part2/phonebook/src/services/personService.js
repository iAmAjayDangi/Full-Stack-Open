import axios from "axios"

// const baseUrl = 'http://localhost:3001/persons'
const baseUrl = '/api/persons'


const getAll = () =>{
    return axios.get(baseUrl).then(response => response.data)
}

const create = (newObject) =>{
    return axios.post(baseUrl, newObject).then(response => response.data)
}

const update = (id, newObject) =>{
    return axios.put(`${baseUrl}/${id}`, newObject)
}

const deleteGivenPerson = (id) =>{
    return axios.delete(`${baseUrl}/${id}`)
} 

export default {getAll, create, update, deleteGivenPerson}