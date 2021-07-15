import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput, Keyboard } from 'react-native';

import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import api, { key } from '../../services/api'
import { LinearGradient } from 'expo-linear-gradient';
import Conditions from '../../components/Conditions'

export default function Search(){
    const navigation = useNavigation();

    const [input, setInput] = useState('');
    const [city, setCity] = useState(null);
    const [error, setError] = useState(null);

    async function handleSearch(){
        //https://api.hgbrasil.com/weather?key=8af1d641&city_name=Campinas,SP
        const reponse = await api.get(`weather?key=${key}&city_name=${input}`);

        if(reponse.data.by === 'default'){
            setError('Hmmm, cidade não encontrada!');
            setInput('');
            setCity(null);
            Keyboard.dismiss();
            return;
        }

        setCity(reponse.data);
        setInput('');
        Keyboard.dismiss();

        
    }

    if(city){
        return(
            <SafeAreaView style={styles.container}>
                <TouchableOpacity style={styles.backButton} onPress={ () => { navigation.navigate('Home') }}>
                    <Feather
                        name='chevron-left'
                        size={32}
                        color='#000'
                    />
                    <Text style={{ fontSize: 22 }}>Voltar</Text>
                </TouchableOpacity>

                <View style={styles.searchBox}>
                    <TextInput 
                        value={input}
                        onChangeText={( valor) => { setInput(valor) }} 
                        placeholder='Ex: Campinas, SP'
                        style={styles.input}
                    />
                    <TouchableOpacity style={styles.icon} onPress={ () => { handleSearch() }}>
                        <Feather
                            name='search'
                            size={22}
                            color='#FFF'
                        />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.test} onPress={() => {alert('TESTE')}}>
                    <LinearGradient style={styles.header} colors={['#1ed6ff', '#97c1ff']}>
                        <Text style={styles.date}>{city.results.date}</Text>
                        <Text style={styles.cidade}>{city.results.city_name}</Text>

                        <View>
                            <Text style={styles.temp}>{city.results.temp}°</Text>
                        </View>

                        <Conditions weather={city} />
                    </LinearGradient>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    return(
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={ () => { navigation.navigate('Home') }}>
                <Feather
                    name='chevron-left'
                    size={32}
                    color='#000'
                />
                <Text style={{ fontSize: 22 }}>Voltar</Text>
            </TouchableOpacity>

            <View style={styles.searchBox}>
                <TextInput 
                    value={input}
                    onChangeText={( valor) => { setInput(valor) }} 
                    placeholder='Ex: Campinas, SP'
                    style={styles.input}
                />
                <TouchableOpacity style={styles.icon} onPress={ () => { handleSearch() }}>
                    <Feather
                        name='search'
                        size={22}
                        color='#FFF'
                    />
                </TouchableOpacity>
            </View>

            {error && <Text style={{marginTop: 25, fontSize: 18}}>{error}</Text>}

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: '10%',
        backgroundColor: '#E8F0FF'
    },
    backButton: {
        alignSelf: 'flex-start',
        flexDirection: 'row',
        marginLeft: 15,
        alignItems: 'center',
        marginBottom: 10
    },
    searchBox: {
        flexDirection: 'row',
        backgroundColor: '#DDD',
        width: '90%',
        height: 50,
        borderRadius: 8,
        alignItems: 'center'
    },
    input: {
        width: '85%',
        height: 50,
        backgroundColor: '#FFF',
        borderBottomLeftRadius: 8,
        borderTopLeftRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 7
    },
    icon: {
        width: '15%',
        backgroundColor: '#1ED6FF',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderBottomRightRadius: 8,
        borderTopRightRadius: 8,
    },
    header: {        
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '3%',
        paddingBottom: '3%',
        borderRadius: 8,
    },
    test: {
        marginTop: '5%',        
        width: '90%',
        borderRadius: 8,
    },
    date: {
        color: '#FFF',
        fontSize: 15
    },
    cidade: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold'
    },
    temp: {
        color: '#FFF',
        fontSize: 80,
        fontWeight: 'bold'
    }
});