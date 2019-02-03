import React, {Component} from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity  } from 'react-native';

export default class PlugScreen extends Component {

    constructor(props) {
        super(props);

        this.params = this.props.navigation.state.params;

        this.state = {

          isLoading: true, 
          name: '',

          plugBoolValue: false,
          plugStringValue: 'on',
        };
    }

    static navigationOptions = ({ navigation }) => {
      return {
        title: navigation.getParam('deviceName', 'Rollet'),
      };
    };


    // load data from server
    getData(){

    }

    // send message to the server
    plugControl() {

        this.setState({
            plugBoolValue: !this.state.plugBoolValue,
        })

        if(this.state.plugBoolValue) {
            this.setState({
                plugStringValue: 'on',
            });
            
        } else {
            this.setState({
                plugStringValue: 'off',
            });
            
        }

        // post message
        let data = {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              state: this.state.plugStringValue
            })
          }
  
  
          // add device id to url
          fetch('http://192.168.0.17:3000/api/v1/devices/plug', data)
          .then((response) => response.json())
          .then((responseJson) => {
  
  
          //   if(responseJson.state == false) {
          //     this.setState({
          //         plugBoolValue: true,
          //         plugStringValue: 'on'
          //     });
          //   }
          //   else {
          //     this.setState({
          //         plugBoolValue: false,
          //         plugStringValue: 'off'
          //     });
          //   }
  
          })
          .catch((error) =>{
            console.error(error);
          });

    };



    render() {
        const { navigation } = this.props;

        return (

            <View style = {styles.container}>

                <View style={styles.box}>
                    <Text style={styles.textBox}>State</Text>
                    <Switch
                        style={styles.switchBox}
                        onValueChange = {() => this.plugControl()}
                        value = {this.state.plugBoolValue}
                    />
                </View>

                {/* todo */}
                <View style={styles.box}>
                    <Text style={styles.textBox}>State</Text>
                    <Text style={styles.textBox}>Text here </Text>
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
        padding: 10
    },

    textBox: {
        flex: 1,
        alignSelf: 'center',
        fontSize: 18,
        color: '#000',
        // borderWidth: 1,
        // borderColor: 'red',
    },

    switchBox: {
        flex: 1,
    },

  });