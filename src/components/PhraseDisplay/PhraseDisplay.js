// Volvemos a importar React, pero en este caso el componente PhraseDisplay es "tonto"
// por lo tanto no necesitamos Componente como el Main.js para heredar o extender nada
import React from 'react';

// Todos estos imports son de la librería material-ui, que nos provee los widgets prearmados
// que vemos en la interfaz.
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';

import { connect } from 'react-redux';
import { getPhrase } from '../../actions';

// Al ser un componente tonto, es una función simple sin estado que recibe como parametros la variable "props"
function PhraseDisplay(props) {
  return (
		<Card style={{maxWidth: "345px", height: "100%"}}>
			<CardMedia style={{height: '300px'}}
				image="https://theredphoenix.files.wordpress.com/2012/03/peron.jpg"
				title="General Perón dice:"
			/>
			<CardContent style={{height: "100px"}}>
				<Typography gutterBottom variant="headline" component="h2">
					Perón dice:
				</Typography>
				<Typography component="p">
					{props.phrase}
				</Typography>
			</CardContent>
			<CardActions>
				<Button onClick={props.onClick} variant="contained" color="primary" style={{width: "100%"}}>
					<Icon>autorenew</Icon>
				</Button>
			</CardActions>
		</Card>
  );
}
// Para poder definir los estilos de los componentes se usa el objeto style y pasando de snake_case a camelCase las
// propiedades de CSS que son estándares, como por ejemplo:
// - max-width a maxWidth
//
// Y sus valores, aunque sean numéricos van entre comillados
//
//
// Como se ve se usan los dos props que pasamos en Main.js:
// - phrase
// - handleUpdateClick
//
// phrase se usa dentro del componente Typography para mostrar la frase
// handleUpdateClick se usa en el evento onClick del componente button, cada vez que se clickea llama a la función
// onClickRandomPhrase del comopnente Main, que a su vez busca una frase aleatoria y ejecuta this.setState.
// Al ejecutarse this.setState, como vimos, automáticamente se ejecuta nuevamente el render de Main, que llama a PhraseDisplay
// que a su vez ejecuta su propio render con el nuevo valor para phrase.
//
//

function mapStateToProps(state) {
  const stateToMap = {
    phrase: state.phrase
  };

  return stateToMap;
}

function mapDispatchToProps(dispatch) {
  const onClick = () => dispatch(getPhrase());

  return {
    onClick
  };
}

// Exportamos el componente para poder llamarlo en Main.js
// export default PhraseDisplay;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PhraseDisplay);
