import React, {Component} from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Button, ThemeProvider } from 'react-native-elements';

import Menu from "../../components/dropDownMenu";

export default class DevicesScreen extends Component {

    constructor(props) {
        super(props);
        this.navigate = this.props.navigation.navigate;
        this.params = this.props.navigation.state.params;
        

        this.state = {
            areaId: this.params.areaId,
            seed: 1,
            page: 1,

            devices: [],

            isLoading: false,
            isRefreshing: false,
        };
    }

    static navigationOptions = ({ navigation }) => {
      return {
        title: navigation.getParam('areaName', 'Devices'),
        headerRight: <Menu />
      };
    };



    handleRefresh = () => {
        this.setState({
          seed: this.state.seed + 1,
          isRefreshing: true,
        }, () => {
          this.loadDevices();
        });
      };
    
    handleLoadMore = () => {
        this.setState({
            page: this.state.page + 1,
        }, () => {
            this.loadDevices();
        });
    };
    
    componentDidMount() {
        this.loadDevices();
    }
    
    loadDevices = () => {
        const {areas, seed, page} = this.state;
        this.setState({ isLoading: true });
 

        fetch('http://192.168.0.17:3000/api/v1/areas/'+ this.params.areaId)
            .then(res => res.json())
            .then(res => {

                // check if obj is empty
                // if (this.state.acessos && this.state.acessos.length) {}

                var devicesList = [];

                devicesList = devicesList.concat(res.area.rollets);
                devicesList = devicesList.concat(res.area.plugs);
                
                this.setState({
                    devices: devicesList,   
                    isLoading: false,
                });
            })
            .catch(err => {
                console.error(err);
            })
        
    };

    addDeviceEvent() {
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


    render() {
        const { devices, isRefreshing } = this.state;
        return (
            <View style={styles.scene}>
              <FlatList 
                data={devices}
                renderItem={({item}) => (
                  
                  <View style={styles.boxes}>
                    <TouchableOpacity 
                      onPress = { () => this.actionOnRow(item)}
                      style={styles.box}
                    >
                      <Text style={styles.boxName}>{item.name}</Text>
                      <Text style={styles.boxState}>{item.powerState} </Text>
                    </TouchableOpacity> 
                  </View>
              )}
                numColumns={3}
                keyExtractor={(index) => index.name}
                refreshing={isRefreshing}
                onRefresh={this.onRefresh}
                onEndReached={this.handleLoadMore}
                onEndThreshold={0}
              />
      
              <TouchableOpacity activeOpacity={0.5} onPress={ () => this.addDeviceEvent() } style={styles.touchableOpacityStyle} >
                <Image source={require('../../images/addButton.png')}  style={styles.floatingButtonStyle} />
              </TouchableOpacity>
      
            </View>  
          )
    }
}

const styles = StyleSheet.create({
    scene: {
      justifyContent: 'center',
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