import React, {Component} from 'react';
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { FormLabel, Header} from 'react-native-elements'

export default class AddEditDeviceScreen extends Component {

    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;

        
        this.state = {
            areaId: this.params.areaId,
            name: '',
            topic: '',
        }
    }

    static navigationOptions = ({ navigation }) => {
       
      return {
        title: navigation.getParam('name', 'Add / Edit Device'),
      };
    };



    handleName = (text) => {
        this.setState({ name: text })
    }

    handleTopic = (text) => {
        this.setState({ topic: text })
    }



    handleSaving = () => {
        let data = {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: this.state.name,
              powerState: "off",
              deviceActionState: "stop",
              topic: this.state.topic,
              areaId: this.state.areaId
            })
          }
      
          fetch('http://192.168.0.17:3000/api/v1/devices/create', data)
          .then((res) => res.json())
          .then((res) => {
                // close this window and open main...
                this.props.navigation.navigate('Devices', {isLoading: true});
          })
          .catch((error) =>{
            console.error(error);
          });
    }

    render() {
        const { navigation } = this.props;
       

        return (


            <View style = {styles.container}>

                <FormLabel style = {styles.label}>Device Name</FormLabel>
                <TextInput
                    style = {styles.input}
                    onChangeText = {this.handleName}
                />
                <FormLabel style = {styles.label}>Device Topic</FormLabel>
                <TextInput
                    style = {styles.input}
                    onChangeText={this.handleTopic}
                />

                <TouchableOpacity
                    style = {styles.submitButton}
                    onPress = { () => this.handleSaving() }
                >
                    <Text style = {styles.submitButtonText}> Save </Text>
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
    submitButton: {
        backgroundColor: '#7a42f4',
        padding: 10,
        margin: 15,
        height: 40,
     },
     submitButtonText:{
        color: 'white'
     }

  });