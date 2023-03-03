import React, { useState } from 'react';
import { View,  StyleSheet, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function CardForm(){


  const [cardNumber, setCardNumber] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');

  const saveCard = async () => {
    const token = await AsyncStorage.getItem('token');
    fetch('http://yourdomain.com/save_card/', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        card_number: cardNumber,
        cardholder_name: cardholderName,
        expiration_date: expirationDate,
        cvv: cvv
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        Alert.alert('Success', 'Card details saved successfully.');
      } else {
        Alert.alert('Error', 'Unable to save card details.');
      }
    })
    .catch(error => {
      console.error(error);
      Alert.alert('Error', 'An error occurred while saving card details.');
    });
  };

  const handleProfile = () => {
    navigation.navigate('Profile');
  }
  


  return (
    <View>
       <TextInput
        placeholder="Card number"
        value={cardNumber}
        onChangeText={setCardNumber}
        style={styles.input}
      />
      <TextInput
        placeholder="Cardholder name"
        value={cardholderName}
        onChangeText={setCardholderName}
        style={styles.input}
      />
      <TextInput
        placeholder="Expiration date"
        value={expirationDate}
        onChangeText={setExpirationDate}
        style={styles.input}
      />
      <TextInput
        placeholder="CVV"
        value={cvv}
        onChangeText={setCvv}
        style={styles.input}
      />
      <Button
        title="Save card"
        onPress={saveCard}
        style={styles.button}
        textStyle={styles.buttonText}
      />
      <View style={styles.profileButtonContainer}>
        <Button title="Profile" onPress={handleProfile} />
      </View>


    </View>
  );
};


CardForm.navigationOptions = screenProps => ({
  title: "Card",
  headerStyle: {
    backgroundColor: 'white'
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize: 24
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  
  },
  profileButtonContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
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
