import React, { Component,} from 'react';
import {NavigationActions} from 'react-navigation';
import {StyleSheet, AsyncStorage,} from 'react-native';
import AppContext from "../components/AppContext";
import { Drawer, Avatar, } from 'react-native-material-ui'; 


export default class MenuComponent extends Component {

  constructor(props) {
    super(props)

  }

  navigateToScreen = (route, data) => {

    const navigateAction = NavigationActions.navigate({
      routeName: route,
      params: data
    });

    this.props.navigation.dispatch(navigateAction);
  };

  checkValidation = async() => {
      // Remove item from memory and valide if exists, if no then go to...
      AsyncStorage.removeItem('loginDetails');
      let value = await AsyncStorage.getItem('loginDetails');
      if(value === null) {
          this.navigateToScreen('Logout')
      }
  }

  menuList = [
    {
      value: 'Home',
      icon: 'home',
      onPress: () => {
        this.navigateToScreen('Home')
      }
    },

  ];

  personalList = [
    {
        value: 'Settings',
        icon: 'settings',
        onPress: () => {
          this.navigateToScreen('Settings')
        }
    },
    {
        value: 'Info',
        icon: 'info',
        onPress: () => {
          this.navigateToScreen()
        }
    },
    {
        value: 'Logout',
        icon: 'exit-to-app',
        onPress: () => {
            
            this.checkValidation()
        }
    },
  ];

  render () {
    return (
      <Drawer>

        <Drawer.Header>
          <Drawer.Header.Account
            style={{
              container: {
                
                backgroundColor:  '#34495e',
              },
              primaryText: {
                color: '#fff'
              }
            }}
            avatar={
              <Avatar 
                icon="person" 
              />
            }
          
            footer={{
              dense: true,
              centerElement: {
                primaryText: this.context.user.username,
                secondaryText: this.context.user.email,
              },
            
            }}
          />
        </Drawer.Header>

        <Drawer.Section
          divider
          items={this.menuList}
        />

        <Drawer.Section
            divider
            title="Personal"
            items={this.personalList}
        />

      </Drawer>
    )
  }
}

const styles = StyleSheet.create({
  menu: {
    flex:1,
    paddingTop:25,
    flexDirection:'column',
    backgroundColor:'white'

  },
  listItem: {
    borderBottomWidth: 1,
    margin:5
  }
})

MenuComponent.contextType = AppContext