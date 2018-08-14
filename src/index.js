import React from 'react';
// Tambien incluimos ReactDOM que es la versión de React para HTML (hay otras implementaciones
// como React Native que en vez de trabajar con HTML trabaja con elemntos nativos de cada SO de un celular, sea Android o iOS)
import ReactDOM from 'react-dom'; 

// Importamos App.js
import App from './App';

// Todo empieza acá:
// La aplicación que escribimos (englobada en el componente <App />) se va a montar en un div
// llamado root, que se puede encontrar mirando el contenido de public/index.html
//
// El próximo archivo a analizar es App.js
ReactDOM.render(<App />, document.getElementById('root'));
