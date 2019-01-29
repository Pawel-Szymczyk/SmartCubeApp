import React, {Component} from 'react';
//import { View, Text, Button } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";

// Routes...
import HomeScreen from './src/views/HomeScreen';
import DetailsScreen from './src/views/DetailsScreen';
import LoginScreen from './src/views/LoginScreen';
import AddEditAreaScreen from './src/views/AddEditAreaScreen';
import DevicesScreen from './src/views/DevicesScreen';
import AddEditDeviceScreen from './src/views/AddEditDeviceScreen';
import RolletScreen from './src/views/RolletScreen';

const RootStack = createStackNavigator(
  {
    Login: LoginScreen,
    // Registration: RegistrationScreen,
    Home: HomeScreen,
    //Details: DetailsScreen,
    AddEditArea: AddEditAreaScreen,
    Devices: DevicesScreen,
    AddEditDevice: AddEditDeviceScreen,
    Rollets: RolletScreen,
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
