import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider'
import Navbar from './Navbar';

export default function TheSlider({ navigation }) {
  const [value, setValue] = useState(1);

  const handleChange = (value) => {
    // Round the value to the nearest 50 pence
    const roundedValue = Math.round(value * 2) / 2;
    setValue(roundedValue);
  };



  return (
<>
<Navbar navigation={navigation} />
    <View style={styles.profileButtonContainer}>
    {/* <Button title="Profile" onPress={handleProfile} /> */}
  </View>

  

    <View style={styles.container}>
    <Button title="Charities we workw with"  onPress={() => navigation.navigate('Charities')}/>
    <Text style={styles.title}>Enter donation amount</Text>
   
      <Text style={styles.value}>£{value.toFixed(2)}</Text>

      <Slider
        style={{ width: 300, height: 40 }}
        minimumValue={1}
        maximumValue={25}
        step={0.5}
        onValueChange={handleChange}
        minimumTrackTintColor="#6BC5E6"
        maximumTrackTintColor="#1c2331"
        thumbTintColor="#6BC5E6"
      />
<Text style={styles.note}>Note that £{value.toFixed(2)} will be taken from your account on a weekly basis</Text>
<Button title="Subscribe"  />
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
  },
  profileButtonContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    margin: 10,
  },
  header: {
    color: '#FFFFFF',
    fontSize: 20,
    marginBottom: 20,
  },
  sliderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  value: {
    color: '#FFFFFF',
    fontSize: 24,
    marginTop: 20,
    fontWeight: 'bold',
    textShadowColor: '#6BC5E6',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#FFFFFF',
    // textShadowColor: '#FFFFFF',
    // textShadowOffset: { width: 0, height: 0 },
    // textShadowRadius: 0,
    marginBottom: 10,
  },
  note: {
    fontSize: 16,
    color: '#FFFFFF',
    textShadowColor: '#FFFFFF',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 1,
    marginBottom: 20,
    padding: 50,
    textAlign: 'center'
  }
});
