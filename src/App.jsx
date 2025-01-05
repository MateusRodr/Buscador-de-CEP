import { useState } from 'react'
import './App.css'
import { FiSearch } from 'react-icons/fi'
import api from './services/api'
function App() {

const [input, setInput] = useState('');
const [cep, setcep] = useState({})

 async function handleSerach(){

if(input === ''){
  alert('digite algum CEP')
  return;
}

try{
  const response = await api.get(`${input}/json`)
  setcep(response.data)
  setInput('')

}catch{
  alert('erro ao buscar cep')
  setInput('')
}
}

  return (
    <>
    <div className='main'>
    <h1 className='title'>Buscador de CEP</h1>
    <div className='containerInput'>
    <input 
    type='text' 
    placeholder='digite seu cep...'
    value={input}
    onChange={(e) => setInput (e.target.value)}
    
    />    

    <button className='search'> 
      <FiSearch size={25} color='#fff' onClick={handleSerach} />
    </button> 
    </div>
    {Object.keys(cep).length > 0 && (
          <main className='dados'>
          <h2>CEP: {cep.cep}</h2>
          <span>{cep.logradouro}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>Cidade: {cep.localidade}</span>
          <span>Estado: {cep.estado}-{cep.uf}</span>
        </main>

    )}

    </div>

      
    </>
  )
}

export default App
