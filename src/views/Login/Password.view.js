import React, {Component} from 'react';
import { AsyncStorage, View, Text, StyleSheet, TextInput, Image, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';

import AppContext from '../../components/AppContext';
import Utilities from '../../components/Utilities';

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
            confirmPassword: '',
            ip: ''
        }
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

    handleRegistration = () => {
        let data = {
            method: 'PUT',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'authenticationToken': `Bearer ${this.state.authenticationToken}`
            },
            body: JSON.stringify({
                id: this.state.userId,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword
            })
        }

        Utilities.serverRequest('/api/v1/users/newpassword', data)
            .then((res) => {
                this.props.navigation.navigate('Login', {isLoading: true});
            })
            .catch((error) => {
                alert(error.message)
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

PasswordScreen.contextType = AppContext