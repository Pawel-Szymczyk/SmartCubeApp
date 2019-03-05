import React, {Component} from 'react';
import { AsyncStorage, View, Text, Button, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { FormLabel, Header, CheckBox, Divider} from 'react-native-elements';

import AppContext from '../../components/AppContext';


export default class ConfigScreen extends Component {

    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;

        this.state = {
            ip: '',
            port: '',
            url: '',
            checked: false
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
                port: parsed.port,
                url: parsed.url,
                checked: parsed.checked
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

    handlePort = (text) => {
        this.setState({ port: text })
    }

    handleURL = (text) => {
        this.setState({ url: text })
    }

    handleSaving = async() => {

        let obj = {
            ip: this.state.ip,
            port: this.state.port,
            url: this.state.url,
            checked: this.state.checked
        }

        try {
            if(this.state.checked) {
                if( !this.state.ip || !this.state.port ) {
                    alert('At least one input is empty')
                    return false
                } 
            } else {
                if( !this.state.url ) {
                    alert('At least one input is empty')
                    return false
                }
            }

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

                <FormLabel style = {styles.label}>Server URL address:</FormLabel>
                <TextInput
                    style = {styles.input}
                    onChangeText={this.handleURL} 
                    placeholder='ex. powerful-atoll-10760.herokuapp.com'
                    value={this.state.url}
                    autoCapitalize='none'
                    autoCorrect={false}
                />

                <Divider style={styles.divider} />

                <CheckBox
                    title='Connect with dev environment'
                    containerStyle={styles.checkBox}
                    checked={this.state.checked}
                    onPress={() => this.setState({checked: !this.state.checked})}
                />

                <Divider style={styles.divider} />

                <FormLabel style = {styles.label}>IP address:</FormLabel>
                <TextInput
                    style = {styles.input}
                    onChangeText={this.handleIP}
                    placeholder='ex. 192.168.0.1'
                    value={this.state.ip}
                />

                <FormLabel style = {styles.label}>Port:</FormLabel>
                <TextInput
                    style = {styles.input}
                    onChangeText={this.handlePort} 
                    placeholder='ex. 3000'
                    value={this.state.port}
                    keyboardType='numeric'
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
    },
divider: {
    marginTop: 20,
    backgroundColor: '#f5f6fa'
    // marginBottom: 0,
},
checkBox: {
    backgroundColor: '#fff',
    paddingBottom: 0,
    marginBottom: 0,
    borderWidth: 0,
}

});

ConfigScreen.contextType = AppContext