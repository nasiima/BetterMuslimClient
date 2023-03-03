import React from 'react';
import Login from './components/Login';
import Register from './components/Register';
import CardForm from './components/CardForm';
import Profile from './components/Profile';


import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';



const AppNavigator = createStackNavigator({
  Login: {screen: Login},
  Register: {screen: Register},
  CardForm: {screen: CardForm},
  Profile: {screen: Profile},
})


const App = createAppContainer(AppNavigator);

export default App;