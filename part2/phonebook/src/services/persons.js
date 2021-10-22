import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const add = newPerson => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(response => response.data)
}

const exportObj = { getAll, add }

export default exportObj