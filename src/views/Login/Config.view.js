import React, {Component} from 'react';
import { AsyncStorage, View, Text, Button, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { FormLabel, Header} from 'react-native-elements';

import AppContext from '../../components/AppContext';


export default class ConfigScreen extends Component {

    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;

        this.state = {
            ip: '',
        }
    }

    // Header
    static navigationOptions = ({navigation}) => {
        const {params} = navigation.state;

        return {
            title: navigation.getParam('name', 'Config'),
            headerRight: (
                <TouchableOpacity
                    style = {styles.submitButton}
                    onPress = { () => params.handleSave && params.handleSave() }
                >
                    <Text style = {styles.submitButtonText}> Save </Text>
                </TouchableOpacity>
            )
        }
    };

    componentDidMount() {
        this.props.navigation.setParams({handleSave: () => this.handleSaving()});
        this.getConfigCredentials();
    }

    getConfigCredentials = async() => {
        try {
            let configDetails = await AsyncStorage.getItem('configDetails');
            let parsed = JSON.parse(configDetails);
            this.setState({
                ip: parsed.ip,
            })
         } catch (error) {
           // Error retrieving data
           console.log(error.message);
         }
         return
    }

    handleIP = (text) => {
        this.setState({ ip: text })
    }

    handleSaving = async() => {

        let obj = {
            ip: this.state.ip,
        }

        try {
            await AsyncStorage.setItem('configDetails', JSON.stringify(obj));  
        } catch (error) {
           // Error retrieving data
           alert(error.message);
        }

        this.props.navigation.navigate('Select', {isLoading: true});
    }

    render() {
        const { navigation } = this.props;
        return (

            <View style = {styles.container}>

                <FormLabel style = {styles.label}>IP address:</FormLabel>
                <TextInput
                    style = {styles.input}
                    onChangeText={this.handleIP} 
                    value={this.state.ip}
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
    padding: 10,
    margin: 15,
    height: 40,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#fff',
    },
    submitButtonText:{
    color: 'white'
    }

});

ConfigScreen.contextType = AppContext