import ReactDOM from 'react-dom'
import App from './App'

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