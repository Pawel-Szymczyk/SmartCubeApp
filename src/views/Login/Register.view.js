import React, {Component} from 'react';
import {AsyncStorage, ActivityIndicator, View, Text, StyleSheet, TextInput, Image, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';

import AppContext from '../../components/AppContext';
import Constants from '../../components/Constants';

import Utilities from '../../components/Utilities';

export default class RegistrationScreen extends Component {

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            secretAnswer: '',
            password: '',
            confirmPassword: '',

            configCheck: '',
            ip: '',
            port: '',
            url: '',
        }
    }

    handleFirstNameInput = (text) => {
        this.setState({ firstName: text })
    }

    handleLastNameInput = (text) => {
        this.setState({ lastName: text })
    }

    handleEmailInput = (text) => {
        this.setState({ email: text })
    }

    handleUsernameInput = (text) => {
        this.setState({ username: text })
    }

    handleSecretKeyInput = (text) => {
        this.setState({ secretAnswer: text })
    }

    handlePasswordInput = (text) => {
        this.setState({ password: text })
    }

    handlePassword2Input = (text) => {
        this.setState({ confirmPassword: text })
    }

    componentDidMount() {
        this.getConfigCredentials();
    }

    storeAuthorizationToken = async (token) => {
        try {
           await AsyncStorage.setItem('authorizationToken', token);
           // TODO: convert this to store array, that allows to recognize who is trying to login in 
        } catch (error) {
          // Error retrieving data
          console.log(error.message);
        }
      };

    getConfigCredentials = async() => {
        try {
            let configDetails = await AsyncStorage.getItem('configDetails');
            let parsed = JSON.parse(configDetails);
            //alert(parsed.checked)
            this.setState({
                configCheck: parsed.checked,
                ip: parsed.ip,
                port: parsed.port,
                url: parsed.url,
            })
        } catch (error) {
            // Error retrieving data
            console.log(error.message);
        }
        return
    }

    getURL = () => {
        //let fetchURL;

        if(!this.state.configCheck) {
            return 'https://' + this.state.url
        } else {
            return 'http://' + this.state.ip + ':' + this.state.port
        }
    }

    handleRegistration = () => {

        let status;

        let data = {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                username: this.state.username,
                secretAnswer: this.state.secretAnswer,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword
            })
        }

        alert(`${this.getURL()}/api/v1/users/registration`)

        // fetch(`${this.getURL()}/api/v1/users/registration`, data)
        //   .then(response => {
        //     status = response.status;
        //     return response.json();
        //   })
        //   .then((res) => {
        //       alert(status)
        //         if(status === 200) {

        //             this.storeAuthorizationToken(res.authorizationToken);
        //             // set local settings...
        //             //this.setUserObject(res.user);
        //             // close this window and open main...
        //             this.props.navigation.navigate('Login', {isLoading: true});
        //         } else {
        //             alert(res[0].message)
        //         }
        //   })
        //   .catch((error) =>{
        //     alert(error);
        //   });

    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image
                        style={styles.logoText}
                        source={require('../../images/textLogo.png')}
                    />
                </View>
                <View style={styles.formContainer}>

                    <Text style={styles.subtitle}>Create Account</Text>

                    <TextInput
                        style={styles.input}
                        placeholder = 'First Name'
                        placeholderTextColor='rgba(255,255,255,0.7)'
                        returnKeyType="next"
                        onSubmitEditing={() => this.lastName.focus()}
                        keyboardType='default'
                        autoCapitalize='words'
                        autoCorrect={false}
                        onChangeText={this.handleFirstNameInput}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder = 'Last Name'
                        placeholderTextColor='rgba(255,255,255,0.7)'
                        returnKeyType="next"
                        onSubmitEditing={() => this.email.focus()}
                        keyboardType='default'
                        autoCapitalize='words'
                        autoCorrect={false}
                        ref={(input) => this.lastName = input}
                        onChangeText={this.handleLastNameInput}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder = 'Email'
                        placeholderTextColor='rgba(255,255,255,0.7)'
                        returnKeyType="next"
                        onSubmitEditing={() => this.usernameInput.focus()}
                        keyboardType='email-address'
                        autoCapitalize='none'
                        autoCorrect={false}
                        ref={(input) => this.email = input}
                        onChangeText={this.handleEmailInput}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder = 'Username'
                        placeholderTextColor='rgba(255,255,255,0.7)'
                        returnKeyType="next"
                        onSubmitEditing={() => this.secretKeyInput.focus()}
                        keyboardType='default'
                        autoCapitalize='words'
                        autoCorrect={false}
                        ref={(input) => this.usernameInput = input}
                        onChangeText={this.handleUsernameInput}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder = 'Secret Key'
                        placeholderTextColor='rgba(255,255,255,0.7)'
                        returnKeyType="next"
                        onSubmitEditing={() => this.passwordInput.focus()}
                        keyboardType='default'
                        autoCapitalize='none'
                        autoCorrect={false}
                        ref={(input) => this.secretKeyInput = input}
                        onChangeText={this.handleSecretKeyInput}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder = 'Password'
                        placeholderTextColor='rgba(255,255,255,0.7)'
                        returnKeyType="go"
                        onSubmitEditing={() => this.passwordInput2.focus()}
                        autoCapitalize='none'
                        autoCorrect={false}
                        ref={(input) => this.passwordInput = input}
                        onChangeText={this.handlePasswordInput}
                        secureTextEntry
                    />

                    <TextInput
                        style={styles.input}
                        placeholder = 'Repeat Password'
                        placeholderTextColor='rgba(255,255,255,0.7)'
                        returnKeyType="go"
                        autoCapitalize='none'
                        autoCorrect={false}
                        ref={(input) => this.passwordInput2 = input}
                        onChangeText={this.handlePassword2Input}
                        secureTextEntry
                    />
                    
                    <TouchableOpacity 
                        style={styles.buttonContainer}
                        onPress = { () => this.handleRegistration() }
                    >
                        <Text style={styles.buttonText}>Create Account</Text>
                    </TouchableOpacity>

                </View>
            </View>
        )    
    };
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#34495e',
    },
    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center',
    },
    logo: {
        width: 90,
        height: 90,
    },
    logoText: {
        width: 220, 
        height: 30,
    },
    formContainer: {
       flexGrow: 2,
    },
    subtitle: {
        fontSize: 22,
        color: '#fff',
        marginTop: 50,
        marginBottom: 10,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderBottomWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.8)',
        marginBottom: 20,
        color: '#FFF',
        paddingHorizontal: 10,
        width: '60%',
        alignSelf: 'center',
    },
    buttonContainer: {
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 7,
        paddingVertical: 10,
        width: 260,
        marginTop: 10,
        marginBottom: 15,
        alignSelf: 'center',
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFF',
        fontWeight: '700',
    },
});

RegistrationScreen.contextType = AppContext