import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import Formulario from './src/components/Formulario';
import Pais from './src/components/Pais';

export default function App() {
  const [busqueda, guardarbusqueda] = useState({
    pais: '',
  });
  const [consultar, guardarconsultar] = useState(false);
  const [resultado, guardarresultado] = useState({});
  const [resultado2, guardarresultado2] = useState({});
  useEffect(() => {
    const { pais } = busqueda;
    const consultarPais = async () => {
      if (consultar) {
        const url =
          `https://servicodados.ibge.gov.br/api/v1/paises/${pais}`;
        const urlBandera =
          `https://flagcdn.com/w20/${pais}.png`;
        console.log(url)
        console.log(urlBandera)
        try {
          const respuesta = await fetch(url);
          const respuesta2 = await fetch(urlBandera);
          const resultado = await respuesta.json();
          const resultado2 = await respuesta2.json();
          guardarresultado(resultado);
          guardarresultado2(resultado2);
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
        <Pais resultado={resultado} resultado2={resultado2}/>
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
});


