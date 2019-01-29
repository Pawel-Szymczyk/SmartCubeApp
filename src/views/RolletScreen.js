import React, {Component} from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TextInput, Button, Switch, TouchableOpacity  } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import { FormLabel, Header} from 'react-native-elements'

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
          })
        }
    
        fetch('http://192.168.0.17:3000/api/v1/devices/rollet', data)
        .then((response) => response.json())
        .then((responseJson) => {
          //alert(responseJson.state);
  
          // this.setState({
          //   lightValue: responseJson.state
          // })

        //   if(event == 'up') {
        //     this.setState({
        //         stateValue: 'on',
        //         actionValue: 'up' 
        //     });
        //   }  

        //   if(event == 'down') {
        //     this.setState({
        //         stateValue: 'on',
        //         actionValue: 'down' 
        //     });
        //   }

        //   if(event == 'stop') {
        //     this.setState({
        //         stateValue: 'on',
        //         actionValue: 'stop' 
        //     });
        //   }


    
        })
        .catch((error) => {
          console.error(error);
        });
  
    }



    render() {
        const { navigation } = this.props;

        return (

            <View style = {styles.container}>

                <Text style={{paddingTop: 30, paddingLeft: 10}}>Rollet</Text>

                <Switch
                    onValueChange = {() => this._changeStateValue()}
                    value = {this.state.switchValue}
                />


                <TouchableOpacity
                    onPress={() => this._rolletControl('up')}
                    disabled={!this.state.switchValue}
                    style={ !this.state.switchValue ? styles.disabledBtn : styles.button }
                >
                  <Text>UP</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => this._rolletControl('stop')}
                    disabled={!this.state.switchValue}
                    style={ !this.state.switchValue ? styles.disabledBtn : styles.button }
                >
                  <Text>STOP</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => this._rolletControl('down')}
                    disabled={!this.state.switchValue}
                    style={ !this.state.switchValue ? styles.disabledBtn : styles.button }
                >
                  <Text>DOWN</Text>
                </TouchableOpacity>


            </View>

            
        )
    }

  }

  const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    label: {
        fontSize: 20,
    },
    input: {
        height: 30,
        padding: 0,
        paddingLeft: 5,
        paddingRight: 5,
        marginLeft: 15,
        marginRight: 15,
        color: '#000',
        borderBottomWidth: 1,
        backgroundColor: '#fff',
    },

    button: {
        alignItems: 'center',
        backgroundColor: '#841584',
        padding: 10,
        margin: 10,
        
    },

    disabledBtn: {
        alignItems: 'center',
        backgroundColor: '#bbb',
        padding: 10,
        margin: 10
    },
  });