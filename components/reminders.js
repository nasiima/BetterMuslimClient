import React from 'react';
import { View, Text } from 'react-native';

import { StyleSheet } from 'react-native';

export default function Reminders() {



  return (
    <View style={styles.container}>
      <Text>Hello User this is the reminders page!</Text>

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
