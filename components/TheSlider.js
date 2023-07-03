import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Linking } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { useStripe } from '@stripe/stripe-react-native';
import Navbar from './Navbar';
import { WebView } from 'react-native-webview';


export default function TheSlider({ navigation }) {
  const stripe = useStripe();
  const [sessionId, setSessionId] = useState('');
  const [stripeUrl, setStripeUrl] = useState('');



  const handleCheckout = () => {
    const url = 'https://form.jotform.com/231833950507356';
    Linking.openURL(url)
      .catch((error) => {
        console.error('Error opening Stripe checkout:', error);
      });
  };


  // const handleCheckout = async () => {
  //   try {
  //     // Make the API request to create the Checkout Session and obtain the session_id
  //     const response = await fetch('http://localhost:8000/api/checkout/', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         // Provide any required parameters to your backend API
  //       }),
  //     });

  //     const data = await response.json();
  //     const { session_id } = data;

  //     setSessionId(session_id);

  //     // Redirect the user to the Stripe checkout screen
  //     const url = `https://checkout.stripe.com/pay/${session_id}`;
  //     setStripeUrl(url);

  //     await WebBrowser.openBrowserAsync(url);
  //   } catch (error) {
  //     console.error('Error during checkout:', error);
  //   }
  // };

  // Rest of the component code

  return (
    <View>
      <Navbar navigation={navigation} />

      <View style={styles.container}>
        <Button title="Charities we work with" onPress={() => navigation.navigate('Charities')} />
        <Text style={styles.note}>Note that £1 will be taken from your account on a weekly basis</Text>
        <Button title="Checkout" onPress={handleCheckout} />
        {stripeUrl && <WebView source={{ uri: stripeUrl }} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  note: {
    fontSize: 16,
    color: 'black',
    textShadowColor: '#FFFFFF',
    padding: 20,
    textAlign: 'center'
  },
});
