import React from 'react';
import Login from './components/Login';
import Register from './components/Register';
import CardForm from './components/CardForm';
import Profile from './components/Profile';
import TheSlider from './components/TheSlider';
import Charities from './components/Charities';


import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';



const AppNavigator = createStackNavigator({
  Login: {screen: Login},
  Register: {screen: Register},
  CardForm: {screen: CardForm},
  Profile: {screen: Profile},
  Charities: {screen: Charities},
  TheSlider: {screen: TheSlider},
})


const App = createAppContainer(AppNavigator);

export default App;