import React from 'react';
import Login from './components/Login';
import Register from './components/Register';
import CardForm from './components/CardForm';
import Profile from './components/Profile';
import TheSlider from './components/TheSlider';
import Charities from './components/Charities';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { StripeProvider } from '@stripe/stripe-react-native';

const STRIPE_KEY = 'pk_test_51MicwDLyEjHx5TfaLdhZuHKvZqAGnzfsnvk4bSRavMG71Wm8mqi8KQFoUlK49GoJm4hnaZyAjhlRyLko3Y1ahkpb00a9oLo3XU'

const AppNavigator = createStackNavigator(
  {
    Login: { screen: Login },
    Register: { screen: Register },
    CardForm: { screen: CardForm },
    Profile: { screen: Profile },
    Charities: { screen: Charities },
    TheSlider: { screen: TheSlider },
  }
 
);

const AppContainer = createAppContainer(AppNavigator);

const App = () => (
  <StripeProvider publishableKey={STRIPE_KEY}>
    <AppContainer />
  </StripeProvider>
);

export default App;
