import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const destroy = url => {
    return axios.delete(url)
}

const update = (url, newObject) => {
    const request = axios.put(url, newObject)
    return request.then(response => response.data)
}

const personService = { getAll, create, destroy, update }

export default personService