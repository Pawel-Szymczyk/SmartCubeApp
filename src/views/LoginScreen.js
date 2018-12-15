import React, {Component} from 'react';
import { ActivityIndicator, View, Text, Button, StyleSheet, TextInput } from 'react-native';

export default class LoginScreen extends Component {

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.logo}>
                    {/* logo here... */}

                    <Text style={styles.title}>the Smart Cube</Text>
                </View>
                <View style={styles.input}>
                    <TextInput
                        style={styles.input}
                        placeholder = 'Username'
                        onChangeText={(username) => this.setState({username})}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder = 'Password'
                        onChangeText={(password) => this.setState({password})}
                    />
                </View>
                <View style={styles.btns}>
                    <Button 
                        title="Login"
                        onPress={() => this.props.navigation.navigate('Home')}
                    />
                </View>
            </View>
        )    
    };
    
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 20,
    }
});