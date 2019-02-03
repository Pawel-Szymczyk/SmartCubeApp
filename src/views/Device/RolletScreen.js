import React, {Component} from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Image  } from 'react-native';

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
                <Text style={{paddingTop: 30, paddingLeft: 10}}>Rollet Description here</Text>




                <View style={styles.box}>
                    <Text style={styles.textBox}>State</Text>
                    <Switch
                        style={styles.switchBox}
                        // onValueChange = {() => this.plugControl()}
                        // value = {this.state.plugBoolValue}
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

        // borderWidth: 1,
        // borderColor: 'red',
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