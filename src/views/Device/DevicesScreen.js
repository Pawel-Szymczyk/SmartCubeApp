import React, {Component} from 'react';
import { AsyncStorage, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import Swipeable from 'react-native-swipeable';

import AppContext from '../../components/AppContext';
import Constants from "../../components/Constants";

let willfocus = null;

export default class DevicesScreen extends Component {

    constructor(props) {
        super(props);
        this.navigate = this.props.navigation.navigate;
        this.params = this.props.navigation.state.params;
        
        this.state = {
            areaId: this.params.areaId,
            devices: [],
            isLoading: false,
            ip: '',
            isSet: false
        };
    }

    static navigationOptions = ({ navigation }) => {
      return {
        title: navigation.getParam('areaName', 'Devices'),
      };
    };

    swipeable = null;
    
    // Quick item loads after reload page
    componentDidMount() {
      
      willFocus = this.props.navigation.addListener(
        'willFocus',
        payload => {
         // if (this.state.isLoading) {
          
          this.getConfigCredentials();
          if(this.state.isSet) {
            this.loadDevices();
          }
         // }
        }
      );
    }

    getConfigCredentials = async() => {
      try {
          let configDetails = await AsyncStorage.getItem('configDetails');
          let parsed = JSON.parse(configDetails);
          this.setState({
              ip: parsed.ip,
              isSet: true,
          })
          this.loadDevices();
      } catch (error) {
          // Error retrieving data
          console.log(error.message);
      }
      return
    }
    
    loadDevices = () => {
        this.setState({ isLoading: true });
 
        fetch('http://' + this.state.ip + ':' + Constants.PORT + '/api/v1/areas/' + this.params.areaId, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'authenticationToken': 'Bearer ' + this.context.user.authenticationToken
          },
        })
        .then(res => res.json())
        .then(res => {

            var devicesList = [];
            devicesList = devicesList.concat(res.area.rollets);
            devicesList = devicesList.concat(res.area.plugs);
            devicesList = devicesList.concat(res.area.rgbs); // ?
            
            this.setState({
              devices: devicesList,   
              isLoading: false,
            });
        })
        .catch(err => {
            console.error(err);
        })
    };

    deleteDevice = (item) => {

      fetch('http://' + this.state.ip + ':' + Constants.PORT + '/api/v1/devices/' + item.type + '/delete/' + item.id, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'authenticationToken': 'Bearer ' + this.context.user.authenticationToken
        },
      })
      .then(res => res.json())
      .then(res => {
  
        this.loadDevices();
  
        alert( item.type + " removed successfuly");
      })
      .catch(err => {
        console.error(err);
      })
  
    };

    handleEditDevice() {

    }
    
    handleAddDevice() {
      this.navigate("AddEditDevice", {
        name: 'Add Device',
        areaId: this.state.areaId
      });
    }

    // Go to 'device' panel.
    actionOnRow(item) {
      this.navigate(item.type, {
        deviceId: item.id,
        deviceName: item.name,
        deviceObject: item
      });
    }

    getIcon = (iconType) => {
  
    }

    render() {
        const { devices, isRefreshing } = this.state;
        return (
          <View style={styles.scene}>
            {
              this.state.devices.map((item) => {
                return (
                  <Swipeable
                    onRef={ref => this.swipeable = ref} 
                    key={item.deviceId}
                    rightButtons={[
                      <TouchableOpacity
                        onPress={() => this.handleEditDevice()}
                      >
                        <Icon
                          //raised
                          containerStyle={{backgroundColor: '#00a8ff', height: 80, paddingLeft: 30, alignItems: 'flex-start'}}
                          name='edit'  
                          type='font-awesome'
                          color='#fff'
                          
                        />
                      </TouchableOpacity>,
                      <TouchableOpacity
                        onPress={ () => this.deleteDevice(item)}
                      >
                        <Icon
                          //raised
                          containerStyle={{backgroundColor: '#e84118', height: 80, paddingLeft: 30, alignItems: 'flex-start'}}
                          name='trash'    
                          type='font-awesome'
                          color='#fff'
                        />
                      </TouchableOpacity>
                    ]} 
                  >
                    <View>
                      <TouchableOpacity 
                        onPress = { () => this.actionOnRow(item)}
                      >
                        <ListItem
                          leftIcon={
                            
                            <Icon
                              //raised
                              containerStyle={{padding: 10, paddingRight: 20}}
                              //name='bed'
                              name={item.icon}
                              type='font-awesome'
                              color='#000'
                            />
                          }
                          title={item.name}
                          subtitle = {item.powerState}
                          chevronColor={'transparent'}
                          containerStyle={{height: 80, justifyContent: 'center'}}
                        />
                      </TouchableOpacity> 
                    </View>
                  </Swipeable>
                )
              })
            }

            <TouchableOpacity activeOpacity={0.5} onPress={ () => this.handleAddDevice() } style={styles.touchableOpacityStyle} >
              <Icon
                iconStyle={{fontSize: 40}}
                name='plus-square'  
                type='font-awesome'
                color='#34495e'
              />
            </TouchableOpacity>    
          </View>  
        )
    }
}

const styles = StyleSheet.create({

    scene: {
      flex: 1,
      backgroundColor: '#fff',
    },
    boxes: {
      flex: 1, 
      flexDirection: 'column',
      margin: 2,
      backgroundColor: '#ecf0f1',
      borderWidth: 1,
      borderColor: '#ecf0f1',
      height: Dimensions.get('window').width / 3,
    },
    box: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    boxName: {
      fontSize: 16,
      color: '#000'
    },
    boxState: {
      fontSize: 14,
    },
    touchableOpacityStyle: {
      position: 'absolute',
      width: 50,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      right: 30,
      bottom: 30,
    },
    floatingButtonStyle: {
      resizeMode: 'contain',
      width: 50,
      height: 50,
    },
  });

  DevicesScreen.contextType = AppContext