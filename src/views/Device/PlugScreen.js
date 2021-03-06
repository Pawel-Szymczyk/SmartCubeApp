import React, {Component} from 'react';
import { AsyncStorage, View, Text, StyleSheet, Switch, TouchableOpacity, FlatList  } from 'react-native';

import AppContext from '../../components/AppContext';
import Utilities from '../../components/Utilities';

export default class PlugScreen extends Component {

    constructor(props) {
        super(props);

        this.params = this.props.navigation.state.params;

        this.state = {
          isLoading: true, 
          name: '',
          deviceId: this.params.deviceId,
          serialNumber: '',
          plugData: [],
          plugState: false,
          isSet: false
        };

    }

    static navigationOptions = ({ navigation }) => {
      return {
        title: navigation.getParam('deviceName', 'Plug'),
      };
    };


    // load data from server
    componentDidMount() {
       // if(this.state.isSet) {

            this.setState({ isLoading: true });

            let data = {
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  'authenticationToken': `Bearer ${this.context.user.authenticationToken}`
                },
              }

            Utilities.serverRequest(`/api/v1/devices/plug/${this.params.deviceId}`, data)
            .then((res) => {
                this.setState({
                    plugState: res.powerState,
                    serialNumber: res.serialNumber
                });
            })
            .catch((error) => {
                this.props.navigation.navigate('Login', {isLoading: true});
                //alert(error);
            });

      //  }
    }


    // send message to the server
    plugControl = (value) => {

        this.setState({
            plugState: value,
        });

        // post message
        let data = {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                plugId: this.params.deviceObject.id,
                name: this.params.deviceObject.name,
                type: this.params.deviceObject.type,
                powerState: !this.state.plugState,
                serialNumber: this.state.serialNumber,
                topic: this.params.deviceObject.topic,
                areaId: this.params.deviceObject.areaId
            })
          };

          Utilities.serverRequest(`/api/v1/devices/plug`, data)
          .then((res) => {
              this.setState({
                  plugState: res.state
              });
          })
          .catch((error) => {
            this.props.navigation.navigate('Login', {isLoading: true});
            //  alert(error);
          });

    };


    toggleSwitch1 = (value) => {
        this.setState({switch1Value: value})
        alert('Switch 1 is: ' + value)
     }



    render() {
        const { navigation } = this.props;
        
        return (

            <View style = {styles.container}>

                <View style={styles.box}>
                    <Text style={styles.textBox}>State</Text>
                    <Switch
                        style={styles.switchBox}
                        onValueChange = {this.plugControl}
                        value = {this.state.plugState}
                    />
                </View>

                {/* todo */}
                <View style={styles.box}>
                    <FlatList
                    data={[{key: 'a'}, {key: 'b'}, {key: 'c'}]}
                    renderItem={({item}) => (
                        <View style={styles.innerBox}>
                            <Text style={styles.textBox2}>Current working time</Text>
                            <Text style={styles.textBox2}>{item.key}</Text>
                        </View>
                    )}
                    
                    />
                </View>
            </View>
        )
    }

  }

  const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    box: {
        flexDirection: 'row',
       // height: 70,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        margin: 10,
        padding: 10
    },

    innerBox: {
        flex: 1,
        flexDirection: 'row',
        
        borderWidth: 1,
        borderColor: '#000',
    },

    textBox: {
        flex: 1,
        alignSelf: 'center',
        fontSize: 18,
        color: '#000',
        // borderWidth: 1,
        // borderColor: 'red',
    },

    textBox2: {
        flex: 1,
        alignSelf: 'center',
        fontSize: 14,
        color: '#000',
        borderWidth: 1,
        borderColor: 'red',
    },

    switchBox: {
        flex: 1,
    },

  });

  PlugScreen.contextType = AppContext