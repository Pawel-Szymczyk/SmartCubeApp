import React, {Component} from 'react';
import { ActivityIndicator, View, Text, StyleSheet, TextInput, Image, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
// import LoginForm from './LoginForm.view';

export default class LoginScreen extends Component {

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);

        this.state = {
            // username: '',
            // password: ''
        }
    }

    render() {
        return (
            <ImageBackground source={require('../../images/darkcubesVertical3.png')} style={styles.backgoundImg} blurRadius={0.4}>

                <View style={styles.container}>
                    <View style={styles.logoContainer}>
                        {/* logo here... */}

                        
                        <Image
                            style={styles.logo}
                            source={require('../../images/whiteCube.png')}
                        />
                        <Text style={styles.title}>cubeautomation</Text>
                        
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
                                // onChangeText={(username) => this.setState({username})}
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
                                // onChangeText={(password) => this.setState({password})}
                        />
                        
                        <TouchableOpacity style={styles.buttonContainer}>
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>

                        <TouchableOpacity>
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
        //  opacity: 0.5
       // resizeMode: 'stretch',
    },
    container: {
        flex: 2,
        // backgroundColor: '#3498db',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: 'rgba(52, 73, 94,.5)'
    },
    logoContainer: {
       
       alignItems: 'center',
       flexGrow: 2,
       justifyContent: 'center',
    },
    logo: {
        width: 90,
        height: 90,
    },
    title: {
        fontSize: 30,
        color: '#fff',
        marginTop: 10,
        textAlign: 'center',
        opacity: 0.9
    },
    formContainer: {
        padding: 20,
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        marginBottom: 10,
        color: '#FFF',
        paddingHorizontal: 10
    },
    buttonContainer: {
        backgroundColor: '#2980b9',
        paddingVertical: 15
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFF',
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