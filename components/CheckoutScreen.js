import React, { useEffect } from 'react';
import { View, Button } from 'react-native';
import { WebView } from 'react-native-webview';

const CheckoutScreen = ({ route }) => {
  const { session_id } = route.params;

  // Handle the payment completion
  const handlePaymentCompletion = (event) => {
    // Check the event.url for the success or cancel URL
    if (event.url.includes('http://localhost:8000/success')) {
      // Payment succeeded
      // Handle the success scenario (e.g., show a success message, update the UI, etc.)
    } else if (event.url.includes('http://localhost:8000/cancel')) {
      // Payment canceled
      // Handle the cancel scenario (e.g., show a cancel message, update the UI, etc.)
    }
  };

  // Listen for WebView navigation events
  useEffect(() => {
    const handleWebViewNavigation = (event) => {
      // Check if the URL matches the success or cancel URL
      if (
        event.url.startsWith('http://localhost:8000/success') ||
        event.url.startsWith('http://localhost:8000/cancel')
      ) {
        // Call the handlePaymentCompletion function
        handlePaymentCompletion(event);
      }
    };

    // Subscribe to the WebView navigation events
    WebView.onShouldStartLoadWithRequest(handleWebViewNavigation);

    // Clean up the subscription when the component is unmounted
    return () => {
      WebView.removeEventListener('onShouldStartLoadWithRequest', handleWebViewNavigation);
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: `http://localhost:8000/checkout?session_id=${session_id}` }}
        style={{ flex: 1 }}
      />
    </View>
  );
};

export default CheckoutScreen;
