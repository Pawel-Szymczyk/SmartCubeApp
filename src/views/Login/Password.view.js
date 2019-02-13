import React, {Component} from 'react';
import { ActivityIndicator, View, Text, StyleSheet, TextInput, Image, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';

import Constants from '../../components/Constants';

export default class PasswordScreen extends Component {

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;

        this.state = {
            userId: this.params.userId,
            authenticationToken: this.params.authenticationToken,
            password: '',
            confirmPassword: ''
        }
    }

    handlePasswordInput = (text) => {
        this.setState({ password: text })
    }

    handlePassword2Input = (text) => {
        this.setState({ confirmPassword: text })
    }

    // TODO: add store asynTonec to asyncStorage functionality...

    handleRegistration = () => {

        let status;

        let data = {
            method: 'PUT',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'authenticationToken': 'Bearer ' + this.state.authenticationToken
            },
            body: JSON.stringify({
                id: this.state.userId,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword
            })
        }

        fetch(Constants.SERVER_HTTP_ADDRESS + '/api/v1/users/newpassword', data)
          .then(response => {
            status = response.status;
            return response.json();
          })
          .then((res) => {
                if(status === 200) {
                    this.props.navigation.navigate('Login', {isLoading: true});
                   // alert("works")
                } else {
                    alert(res[0].message)
                }
          })
          .catch((error) =>{
            //console.error(error);
            alert(error);
          });

    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={styles.logoContainer}>

                    <Text>
                        <Text style={styles.title}>cube</Text>
                        <Text style={styles.title2Part}>automation</Text>
                    </Text>
                    
                </View>
                <View style={styles.formContainer}>

                    <Text style={styles.subtitle}>New Password</Text>

                    <TextInput
                        style={styles.input}
                        placeholder = 'Password'
                        placeholderTextColor='rgba(255,255,255,0.7)'
                        returnKeyType="next"
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
                        <Text style={styles.buttonText}>Reset Password</Text>
                    </TouchableOpacity>

                </View>
            </View>
        )    
    };
}


const styles = StyleSheet.create({
    // backgoundImg: {
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     width: Dimensions.get('window').width,
    //     height: Dimensions.get('window').height,
    //     //  opacity: 0.5
    //    // resizeMode: 'stretch',
    // },
    container: {
        flex: 1,
        backgroundColor: '#34495e',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
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
    title: {
        fontSize: 28,
        color: '#fff',
        marginTop: 10,
        textAlign: 'center',
    },
    title2Part: {
        fontSize: 30,
        color: '#fff',
        marginTop: 10,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    formContainer: {
        // flex: 1,
       flexGrow: 2,
    },
    subtitle: {
        fontSize: 22,
        color: '#fff',
        marginTop: 10,
        marginBottom: 30,
        textAlign: 'center',
        
    },
    input: {
        height: 40,
        borderBottomWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.8)',
        marginBottom: 20,
        color: '#FFF',
        paddingHorizontal: 10,
        width: 250,
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