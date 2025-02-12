import { useState } from 'react';
import './App.css';
import { FiSearch } from 'react-icons/fi';
import api from './services/api';
import Swal from 'sweetalert2';

function App() {
  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function handleSearch() {
    if (input === '') {
      Swal.fire({
        icon: "warning",
        text: "Digite algum CEP",
        allowOutsideClick: false
      });
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput('');
    } catch {
      Swal.fire({
        icon: "error",
        text: "Digite um CEP válido",
        allowOutsideClick:false,
      });
      setInput('');
    }
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      event.preventDefault()
      handleSearch();
    }
  }

  return (
    <>
      <div className='main'>
        <h1 className='title'>Buscador de CEP</h1>
        <div className='containerInput'>
          <input
            type='text'
            placeholder='Digite seu CEP...'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className='search' onClick={handleSearch}>
            <FiSearch size={25} color='#fff' />
          </button>
        </div>
        {Object.keys(cep).length > 0 && (
          <main className='dados'>
            <h2>CEP: {cep.cep}</h2>
            <span>{cep.logradouro}</span>
            <span>Bairro: {cep.bairro}</span>
            <span>Cidade: {cep.localidade}</span>
            <span>Estado: {cep.uf}</span>
          </main>
        )}
      </div>
    </>
  );
}

export default App;
