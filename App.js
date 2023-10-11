import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert, Image } from 'react-native';
import Formulario from './src/components/Formulario';
import Pais from './src/components/Pais';

export default function App() {
  const [busqueda, guardarbusqueda] = useState({
    pais: '',
  });
  const [consultar, guardarconsultar] = useState(false);
  const [resultado, guardarresultado] = useState({});
  const [resultado2, guardarresultado2] = useState({});

  const [bandera, setBandera] = useState('')

  useEffect(() => {
    const { pais } = busqueda;
    const urlBandera =
      'https://flagcdn.com/w20/' + pais + '.png';
    fetch(urlBandera, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((data) => {
        console.log(data.url);
        setBandera(data.url)
      })
      .catch((error) => {
        console.error(error);
      });

    const consultarPais = async () => {
      if (consultar) {
        const url =
          `https://servicodados.ibge.gov.br/api/v1/paises/${pais}`;

        try {
          const respuesta = await fetch(url);
          const resultado = await respuesta.json();
          guardarresultado(resultado);
          guardarconsultar(false);
        } catch (error) {
          mostrarAlerta();
        }
      }
    };
    consultarPais();
  }, [consultar]);

  const mostrarAlerta = () => {
    Alert.alert('Error', 'No hay resultado intenta con otra ciudad o país'),
      [{ Text: 'Ok' }];
  };

  return (
    <View style={styles.app}>
      <View style={styles.contenido}>
        <Formulario
          busqueda={busqueda}
          guardarbusqueda={guardarbusqueda}
          guardarconsultar={guardarconsultar}
        />
        <Pais resultado={resultado} resultado2={resultado2} />
        <View style={styles.contenedorBandera}>
          <Image
            source={{
              uri: bandera,
            }}
            style={styles.bandera} />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: 'rgb(71,149,212)',
    justifyContent: 'center',
  },
  contenido: {
    margin: '2.5%',
  },
  contenedorBandera:{   
    justifyContent: 'center',
    alignItems: 'center',
    margin:25,
  },
  bandera: {
    width: 100,
    height: 100,
    borderRadius: 10,
  }
});


