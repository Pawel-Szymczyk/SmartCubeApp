import React, {Component} from 'react';
//import { View, Text, Button } from 'react-native';
import { createStackNavigator, createAppContainer, createDrawerNavigator } from "react-navigation";

// Routes...

//import DetailsScreen from './src/views/DetailsScreen';
import SelectScreen from './src/views/Login/Select.view';
import LoginScreen from './src/views/Login/Login.view';
import RegistrationScreen from './src/views/Login/Register.view';

import HomeScreen from './src/views/HomeScreen';
import AddEditAreaScreen from './src/views/AddEditAreaScreen';
import DevicesScreen from './src/views/DevicesScreen';
import AddEditDeviceScreen from './src/views/AddEditDeviceScreen';
import RolletScreen from './src/views/RolletScreen';

const RootStack = createStackNavigator(
  {
    Select: SelectScreen,
    Login: LoginScreen,
    Registration: RegistrationScreen,

    Home: HomeScreen,
    AddEditArea: AddEditAreaScreen,
    Devices: DevicesScreen,
    AddEditDevice: AddEditDeviceScreen,
    rollet: RolletScreen,
  },
  {
    // initialRouteName: 'Select',
    initialRouteName: 'Home',

    // header config
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#34495e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      
    },
  }
);


const RootDrawer = createDrawerNavigator(
  {
    Home: { screen: RootStack, },
  },
  {
    initialRouteName: 'Home',
    drawerWidth: 200
  }
);

const AppContainer = createAppContainer(RootDrawer);

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}
