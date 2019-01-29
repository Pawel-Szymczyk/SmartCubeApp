import React, {Component} from 'react';
import { View, Text, Button, StyleSheet, TextInput, FlatList, TouchableOpacity, Image } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import { FormLabel, Header} from 'react-native-elements'
import { List, ListItem } from 'react-native-elements';

export default class DevicesScreen extends Component {

    constructor(props) {
        super(props);
        this.navigate = this.props.navigation.navigate;
        this.params = this.props.navigation.state.params;
        
        //alert(this.params.areaId)

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
    

        // fetch here
        fetch('http://192.168.0.17:3000/api/v1/devices?areaId='+ this.params.areaId)
        .then(res => res.json())
        .then(res => {
                this.setState({
                devices: res.devices,
                isRefreshing: false,
            });
        })
        .catch(err => {
            console.error(err);
        })
        
    };

    addDeviceEvent() {

        //alert(this.state.areaId)

        this.navigate("AddEditDevice", {
            name: 'Add Device',
            areaId: this.state.areaId
        });

    }

    actionOnRow(item) {

        this.navigate("Rollets", {
            deviceName: item.name
        });
        
    }

    render() {
        const { devices, isRefreshing } = this.state;


        return (
            <View style={styles.scene}>
        
                <List style={styles.scene}>
                
                <FlatList 
                    data={devices}
                    renderItem={({item}) => (
                    <TouchableOpacity onPress = { () => this.actionOnRow(item)}>
                        <ListItem 
                            roundAvatar
                            title={item.name}
                        />
                    </TouchableOpacity>

                    )}
                    keyExtractor={i => i.name}
                    refreshing={isRefreshing}
                    onRefresh={this.onRefresh}
                    onEndReached={this.handleLoadMore}
                    onEndThreshold={0}
                />
                </List>
                
                <TouchableOpacity activeOpacity={0.5} onPress={ () => this.addDeviceEvent()} style={styles.touchableOpacityStyle} >
                    <Image source={require('../images/button.png')}  style={styles.floatingButtonStyle} />
                </TouchableOpacity>

            </View>



            
        );
    }

  }

  const styles = StyleSheet.create({
    scene: {
      flex: 1,
      paddingTop: 25,
    },
    user: {
      width: '100%',
      backgroundColor: '#333',
      marginBottom: 10,
      paddingLeft: 25,
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