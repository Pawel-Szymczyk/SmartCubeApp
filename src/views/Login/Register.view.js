import React, {Component} from 'react';
import { ActivityIndicator, View, Text, StyleSheet, TextInput, Image, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';

export default class RegistrationScreen extends Component {

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
                        // onChangeText={(username) => this.setState({username})}
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
                        // onChangeText={(username) => this.setState({username})}
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
                        // onChangeText={(username) => this.setState({username})}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder = 'Username'
                        placeholderTextColor='rgba(255,255,255,0.7)'
                        returnKeyType="next"
                        onSubmitEditing={() => this.passwordInput.focus()}
                        keyboardType='default'
                        autoCapitalize='words'
                        autoCorrect={false}
                        ref={(input) => this.usernameInput = input}
                        // onChangeText={(username) => this.setState({username})}
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
                        secureTextEntry
                        // onChangeText={(password) => this.setState({password})}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder = 'Repeat Password'
                        placeholderTextColor='rgba(255,255,255,0.7)'
                        returnKeyType="go"
                        autoCapitalize='none'
                        autoCorrect={false}
                        ref={(input) => this.passwordInput2 = input}
                        secureTextEntry
                        // onChangeText={(password) => this.setState({password})}
                    />
                    
                    <TouchableOpacity style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>Create Account</Text>
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
        marginTop: 40,
        marginBottom: 15,
        alignSelf: 'center',
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFF',
        fontWeight: '700',
    },
});