import React, {Component} from 'react';
import { AsyncStorage, View, Text, StyleSheet, TextInput, Image, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';

import AppContext from '../../components/AppContext';
import Constants from '../../components/Constants';

export default class ForgetPasswordScreen extends Component {

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            secretAnswer: '',
            ip: ''
        }
    }

    handleEmailInput = (text) => {
        this.setState({ email: text })
    }

    handleSecretAnswerInput = (text) => {
        this.setState({ secretAnswer: text })
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

    handleForgetPassword = () => {

        let status;

        let data = {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                secretAnswer: this.state.secretAnswer
            })
        }
        fetch('http://' + this.state.ip + ':' + Constants.PORT + '/api/v1/users/resetpassword', data)
          .then(response => {
            status = response.status;
            return response.json();
          })
          .then((res) => {
                if(status === 200) {
                    this.props.navigation.navigate(
                        'Password', {
                            isLoading: true, 
                            userId: res.userId, 
                            authenticationToken: res.authenticationToken
                        });
                } else {
                    alert('error here')
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
                    
                    <Image
                        style={styles.logoText}
                        source={require('../../images/textLogo.png')}
                    />
                    
                </View>
                <View style={styles.formContainer}>

                    <Text style={styles.subtitle}>Forget Password</Text>
                    {/* <Text>To reset password insert credentials below </Text> */}

                    <TextInput
                        style={styles.input}
                        placeholder = 'Email'
                        placeholderTextColor='rgba(255,255,255,0.7)'
                        returnKeyType="next"
                        onSubmitEditing={() => this.secretAnswerInput.focus()}
                        keyboardType='email-address'
                        autoCapitalize='none'
                        autoCorrect={false}
                        ref={(input) => this.email = input}
                        onChangeText={this.handleEmailInput}
                    />
                    
                    <TextInput
                        style={styles.input}
                        placeholder = 'Secret Key'
                        placeholderTextColor='rgba(255,255,255,0.7)'
                        returnKeyType="go"
                        keyboardType='default'
                        autoCapitalize='none'
                        autoCorrect={false}
                        ref={(input) => this.secretAnswerInput = input}
                        onChangeText={this.handleSecretAnswerInput}
                    />
                    
                    <TouchableOpacity 
                        style={styles.buttonContainer}
                        onPress = { () => this.handleForgetPassword() }
                    >
                        <Text style={styles.buttonText}>Send</Text>
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
    logoText: {
        width: 300, 
        height: 90
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

ForgetPasswordScreen.contextType = AppContext