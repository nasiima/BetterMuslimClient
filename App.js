import React from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Reminders from './components/Reminders';


import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';



const AppNavigator = createStackNavigator({
  Login: {screen: Login},
  Reminders: {screen: Reminders},
  Register: {screen: Register}
 
})


const App = createAppContainer(AppNavigator);

export default App;