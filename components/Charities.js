import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Navbar from './Navbar';



export default function Charities({ navigation }) {


    return (

        <>
        <Navbar navigation={navigation} />
            <View style={styles.profileButtonContainer}>

                <Text >Charities we work with</Text>

            </View>
        </>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2C2C2C',
    }

});
