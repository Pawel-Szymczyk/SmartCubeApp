import React, {Component} from 'react';
//import { View, Text, Button } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";

// Routes...
import HomeScreen from './src/views/HomeScreen';
import DetailsScreen from './src/views/DetailsScreen';
import LoginScreen from './src/views/LoginScreen';


const RootStack = createStackNavigator(
  {
    Login: LoginScreen,
    // Registration: RegistrationScreen,
    Home: HomeScreen,
    Details: DetailsScreen,
  },
  {
    initialRouteName: 'Login',

    // header config
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}