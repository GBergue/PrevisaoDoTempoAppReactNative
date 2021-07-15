import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { AntDesign } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native'

export default function Menu(){
    const navigation = useNavigation();

    return(
        <TouchableOpacity style={styles.container} onPress={ () => navigation.openDrawer()}>
            <AntDesign name="menuunfold" size={36} color="#373737" />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        zIndex: 9,
        position: 'absolute',
        width: 70,
        height: 70,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        left: 15,
        top: 30,
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 1,
            height: 3
        }
    }
});