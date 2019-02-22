import React, {Component} from 'react';
import { AsyncStorage, View, Text, Button, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { FormLabel, Header} from 'react-native-elements';

import Constants from "../../components/Constants";
import AppContext from '../../components/AppContext';


export default class AddEditAreaScreen extends Component {

    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;

        this.state = {
            name: '',
            owner: '',
            areaState: '',
            ip: ''
        }
    }


    // Header
    static navigationOptions = ({navigation}) => {
        const {params} = navigation.state;

        return {
            title: navigation.getParam('name', 'Add / Edit Area'),
            headerRight: (
                <TouchableOpacity
                    style = {styles.submitButton}
                    onPress = { () => params.handleSave && params.handleSave() }
                >
                    <Text style = {styles.submitButtonText}> Save </Text>
                </TouchableOpacity>
            )
        }
    };

    componentDidMount() {
        this.getConfigCredentials();
        this.props.navigation.setParams({handleSave: () => this.handleSaving()});
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

    handleName = (text) => {
        this.setState({ name: text })
    }

    handleOwner = (text) => {
        this.setState({ owner: text })
    }

    handleAreaState = (text) => {
        this.setState({ areaState: text })
    }

    handleSaving = () => {
        let data = {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'authenticationToken': 'Bearer ' + this.context.user.authenticationToken
            },
            body: JSON.stringify({
              name: this.state.name,
              owner: this.state.owner,
              areaState: this.state.areaState
            })
          }
      
        fetch('http://' + this.state.ip + ':' + Constants.PORT + '/api/v1/areas/create', data)
          .then(response => {
            status = response.status;
            return response.json();
          })
          .then((res) => {
              
            if(status === 200) {
                this.props.navigation.navigate('Home', {isLoading: true});
            } else {
                alert(res.error[0].message);
            }
                
          })
          .catch((error) =>{
            console.error(error);
          });
    }

    render() {
        const { navigation } = this.props;
        return (

            <View style = {styles.container}>

                <FormLabel style = {styles.label}>Area Name</FormLabel>
                <TextInput
                    style = {styles.input}
                    onChangeText = {this.handleName}
                />
                <FormLabel style = {styles.label}>Owner</FormLabel>
                <TextInput
                    style = {styles.input}
                    onChangeText={this.handleOwner}
                />
                <FormLabel style = {styles.label}>Area State</FormLabel>
                <TextInput
                    style = {styles.input}
                    onChangeText={this.handleAreaState} 
                />

            </View>
        )
    }
}

const styles = StyleSheet.create({
container: {
    flex: 1
},
label: {
    fontSize: 20,
},
input: {
    height: 30,
    padding: 0,
    paddingLeft: 5,
    paddingRight: 5,
    marginLeft: 15,
    marginRight: 15,
    color: '#000',
    borderBottomWidth: 1,
    backgroundColor: '#fff',
},
submitButton: {
    padding: 10,
    margin: 15,
    height: 40,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#fff',
    },
    submitButtonText:{
    color: 'white'
    }

});

AddEditAreaScreen.contextType = AppContext