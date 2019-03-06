import React, {Component} from 'react';
import { AsyncStorage, ActivityIndicator, View, Text, StyleSheet, TextInput, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { CheckBox } from 'react-native-elements'

import AppContext from '../../components/AppContext';
import Utilities from '../../components/Utilities';

export default class LoginScreen extends Component {

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            authorizationToken: '',
            checked: false,
        }
    }

    handleUsernameInput = (text) => {
        this.setState({ username: text })
    }

    handlePasswordInput = (text) => {
        this.setState({ password: text })
    }

    componentDidMount() {
        this.getAuthorizationToken();
        this.getLoginCredentials();
    }

    // Set app context object...
    setUserObject = (obj) => {
        //alert(obj.authenticationToken)
        this.context.authenticate(obj);
    }

    getAuthorizationToken = async () => {
        
        try {
           const token = await AsyncStorage.getItem('authorizationToken');
           this.setState({
            authorizationToken: token
           })
           //return token;
        } catch (error) {
          // Error retrieving data
          console.log(error.message);
        }
        return
    };

    storeLoginCredentials = async(username, password, isChecked) => {
        let obj = {
            username: username,
            password: password,
            isChecked: isChecked
        }

        try {
            await AsyncStorage.setItem('loginDetails', JSON.stringify(obj));
            // TODO: convert this to store array, that allows to recognize who is trying to login in 
         } catch (error) {
           // Error retrieving data
           console.log(error.message);
         }
    }

    getLoginCredentials = async() => {
        
        try {
            let loginDetails = await AsyncStorage.getItem('loginDetails');
            let parsed = JSON.parse(loginDetails);
            this.setState({
                username: parsed.username,
                password: parsed.password,
                checked: parsed.isChecked
            })
         } catch (error) {
           // Error retrieving data
           console.log(error.message);
         }
         return
    }

    // if 'Remeber Login' is checked allow to insert automatically credentials otherwise remove from async storage
    checkValidation = async() => {
        if(this.state.checked) {
            this.storeLoginCredentials(this.state.username, this.state.password, this.state.checked);
        } else {
            this.setState({ username: '', password: '' }); // to further testing and refactoring...

            let value = await AsyncStorage.getItem('loginDetails');
            if(value !== null) {
                AsyncStorage.removeItem('loginDetails');
            }
        }
    }

    handleLogin = () => {
        this.checkValidation();

        let data = {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'authorizationToken': `Bearer ${this.state.authorizationToken}`
            },
            body: JSON.stringify({
              username: this.state.username,
              password: this.state.password,
            })
        }

        Utilities.serverRequest('/api/v1/users/login', data)
            .then((res) => {
                // set local settings...
               this.setUserObject(res.user);
                // close this window and open main...
               this.props.navigation.navigate('Home', {isLoading: true});
            })
            .catch((error) => {
                // this.props.navigation.navigate('Login', {isLoading: true});
                alert(error);
            });
    }

    handleForgetPassword = () => {
        this.props.navigation.navigate('ForgetPassword', {isLoading: true});
    }

    handleCheckBox = () => {
        this.setState({checked: !this.state.checked})
    }


    render() {
        const {navigate} = this.props.navigation;
        return (
            <ImageBackground source={require('../../images/darkcubesVertical3.png')} style={styles.backgoundImg} blurRadius={0.4}>

                <View style={styles.container}>
                    <View style={styles.logoContainer}>
                        
                        <Image
                            style={styles.logo}
                            source={require('../../images/whiteCube.png')}
                        />

                        <Image
                            style={styles.logoText}
                            source={require('../../images/textLogo.png')}
                        />
                    </View>

                    <View style={styles.formContainer}>

                        <TextInput
                            style={styles.input}
                            placeholder = 'Username'
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="next"
                            onSubmitEditing={() => this.passwordInput.focus()}
                            keyboardType='email-address'
                            autoCapitalize='none'
                            autoCorrect={false}
                            onChangeText={this.handleUsernameInput}
                            value={this.state.username}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder = 'Password'
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType="go"
                            autoCapitalize='none'
                            autoCorrect={false}
                            ref={(input) => this.passwordInput = input}
                            secureTextEntry
                            onChangeText={this.handlePasswordInput}
                            value={this.state.password}
                        />

                        <CheckBox
                            containerStyle={{backgroundColor: 'transparent', marginBottom: 15, borderWidth: 0}}
                            center
                            textStyle={{color: '#fff'}}
                            title='Remeber Login'
                            checked={this.state.checked}
                            onPress={() => this.handleCheckBox()}
                        />

                        <TouchableOpacity 
                            style={styles.buttonContainer}
                            onPress = { () => this.handleLogin() }
                        >
                            <Text style={styles.buttonText}>Sign In</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress = { () => this.handleForgetPassword() }
                        >
                            <Text style={styles.labelText}>Forgot Password?</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </ImageBackground>
        )    
    };
}


const styles = StyleSheet.create({
    backgoundImg: {
        flex: 1,
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: 'rgba(52, 73, 94,.5)',
    },
    logoContainer: {
        flex: 1,
       alignItems: 'center',
       justifyContent: 'flex-end',
       paddingBottom: 65,
    },
    logo: {
        width: 90,
        height: 90,
    },
    logoText: {
        width: 300, 
        height: 90
    },
    formContainer: {
        padding: 20,
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
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 7,
        paddingVertical: 10,
        width: 260,
        marginBottom: 15,
        alignSelf: 'center',
    },
    buttonText: {
        textAlign: 'center',
        color: '#000',
        fontWeight: '700',
    },
    labelText: {
        fontSize: 12,
        textDecorationLine: 'underline',
        textAlign: 'center',
        color: '#FFF',
        opacity: 0.9,
        margin: 10
    }
});


LoginScreen.contextType = AppContext