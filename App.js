import React, {Component} from 'react';
//import { View, Text, Button } from 'react-native';
import { createStackNavigator, createAppContainer, createDrawerNavigator } from "react-navigation";

// Routes...

//import DetailsScreen from './src/views/DetailsScreen';
import SelectScreen from './src/views/Login/Select.view';
import LoginScreen from './src/views/Login/Login.view';
import RegistrationScreen from './src/views/Login/Register.view';

import HomeScreen from './src/views/Area/HomeScreen';
import AddEditAreaScreen from './src/views/Area/AddEditAreaScreen';
import DevicesScreen from './src/views/Device/DevicesScreen';
import AddEditDeviceScreen from './src/views/Device/AddEditDeviceScreen';
import RolletScreen from './src/views/Device/RolletScreen';
import PlugScreen from './src/views/Device/PlugScreen';

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
    plug: PlugScreen,
  },
  {
     //initialRouteName: 'Select',
     initialRouteName: 'Home',

    // header config
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#34495e'

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
