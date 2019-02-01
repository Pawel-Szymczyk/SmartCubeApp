import React, {Component} from 'react';
import { ActivityIndicator, View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';

export default class LoginScreen extends Component {

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <ImageBackground source={require('../../images/darkcubesVertical3.png')} style={styles.backgoundImg} blurRadius={0.3}>

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

                        <TouchableOpacity 
                            style={styles.buttonContainer}
                            onPress = { () => this.navigate('Registration') }
                        >
                            <Text style={styles.buttonText}>SIGN UP</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={styles.button2Container}
                            onPress = { () => navigate('Login') }
                        >
                            <Text style={styles.button2Text}>LOGIN</Text>
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
        backgroundColor: 'rgba(52, 73, 94, .5)'
    },
    logoContainer: {
       flex: 3,
       alignItems: 'center',
       justifyContent: 'center',
       marginTop: 140,
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
        alignSelf: 'center',
        flex: 3,
        justifyContent: 'flex-end',
        paddingBottom: 60,
    },
    buttonContainer: {
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 7,
        paddingVertical: 10,
        width: 260,
        marginBottom: 15,
    },
    button2Container: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 7,
        paddingVertical: 10,
        width: 260,
        marginBottom: 15,
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFF',
        fontWeight: '700',
    },
    button2Text: {
        textAlign: 'center',
        color: '#000',
        fontWeight: '700',
    },
});