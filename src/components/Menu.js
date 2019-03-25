import React, { Component,} from 'react';
import {NavigationActions} from 'react-navigation';
import {StyleSheet, AsyncStorage, Image, TouchableOpacity, DeviceEventEmitter } from 'react-native';
import AppContext from "../components/AppContext";
import { Drawer, Avatar, } from 'react-native-material-ui'; 


export default class MenuComponent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      avatarImage: 'http://facebook.github.io/react-native/img/opengraph.png?2' 
    }

    // Update Avatar Image
    DeviceEventEmitter.addListener('avatar', async() => {
      this.handleAvatarImage();
    })
  }


  handleAvatarImage = async() => {
    let avatarDetails = await AsyncStorage.getItem('avatarDetails');
      if(avatarDetails != null) {
        let parsed = JSON.parse(avatarDetails);
        this.setState({
           avatarImage: parsed.source.uri
        })
      } else {
        //set default avatar image
        this.setState({
          avatarImage: 'http://facebook.github.io/react-native/img/opengraph.png?2'
        })
      }
  }

  navigateToScreen = (route, data) => {

    const navigateAction = NavigationActions.navigate({
      routeName: route,
      params: data
    });

    this.props.navigation.dispatch(navigateAction);
  };

  componentDidMount() {
    this.handleAvatarImage();
  }

  handleLogout = async() => {
    // Remove item from memory and valide if exists, if no then go to...
    AsyncStorage.removeItem('loginDetails');
    let value = await AsyncStorage.getItem('loginDetails');
    if(value === null) {
        this.navigateToScreen('Logout')
    }
  }

  handleAvatarScreen() {
    this.navigateToScreen('Avatar');
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
          this.handleLogout()
        }
    },
  ];

  render () {
    const iconAv = (
      <TouchableOpacity
        onPress={ () => this.handleAvatarScreen() }
      >
        <Avatar
          size={40}
          image={
            <Image style={{width: 60, height: 60, borderRadius:100}}
              source={{ uri: this.state.avatarImage }} 
            />
          }
        />
      </TouchableOpacity>
    )
    return (
      <Drawer>

        <Drawer.Header>
          <Drawer.Header.Account
            //show user details 
            style={{
              container: {
                backgroundColor:  '#fff',
              },
            }}
            avatar={iconAv}
          
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