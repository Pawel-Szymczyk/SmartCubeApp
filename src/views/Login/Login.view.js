import React, {Component} from 'react';
import {AsyncStorage, ActivityIndicator, View, Text, StyleSheet, TextInput, Image, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';

import AppContext from '../../components/AppContext';
import Constants from '../../components/Constants';

export default class LoginScreen extends Component {

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            authorizationToken: ''
        }
    }

    handleUsernameInput = (text) => {
        this.setState({ username: text })
    }

    handlePasswordInput = (text) => {
        this.setState({ password: text })
    }

    componentDidMount() {
       // console.log('context', this.context)
        this.getAuthorizationToken();
    }

    // Set app context object...
    setUserObject = (obj) => {
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

    handleLogin = () => {

        let status;


        let data = {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              // set this token to local db
              'authorizationToken': 'Bearer ' + this.state.authorizationToken
            },
            body: JSON.stringify({
              username: this.state.username,
              password: this.state.password,
            })
        }
        
        fetch(Constants.SERVER_HTTP_ADDRESS + '/api/v1/users/login', data)
          .then(response => {
            status = response.status;
            return response.json();
          })
          .then((res) => {
                if(status === 200) {
                    // set local settings...
                    this.setUserObject(res.user);
                    // close this window and open main...
                    this.props.navigation.navigate('Home', {isLoading: true});
                } else {
                    this.props.navigation.navigate('Login', {isLoading: true});
                    alert(res.message)
                }
          })
          .catch((error) =>{
            //console.error(error);
            alert(error);
          });
    }

    handleForgetPassword = () => {
        this.props.navigation.navigate('ForgetPassword', {isLoading: true});
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

                        <Text>
                            <Text style={styles.title}>cube</Text>
                            <Text style={styles.title2Part}>automation</Text>
                        </Text>

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
        alignItems: 'center',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    container: {
        flex: 2,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: 'rgba(52, 73, 94,.5)'
    },
    logoContainer: {
       alignItems: 'center',
       flexGrow: 2,
       justifyContent: 'flex-end',
       paddingBottom: 65,
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