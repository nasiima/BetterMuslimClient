import React, { useState } from 'react';
import { View,  StyleSheet, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navbar from './Navbar';


export default function CardForm({navigation}){
  const [planId, setPlanId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expMonth, setExpMonth] = useState('');
  const [expYear, setExpYear] = useState('');
  const [cvc, setCvc] = useState('');
  const [amount, setAmount] = useState('');

  // const handleSlider = () => {
  //   navigation.navigate('TheSlider');
  // }
  // useEffect(() => {
  //   getData();
  // }, [])

  // const saveData = async (token) => {
  //   await AsyncStorage.setItem('MR_Token', token)
  // }
  // const getData = async () => {
  //   const token = await AsyncStorage.getItem('MR_Token');
  //   if (token) navigation.navigate("CardForm");
  // }

  const handlePress = async () => {
    const token = await AsyncStorage.getItem('MR_Token');
    fetch('http://localhost:8000/api/checkout/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({
        plan_id: planId,
        payment_method: 'card',
        card_number: cardNumber,
        exp_month: expMonth,
        exp_year: expYear,
        cvc: cvc,
        amount: amount,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };
  


  return (
    <>
    <Navbar navigation={navigation} />
   <View>
    <TextInput
        placeholder="Plan ID"
        value={planId}
        onChangeText={setPlanId}
      />
      <TextInput
        placeholder="Payment Method"
        value={paymentMethod}
        onChangeText={setPaymentMethod}
      />
      <TextInput
        placeholder="Card Number"
        value={cardNumber}
        onChangeText={setCardNumber}
      />
       <TextInput
        placeholder="Expiration Month"
        value={expMonth}
        onChangeText={setExpMonth}
      />
      <TextInput
        placeholder="Expiration Year"
        value={expYear}
        onChangeText={setExpYear}
      />
      <TextInput
        placeholder="CVC"
        value={cvc}
        onChangeText={setCvc}
      />
      <TextInput
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
      />
      <Button title="Submit" onPress={handlePress} />
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
