import React, {Component} from 'react';
import { AsyncStorage, View, Text, StyleSheet, Switch, TouchableOpacity, Image  } from 'react-native';

import AppContext from '../../components/AppContext';
import Utilities from '../../components/Utilities';

export default class RolletScreen extends Component {

    constructor(props) {
        super(props);

        this.params = this.props.navigation.state.params;

        this.state = {
          isLoading: true, 
          name: '',

          switchValue: false,
          stateValue: 'off',
          actionValue: 'stop',
        };
    }

    static navigationOptions = ({ navigation }) => {
      return {
        title: navigation.getParam('deviceName', 'Rollet'),
      };
    };

    componentDidMount() {
        //this.getConfigCredentials();
    }

    // getConfigCredentials = async() => {
    //     try {
    //         let configDetails = await AsyncStorage.getItem('configDetails');
    //         let parsed = JSON.parse(configDetails);
    //         this.setState({
    //             ip: parsed.ip,
    //         })
            
    //     } catch (error) {
    //         // Error retrieving data
    //         console.log(error.message);
    //     }
    //     return
    // }

    _changeStateValue() {

        if(this.state.switchValue == false) {
            this.setState({
                switchValue: true,
                stateValue: 'on',
                actionValue: 'stop',
            });
        } else {
            this.setState({
                switchValue: false,
                stateValue: 'off',
                actionValue: 'stop',
            });

        }

    }

    _rolletControl(event) {

        let data = {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            // state: this.state.stateValue,
            // action: this.state.actionValue,
            state: 'on',
            action: event,
            serialNumber: 'RT000001-CUBE'
          })
        }

        Utilities.serverRequest(`/api/v1/devices/rollet`, data)
        .then((res) => {
            // this.setState({
            //     plugState: res.state
            // });
        })
        .catch((error) => {
            alert(error);
        });
    
        // fetch('http://' + this.state.ip + ':' + Constants.PORT + '/api/v1/devices/rollet', data)
        // .then((response) => response.json())
        // .then((responseJson) => {
          
    
        // })
        // .catch((error) => {
        //   console.error(error);
        // });
  
    }


    render() {
        const { navigation } = this.props;
        
        return (

            <View style = {styles.container}>
                <Text style={{paddingTop: 30, paddingLeft: 10}}>Rollet Description here</Text>

                <View style={styles.box}>
                    <Text style={styles.textBox}>State</Text>
                    <Switch
                        style={styles.switchBox}
                        onValueChange = {() => this._changeStateValue()}
                        value = {this.state.switchValue}
                        // TODO: later fix this issue; and provide ability to make rollet 'on' but without executing action
                    />
                </View>

                <View style={styles.actionBox}>
                    <Text style={styles.textBox}>Action</Text>

                    <TouchableOpacity
                        onPress={() => this._rolletControl('up')}
                        disabled={!this.state.switchValue}
                        style={ !this.state.switchValue ? styles.disabledBtn : styles.button }
                    >
                    <Image 
                        source={require('../../images/upArrow.png')}
                        style={styles.image}
                        
                    />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => this._rolletControl('stop')}
                        disabled={!this.state.switchValue}
                        style={ !this.state.switchValue ? styles.disabledBtn : styles.button }
                    >
                    <Image 
                        source={require('../../images/pauseBtn.png')}
                        style={{width: 22, height: 22}}
                    />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => this._rolletControl('down')}
                        disabled={!this.state.switchValue}
                        style={ !this.state.switchValue ? styles.disabledBtn : styles.button }
                    >
                    <Image 
                        source={require('../../images/downArrow.png')}
                        style={styles.image}
                    />
                    </TouchableOpacity>
                    
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
        height: 70,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        margin: 10,
        padding: 10,
    },

    actionBox: {
        flexDirection: 'row',
        height: 70,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        margin: 10,
        padding: 10,
    },

    textBox: {
        flex: 6,
        alignSelf: 'center',
        fontSize: 18,
        color: '#000',
    },

    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: '#ecf0f1',
        padding: 10,
        margin: 1,
    },

    disabledBtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#bbb',
        padding: 10,
        margin: 1
    },

    image: {
        width: 30, 
        height: 30
    },

  });