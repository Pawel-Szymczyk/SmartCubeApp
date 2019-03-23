import React, {Component} from 'react';
import { View, Text, Button, SafeAreaView, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { createStackNavigator, createAppContainer, createDrawerNavigator, DrawerItems } from "react-navigation";
import { Avatar } from 'react-native-elements'
import AppContext from './src/components/AppContext';

import MenuComponent from './src/components/Menu';

// Routes...
import ConfigScreen from './src/views/Login/Config.view';
import SelectScreen from './src/views/Login/Select.view';
import LoginScreen from './src/views/Login/Login.view';
import RegistrationScreen from './src/views/Login/Register.view';
import ForgetPasswordScreen from './src/views/Login/ForgetPassword.view';
import PasswordScreen from './src/views/Login/Password.view';
import SettingsScreen from './src/views/Settings/SettingsScreen';
import HomeScreen from './src/views/Area/HomeScreen';
import AddEditAreaScreen from './src/views/Area/AddEditAreaScreen';
import DevicesScreen from './src/views/Device/DevicesScreen';
import AddEditDeviceScreen from './src/views/Device/AddEditDeviceScreen';
import RolletScreen from './src/views/Device/RolletScreen';
import PlugScreen from './src/views/Device/PlugScreen';
import AvatarScreen from './src/views/Settings/AvatarScreen';

// -------------------------------------------------------------

const defaultStyling = {
    headerStyle: {
      backgroundColor: '#34495e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontFamily: '',
    },
}

const RootStack = createStackNavigator({

  // ---------------------------------
  
  Select: {
    screen: SelectScreen,
    navigationOptions: {
      header: null
    }
  },

  Login: {
    screen: LoginScreen,
  },

  Config: {
    screen: ConfigScreen,
    navigationOptions: defaultStyling,
  },

  Registration: {
    screen: RegistrationScreen
  },

  ForgetPassword: {
    screen: ForgetPasswordScreen
  },
  
  Password: {
    screen: PasswordScreen
  },

  Logout: {
    screen: SelectScreen
  },

  // ---------------------------------

  Home: {
    screen: HomeScreen,
    navigationOptions: defaultStyling,
  },

  
  AddEditArea: {
    screen: AddEditAreaScreen,
    navigationOptions: defaultStyling,
  },

  Devices: {
    screen: DevicesScreen,
    navigationOptions: defaultStyling,
  },

  AddEditDevice: {
    screen: AddEditDeviceScreen,
    navigationOptions: defaultStyling,
  },

  rollet: {
    screen: RolletScreen,
    navigationOptions: defaultStyling,
  },

  plug: {
    screen: PlugScreen,
    navigationOptions: defaultStyling,
  },

  // ---------------------------------

  Settings: {
    screen: SettingsScreen,
    navigationOptions: defaultStyling,
  },

  Avatar: {
    screen: AvatarScreen,
    navigationOptions: defaultStyling,
  },

});

// -------------------------------------------------------------

const RootDrawer = createDrawerNavigator({
    Main: RootStack,
  },
  {
    initialRouteName: 'Main',
    contentComponent: MenuComponent,
    drawerWidth: 250,
    drawerPosition: 'left',
    swipeEnabled: true
  }
);

const AppStack = createStackNavigator({
  drawer: {
    screen: RootDrawer,
  }},
  {
    initialRouteName: 'drawer',
    headerMode:'none',
    
  }
);

const AppContainer = createAppContainer(AppStack);

// -------------------------------------------------------------

export default class App extends Component {
  render() {
    return (
      <AppProvider>
        <AppContainer />
      </AppProvider>
    );
  }
}

class AppProvider extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      user: {},
      isAuthenticated:false,
      authenticate:(user) => {
        this.state.user =  user
      }
    }
  }

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    )
  }

}