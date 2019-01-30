import React, {Component} from 'react';
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity, Picker } from 'react-native';
import { FormLabel, Header} from 'react-native-elements'

export default class AddEditDeviceScreen extends Component {

    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;

        
        this.state = {
            areaId: this.params.areaId,
            name: '',
            topic: '',

            PickerSelectedValue: '',
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

    getRequestBody = () => {
        // alert("Selected value is: " + this.state.PickerSelectedValue);

        // Note: first selection is rollet but it is empty!
        switch(this.state.PickerSelectedValue) {
            case 'rollet':
                return JSON.stringify({
                            name: this.state.name,
                            powerState: "off",
                            deviceActionState: "stop",
                            topic: this.state.topic,
                            areaId: this.state.areaId
                        }); 
            case 'plug':
                return JSON.stringify({
                            name: this.state.name,
                            powerState: "off",
                            topic: this.state.topic,
                            areaId: this.state.areaId
                        }); 
            case 'temp':
                return JSON.stringify({});
            case 'light':
                return JSON.stringify({});
            case 'motion':
                return JSON.stringify({});
            case 'camera':
                return JSON.stringify({});
            case 'rgb':
                return JSON.stringify({});
        }
    }

    // getRequestURL = () => {
    //     // alert("Selected value is: " + this.state.PickerSelectedValue);

    //     // Note: first selection is rollet but it is empty!
    //     switch(this.state.PickerSelectedValue) {
    //         case 'rollet':
    //             return 'http://192.168.0.17:3000/api/v1/devices/rollet/create';
    //         case 'plug':
    //             return 'http://192.168.0.17:3000/api/v1/devices/plug/create';
    //         case 'temp':
    //             return 'http://192.168.0.17:3000/api/v1/devices/temperature/create';
    //         case 'light':
    //             return 'http://192.168.0.17:3000/api/v1/devices/light/create';
    //         case 'motion':
    //             return 'http://192.168.0.17:3000/api/v1/devices/motion/create';
    //         case 'camera':
    //             return 'http://192.168.0.17:3000/api/v1/devices/camera/create';
    //         case 'rgb':
    //             return 'http://192.168.0.17:3000/api/v1/devices/rgb/create';
    //     }
    // }

    handleSaving = () => {

      //  let selectedBody = this.getSelectedPickerValue();

        // let data = {
        //     method: 'POST',
        //     headers: {
        //       Accept: 'application/json',
        //       'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //       name: this.state.name,
        //       powerState: "off",
        //       deviceActionState: "stop",
        //       topic: this.state.topic,
        //       areaId: this.state.areaId
        //     })
        //   }

        let data = {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: this.getRequestBody()
          }
      
        fetch('http://192.168.0.17:3000/api/v1/devices/create', data)
        //fetch('http://192.168.0.17:3000/api/v1/devices/' + this.state.PickerSelectedValue + 'create', data)
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


                <FormLabel style = {styles.label}>Select Value:</FormLabel>
                <Picker
                    selectedValue = {this.state.PickerSelectedValue}
                    onValueChange = {(itemValue, itemIndex) => this.setState({PickerSelectedValue: itemValue})} 
                    >

                    {/* Here download list of devices types, for now it is hardcoded */}
                    <Picker.Item label="Rollet" value="rollet" />
                    <Picker.Item label="Smart plug" value="plug" />
                    <Picker.Item label="Temperature Sensor" value="temp" />
                    <Picker.Item label="Light Sensor" value="light" />
                    <Picker.Item label="Motion Sensor" value="motion" />
                    <Picker.Item label="Camera" value="camera" />
                    <Picker.Item label="RGB Light" value="rgb" />
                    {/* etc. */}
                </Picker>

                {/* <Button title="Get Selected value" onPress={this.getSelectedPickerValue }/> */}


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