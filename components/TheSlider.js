import { View, Text, Button, StyleSheet, TouchableOpacity, Modal} from 'react-native';
import { Picker } from '@react-native-picker/picker';


import React, { useState, useEffect } from 'react';

import Slider from '@react-native-community/slider'
import Navbar from './Navbar';
import { clearLogEntriesAsync } from 'expo-updates';

export default function TheSlider({ navigation }) {
  const [value, setValue] = useState(1);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleChange = (value) => {
    // Round the value to the nearest 50 pence
    const roundedValue = Math.round(value * 2) / 2;
    setValue(roundedValue);
  };


  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/subscriptionOptions')
      .then(response => response.json())
      .then(data => setOptions(data))
      .catch(error => console.error(error));
  }, []);

  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };


  const handleSubscribe = () => {
    // Call backend API to create subscription with the selected value
    fetch('http://127.0.0.1:8000/api/checkout/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount: value
      })
    })
    .then(response => response.json())
    .then(data => {
      // Handle successful subscription creation
      console.log(data);
    })
    .catch(error => {
      // Handle error
      console.error(error);
    });
  };

  return (
    <>
      <Navbar navigation={navigation} />
      <View style={styles.profileButtonContainer}>
        {/* <Button title="Profile" onPress={handleProfile} /> */}
      </View>

      <View style={styles.container}>
        <Button title="Charities we work with" onPress={() => navigation.navigate('Charities')} />
        <Text style={styles.title}>Enter donation amount</Text>

        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.optionButton}>
        <Text style={styles.optionButtonText}>
          {selectedOption ? selectedOption.price : "Select an option"}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          {options.map(option => (
            <TouchableOpacity
              key={option.id}
              style={styles.modalOptionButton}
              onPress={() => handleOptionChange(option)}
            >
              <Text style={styles.modalOptionButtonText}>{option.price}</Text>
            </TouchableOpacity>
          ))}
             </View>
              </Modal>
        {/* <Text style={styles.value}>£{value.toFixed(2)}</Text> */}

        <Text style={styles.note}>Note that £{value.toFixed(2)} will be taken from your account on a weekly basis</Text>
        <Button title="Subscribe" onPress={handleSubscribe} />
      </View>
    </>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
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
  },
  optionButton: {
    width: 200,
    height: 40,
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionButtonText: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '50%', // set a fixed width
    height: '50%',
    maxHeight: 200, /* adjust this value according to your needs */
    overflowY: 'auto',
    
  },
  
  modalOptionButton: {
    // position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    width: '50%',
    shadowColor: '#000000',
    shadowRadius: 4,
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.5,
    maxHeight: 200, /* adjust this value according to your needs */
    overflowY: 'auto',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  
  // modalOptionButtonText: {
  //   fontSize: 16,
  // },
  // selectedOptionContainer: {
  //   marginTop: 20,
  //   alignItems: 'center',
  // },
  // selectedOptionPrice: {
  //   fontSize: 18,
  //   fontWeight: 'bold',
  // },
  // selectedOptionDescription: {
  //   marginTop: 10,
  //   fontSize: 16,
  // }
});
