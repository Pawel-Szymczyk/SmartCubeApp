import React, {Component} from 'react';
import { ActivityIndicator, View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ImageBackground, StatusBar } from 'react-native';

export default class SelectScreen extends Component {

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
                    <StatusBar hidden={true} />
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

                        <TouchableOpacity 
                            style={styles.buttonContainer}
                            onPress = { () => navigate('Registration') }
                        >
                            <Text style={styles.buttonText}>Create Account</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={styles.button2Container}
                            onPress = { () => navigate('Login') }
                        >
                            <Text style={styles.button2Text}>Sign In</Text>
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
        backgroundColor: 'rgba(52, 73, 94, .5)',
    },
    logoContainer: {
        flex: 1,
        flexGrow: 2,
        alignItems: 'center',
        justifyContent: 'flex-end',
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
        alignSelf: 'center',
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 60
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