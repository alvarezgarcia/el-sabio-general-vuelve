// Incluimos React, como siempre, pero también incluimos
// Component, que es una clase de la cual heredaremos lo necesario para este componente
import React, { Component } from 'react';

// Para no escribir nosotros una función de random, usamos una llamada sample de la librería lodash
// la sintaxis con llaves permite que traigamos solo esa función, si por el contrario hubieramos hecho:
// import lodash from 'lodash'
//
// Al momento de usar la función sample deberíamos haber escrito lodash.sample, con la sintáxis de llaves
// solo importamos lo que necesitamos.
import {sample} from 'lodash';

// Importamos el componente PhraseDisplay, que lo hicimos nosotros
import PhraseDisplay from '../PhraseDisplay/PhraseDisplay';

// A diferencia del componente App, Main es un componente "inteligente" ya que
// tiene un constructor y algunos métodos dentro de la clase.
// La distinción más fácil entre componentes tontos e inteligentes es el que los
// tontos son simplemente un function y los inteligentes una clase.
//
// En el caso de los tontos tienen por único objetivo mostrar lo que les llegue en el parámetro 'props'
// los inteligentes no solo hacen ésto, sino que también extienden (o heredan) la clase Component de React
// y reescriben algunos métodos que esta clase trae, para dotarlo de inteligencia y estado.

class Main extends Component {
  // El constructor de la clase
  // Es obligatorio en él ejecutar la función super(), que lo que hace es ejecutar el constructor de la clase
  // que hereda, es decir Component.
  //
  // Posteriormente se declara en él el estado, siempre debe llamarse state.
  constructor() {
    super();
    this.state = {};
		this.state.phrase = '';
    this.state.allPhrases = [];

    // Esta es una "magia" de Javascript, como la función onClickRandomPhrase se la voy a pasar al componente "tonto"
    // PhraseDisplay, que al ser tonto no puede hacer nada mas que mostrar lo que le paso como parámetro y no
    // tiene forma de definir que hacer cuando clickeo el botón para darme otra frase.
    //
    // Entonces como este onClickRandomPhrase se va a ejecutar en otro componente pero va a necesitar tomar una frase
    // aleatoria de las que están en esta clase (en este componente) necesita saber cuál es su contexto, en caso
    // de no hacerlo intentaría buscar las frases en el componente PhraseDisplay que, nuevamente, al ser tonto no hace
    // no tiene estado.
		this.onClickRandomPhrase = this.onClickRandomPhrase.bind(this);
  }

  // Esta es una función que se hereda de la clase Component y es la primera que se ejecuta después
  // de que el componente se "monta", lo que en sí no es que se muestre.. sino más bien que se ejecuta
  // postriormente a que se instancie el componente Main.
  //
  // Se usa para conseguir información que quiero mostrar cuando el componente se renderize, acá estamos
  // incluyendo un archivo con las frases, pero es el lugar donde se llaman APIs y ese tipo de cosas.
  componentDidMount() {
    // Leo el archivo phrases.json, no es necesario agregarle la extensión json en el require.
    const allPhrases = require('../../data/phrases');

		const phrase = this.getRandomPhrase(allPhrases);

    // Esto es fundamental de React, agrega a:
    // - this.state.phrase el valor de phrase
    // - this.state.allPhrases el valor de allPhrases
    //
    // Automáticamente ejecutado this.setState se ejecuta (y sin necesidad de hacerlo manualmente) la función
    // render() con estos nuevos valores
		this.setState({phrase: phrase, allPhrases: allPhrases});
  }

  // Esta función implementa la función sample que agregamos más arriba, parte de lodash, simplemente
  // retorna un valor random del array phrases
	getRandomPhrase(phrases) {
    return sample(phrases);
	}

  // Esta función se le va a pasar a PhraseDisplay para saber qué hacer cuando se clickea el botón de pedir otra frase
	onClickRandomPhrase() {
    // Ejecuta la función getRandomPhrase explicada anteriorment
		const phrase = this.getRandomPhrase(this.state.allPhrases);

    // Nuevamente seteamos el estado del componente Main, específicamente el string phrase y automáticamnete se llamará
    // a la función render
		this.setState({phrase: phrase});
	}

  // Esta función es obligatoria, es la que se ejecuta siempre posteriormente a this.setState
  // En este caso retorna (muestra) el componente PhraseDisplay con dos "props":
  // - phrase con el valor que esta en el estado para phrase
  // - handleUpdateClick con la función que definimos más arriba
  //
  // Estas props (propiedades) phrase y handleUpdateClick tienen nombres arbitrarios
  render() {
    return (
      <PhraseDisplay phrase={this.state.phrase} handleUpdateClick={this.onClickRandomPhrase} />
    );
  }
}

// Debido a que Main es llamado por App en src/App.js es necesario exportarlo.
export default Main;
