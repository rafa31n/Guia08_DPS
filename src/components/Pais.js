import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image } from 'react-native';
import { Card } from 'react-native-elements';

const Pais = ({ resultado, resultado2 }) => {
    const [info, setinfo] = useState([]);
    const [info2, setinfo2] = useState([]);
    const [nombre, setnombre] = useState();
    const [capital, setcapital] = useState();
    const [region, setregion] = useState();
    const [lengua, setlengua] = useState([]);
    const [area, setArea] = useState([]);
    const [bandera, setBandera] = useState([]);

    useEffect(() => {
        setinfo(resultado);
        setinfo2(resultado2);
        lengua.length = 0;
        Object.values(info).map(e => {
            setnombre(e.nome.abreviado);
            setcapital(e.governo.capital.nome);
            setregion(e.localizacao.regiao.nome); Object.values(e.linguas).map(l => {
                lengua.push(l.nome)
            })
            setArea(e.area.total + ' ' + e.area.unidade.símbolo)
        }
        );

        Object.values(info2).map(e => {
            console.log(e)
        }
        );
    });
    return (
        <View>
            <Card>
                <Card.Title>{nombre}</Card.Title>
                <Card.Divider />
                <View style={{ justifyContent: 'center' }}>
                    <Text style={styles.text}>Capital: {capital}</Text>
                    <Text style={styles.text}>Region: {region}</Text>
                    <Text style={styles.text}>Lengua: {lengua.toString()}</Text>
                    <Text style={styles.text}>Área: {area}</Text>
                </View>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 22,
    },
    bandera: {
        width: '100%'
    },
    banderaContainer: {
        backgroundColor: '#fff',
        width: '80%',
        height: 150,
        justifyContent: 'center'
    }
});
export default Pais;