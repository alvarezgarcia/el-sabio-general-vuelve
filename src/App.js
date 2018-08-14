import React from 'react'; 
// Incluimos React para trabajar con el, es necesario incluirlo en todos lados
// donde definamos un componente

import Main from './components/Main/Main';

// En este caso el componente App es un componente de tipo "tonto" ya que es solo una función
// que devuelve un componente llamado <Main />
function App() {
  return <Main />;
}

// Este export es el que nos permite hacer un import en el archivo src/index.js a través de:
// import App from './App'
export default App;


// El próximo archivo a analizar es src/components/Main/Main.js
