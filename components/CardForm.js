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
      />
      <TextInput
        placeholder="Cardholder name"
        value={cardholderName}
        onChangeText={setCardholderName}
      />
      <TextInput
        placeholder="Expiration date"
        value={expirationDate}
        onChangeText={setExpirationDate}
      />
      <TextInput
        placeholder="CVV"
        value={cvv}
        onChangeText={setCvv}
      />
      <Button
        title="Save card"
        onPress={saveCard}
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileButtonContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  text: {
    fontSize: 20,
    margin: 20,
  },
});
