import React, { useState } from 'react';
import { View, Button, Linking } from 'react-native';

const CheckoutButton = () => {
  const [sessionId, setSessionId] = useState('');

  const handleCheckout = async () => {
    try {
      // Make the API request to create the Checkout Session and obtain the session_id
      const response = await fetch('http://localhost:8000/api/checkout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Provide any required parameters to your backend API
        }),
      });

      const data = await response.json();
      const { session_id } = data;

      setSessionId(session_id);

      // Redirect the user to the Stripe checkout screen
      const stripeUrl = `https://checkout.stripe.com/pay/${session_id}`;
      await Linking.openURL(stripeUrl);
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  return (
    <View>
      <Button title="Checkout" onPress={handleCheckout} />
    </View>
  );
};

export default CheckoutButton;

