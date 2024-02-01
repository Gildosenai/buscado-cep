import{ FiSearch } from 'react-icons/fi';
import './styles.css';
import{ useState } from 'react';
import api from './services/api';

function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState('');
  async function alerta(){
    if(input=== ''){
      alert("Preencha algum CEP!")
      return;
    }
    
    try{
      
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      setInput("");
      console.log(response.data)
    }catch{
      alert("Ops CEP não encotrado ou digitado errado");
      setInput("")
    }
  }
  

  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>
      <div className="containerInput">
        <input 
        type="text"
        placeholder="Digite seu CEP..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        />

        <button className="buttonSearch" onClick={alerta}>
          <FiSearch size={25} color="#fff"/>
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP: {cep.cep} </h2>
          <span>{cep.logradouro} </span>
          <span>Coplemento: {cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
      </main>
      )}
      
    </div>
  );
}

export default App;
