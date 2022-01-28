import ReactDOM from 'react-dom'
import App from './App'

import axios from 'axios'

const promise = axios.get('http://localhost:3001/notes')

promise.then(response => {
    console.log(response)
})

const promise2 = axios.get('http://localhost:3001/foobar')
console.log(promise2)

const persons = [
    {
        id: 1,
        name: 'Arto Hellas',
        tel: '026522171'
    }
]

ReactDOM.render(
    <App persons={persons} />,
    document.getElementById('root')
)