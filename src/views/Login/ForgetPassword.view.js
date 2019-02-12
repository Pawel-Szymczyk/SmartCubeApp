import React, {Component} from 'react';
import { ActivityIndicator, View, Text, StyleSheet, TextInput, Image, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';

import Constants from '../../components/Constants';

export default class ForgetPasswordScreen extends Component {

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);

        

        this.state = {
            email: '',
            secretAnswer: ''
        }
    }

    handleEmailInput = (text) => {
        this.setState({ email: text })
    }

    handleSecretAnswerInput = (text) => {
        this.setState({ secretAnswer: text })
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
        fetch(Constants.SERVER_HTTP_ADDRESS + '/api/v1/users/resetpassword', data)
          .then(response => {
            status = response.status;
            return response.json();
          })
          .then((res) => {
                if(status === 200) {
                    //alert(res.authenticationToken)
                    // set local settings...
                    //this.setUserObject(res.user);
                    // close this window and open main...
                    //onPress = { () => this.actionOnRow(item)}
                    this.props.navigation.navigate(
                        'Password', {
                            isLoading: true, 
                            userId: res.userId, 
                            authenticationToken: res.authenticationToken
                        });
                   // alert("works")
                } else {
                    alert('error here')
                    //alert(res[0].message)
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
                    
                    {/* <Image
                        style={styles.logo}
                        source={require('../../images/whiteCube.png')}
                    /> */}

                    
                    <Text>
                        <Text style={styles.title}>cube</Text>
                        <Text style={styles.title2Part}>automation</Text>
                    </Text>
                    
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