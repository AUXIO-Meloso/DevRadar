import React, { useEffect, useState } from 'react';

// Importando todos os arquivos CSS necessários
import './CSS/App.css';
import './CSS/global.css';
import './CSS/SideBar.css';
import './CSS/Main.css';

// Importando componentes e serviços 
import api from './services/api';
import DevItem from './components/DevItem';
import DevForm from './components/DevForm';


// Componente: Bloco isolado de HTML, CSS e JS, o qual não interfere no restante da aplicação
// Propriedade: Informações que um componente PAI passa para o componente FILHO.
// Estado: Informações mantidas pelo componente (Lembrar: imutabilidade)

function App() {
  const [ devs, setDevs ] = useState([]);

  // CARREGAR DEVS
  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');
      setDevs(response.data);
    }

    loadDevs();
  }, []);

  // Atualizando DEVS em tempo real na tela
  async function handleAddDev(data) {

    const response = await api.post('/devs', data);

    setDevs([...devs, response.data]);
  }

  return (
      <div id="app">
        <aside>
          <strong>Cadastrar</strong>
          <DevForm onSubmit={handleAddDev} />
        </aside>

        <main>
          <ul>
            {devs.map(dev => (
              <DevItem key={dev.id} dev={ dev } />
            ))}
          </ul>
        </main>
      </div>
  );
}

export default App;
