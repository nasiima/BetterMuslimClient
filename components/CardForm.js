import React, { useState } from 'react';
import { View,  StyleSheet, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navbar from './Navbar';


export default function CardForm({navigation}){


  const handleSlider = () => {
    navigation.navigate('TheSlider');
  }
  

  

  return (
    <>
    <Navbar navigation={navigation} />

    

    <View style={styles.container}>
       <TextInput
        placeholder="Card number"
        // value={cardNumber}
        // onChangeText={setCardNumber}
        style={styles.input}
      />
      <TextInput
        placeholder="Cardholder name"
        // value={cardholderName}
        // onChangeText={setCardholderName}
        style={styles.input}
      />
      <TextInput
        placeholder="Expiration date"
        // value={expirationDate}
        // onChangeText={setExpirationDate}
        style={styles.input}
      />
      <TextInput
        placeholder="CVV"
        // value={cvv}
        // onChangeText={setCvv}
        style={styles.input}
      />
      <Button
        title="Save card"
        onPress={handleSlider}
        style={styles.button}
        textStyle={styles.buttonText}
      />
    </View>
    </>
  );
};


// CardForm.navigationOptions = screenProps => ({
//   title: "Slider",
//   headerStyle: {
//     backgroundColor: 'white'
//   },
//   headerTintColor: '#fff',
//   headerTitleStyle: {
//     fontWeight: 'bold',
//     fontSize: 24
//   }
// })

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  
  },
  profileButtonContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    margin: 10
  },
  input: {
    
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    width: "80%",
    marginBottom: 16,
 
    // marginTop: 90,
  },
  button: {
    backgroundColor: '#008080',
    borderRadius: 4,
    padding: 12,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
