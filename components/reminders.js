import React, { useState, useEffect, TouchableOpacity, } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Reminders({ navigation, props }) {

  const [reminders, setReminders] = useState([]);

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
    fetch(`http://127.0.0.1:8000/api/reminder-of-the-day/`, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${token}`
      }
    })
      .then(res => res.json())
      .then(jsonRes => setReminders(jsonRes))
      .catch(error => console.log(error));
  }
  const handleProfile = () => {
    navigation.navigate('Profile');
  }


 

  return (
    <View style={styles.container}>
      <View style={styles.profileButtonContainer}>
        <Button title="Profile" onPress={handleProfile} />
      </View>

      <Text style={styles.text}>Hello User this is the reminders page!</Text>
       <Text>{reminders.title}</Text>
          <Text>{reminders.reminder_text}</Text>
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


