import React, {Component} from 'react';
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import { FormLabel, Header} from 'react-native-elements'

export default class AddEditAreaScreen extends Component {

    static navigationOptions = ({ navigation }) => {
      return {
        title: navigation.getParam('otherParam', 'Add / Edit Area'),
      };
    };

    state = {
        name: '',
        owner: '',
        areaState: '',
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
            },
            body: JSON.stringify({
              name: this.state.name,
              owner: this.state.owner,
              areaState: this.state.areaState
            })
          }
      
          fetch('http://192.168.0.17:3000/api/v1/areas/create', data)
          .then((res) => res.json())
          .then((res) => {
                // close this window and open main...
                this.props.navigation.navigate('Home', {isLoading: true});
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

                <TouchableOpacity
                    style = {styles.submitButton}
                    //onPress={() => this._handlePress()}
                    onPress = { () => this.handleSaving() }
                >
                    <Text style = {styles.submitButtonText}> Save </Text>
                </TouchableOpacity>
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
        backgroundColor: '#7a42f4',
        padding: 10,
        margin: 15,
        height: 40,
     },
     submitButtonText:{
        color: 'white'
     }

  });