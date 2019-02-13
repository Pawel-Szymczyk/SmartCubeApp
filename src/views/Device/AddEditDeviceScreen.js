import React, {Component} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Picker} from 'react-native';
import { FormLabel, Input} from 'react-native-elements';

import Constants from "../../components/Constants";
import AppContext from '../../components/AppContext';

export default class AddEditDeviceScreen extends Component {

    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;
        
        this.state = {
            areaId: this.params.areaId,
            name: '',
            topic: '',
            serialNumber: '',

            pickerValue: '',

            checked: false,
        }
    }

    // Header
    static navigationOptions = ({navigation}) => {
        const {params} = navigation.state;

        return {
            title: navigation.getParam('name', 'Add / Edit Device'),
            headerRight: (
                <TouchableOpacity
                    style = {styles.submitButton}
                    //onPress = { () => this.handleSaving() }
                    onPress = { () => params.handleSave && params.handleSave() }
                >
                    <Text style = {styles.submitButtonText}> Save </Text>
                </TouchableOpacity>
            ),
        };
    };

    componentDidMount() {
        this.props.navigation.setParams({handleSave: () => this.handleSaving()});
    }

    handleName = (text) => {
        this.setState({ name: text })
    }

    handleTopic = (text) => {
        this.setState({ topic: text })
    }

    handleSerialNumber = (text) => {
        this.setState({ serialNumber: text })
    }

    getRequestBody = () => {

        // Note: first selection is rollet but it is empty!
        switch(this.state.pickerValue) {
            case 'rollet':
                return JSON.stringify({
                            name: this.state.name,
                            type: this.state.pickerValue,
                            powerState: "off",
                            deviceActionState: "stop",
                            topic: this.state.topic,
                            areaId: this.state.areaId
                        }); 
            case 'plug':
                return JSON.stringify({
                            name: this.state.name,
                            type: this.state.pickerValue,
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

    handleSaving = () => {

        let data = {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'authenticationToken': 'Bearer ' + this.context.user.authenticationToken
            },
            body: this.getRequestBody()
          }

          fetch('http://' + Constants.SERVER_IP + ':' + Constants.PORT + '/api/v1/devices/' + this.state.pickerValue + '/create', data)
          .then((res) => res.json())
          .then((res) => {
                // close this window and open main...
                this.props.navigation.navigate('Devices', {isLoading: true});
          })
          .catch((error) =>{
            console.error(error);
          });

    }

    handlePickerOption = (value) => {
        if (value != 0) {
            this.setState({pickerValue: value});
        }
        if (value === '' || value === null || value === 0) {
            alert("change it");
        }
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

                <FormLabel style = {styles.label}>Select Device Type:</FormLabel>
                <Picker
                    style = {styles.picker}
                    selectedValue = {this.state.pickerValue}
                    //onValueChange = {(itemValue, itemIndex) => this.setState({pickerValue: itemValue})} 
                    onValueChange = {this.handlePickerOption}
                    >
                    <Picker.Item label="Please, select device type" value='0' />
                    <Picker.Item label="Rollet" value="rollet" />
                    <Picker.Item label="Smart plug" value="plug" />
                    <Picker.Item label="Temperature Sensor" value="temp" />
                    <Picker.Item label="Light Sensor" value="light" />
                    <Picker.Item label="Motion Sensor" value="motion" />
                    <Picker.Item label="Camera" value="camera" />
                    <Picker.Item label="RGB Light" value="rgb" />
                </Picker>

                <FormLabel style = {styles.label}>Device Serial Number</FormLabel>
                <TextInput
                    style = {styles.input}
                    onChangeText={this.handleSerialNumber}
                />
               
                <FormLabel style = {styles.label}>Device Topic</FormLabel>
                <TextInput
                    style = {styles.input}
                    onChangeText={this.handleTopic}
                />

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
        color: '#B6462D'
    },
    input: {
        height: 30,
        padding: 0,
        paddingLeft: 5,
        paddingRight: 5,
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 10,
        color: '#000',
        borderBottomWidth: 1,
        backgroundColor: '#fff',
    },
    submitButton: {
        padding: 10,
        margin: 15,
        height: 40,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#fff',
     },
     submitButtonText:{
        color: 'white'
     },
     picker: {
        margin: 15,
     },
  });

  AddEditDeviceScreen.contextType = AppContext