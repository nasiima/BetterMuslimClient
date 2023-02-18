import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Button } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Reminders(props) {

  const [ reminders, setReminders] = useState([]);
  let token = null;

  const getData = async () => {
    token = await AsyncStorage.getItem('MR_Token');
    if (token) {
      getReminders();
    } else {
      props.navigation.navigate("Login")
    }
  };
  
  useEffect(() => {
    getData();
  }, []);

  const getReminders = () => {
    console.log(token);
    fetch(`http://192.168.1.5:8000/api/reminders`, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${token}`
      }
    })
    .then( res => res.json())
    .then( jsonRes => setReminders(jsonRes))
    .catch( error => console.log(error));
  }


  const handleLogout = async () => {
    token = await AsyncStorage.getItem('MR_Token');
    try {
      await AsyncStorage.removeItem(token);
      props.navigation.navigate("Login")
    } catch (e) {
      console.log(e);
    }
  }


      

  return (
    <View style={styles.container}>
      <Text>Hello User this is the reminders page!</Text>
    
      <Button onPress={() => handleLogout()}
        title="Logout"
      >
        Logout
      </Button>
    </View>
  );
}




Reminders.navigationOptions = screenProps => ({
  title: "Reminders",
  headerStyle: {
    backgroundColor: 'white'
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize:24
  }
})


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
