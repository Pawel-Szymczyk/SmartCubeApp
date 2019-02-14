import React, {Component} from 'react';
import { View, Text, Button, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { createStackNavigator, createAppContainer, createDrawerNavigator, DrawerItems } from "react-navigation";
import { Avatar } from 'react-native-elements'
import AppContext from './src/components/AppContext';

// Routes...
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

const RootStack = createStackNavigator(
  {
    Select: SelectScreen,
    Login: LoginScreen,
    Registration: RegistrationScreen,
    ForgetPassword: ForgetPasswordScreen,
    Password: PasswordScreen,
    Settings: SettingsScreen,
    Home: HomeScreen,
    AddEditArea: AddEditAreaScreen,
    Devices: DevicesScreen,
    AddEditDevice: AddEditDeviceScreen,

    rollet: RolletScreen,
    plug: PlugScreen,
  },
  {
     initialRouteName: 'Select',
     // initialRouteName: 'Home',

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
    Settings: { screen: RootStack, },

    Logout: { screen: LoginScreen, }
  },
  
  {
    // initialRouteName: 'Home',
    // drawerWidth: 200,

    contentComponent: (props) => (
      <SafeAreaView >
          <View style={{height: 170,alignItems: 'center', justifyContent: 'center', backgroundColor: '#34495e'}}>
            <Avatar
              xlarge
              rounded
              title="PS"
              activeOpacity={0.7}
            />
            
          </View>
        <ScrollView>
          <DrawerItems {...props} />
          
        {/* <TouchableOpacity
          onPress={() => {this.navigate.} }
          >
          <View style={{  }}>
            <Text style={{color: '#444'}}>Logout</Text>
          </View>
        </TouchableOpacity> */}

        </ScrollView>
      </SafeAreaView>
     )
  },

);



const AppContainer = createAppContainer(RootDrawer);

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