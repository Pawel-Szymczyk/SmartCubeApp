import React, {Component} from 'react';
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { FormLabel, Header} from 'react-native-elements'

export default class AddEditAreaScreen extends Component {

    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;

        this.state = {
            name: '',
            owner: '',
            areaState: '',
        }
    }


    // Header
    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.getParam('name', 'Add / Edit Area'),
            headerRight: (
                <TouchableOpacity
                    style = {styles.submitButton}
                    onPress = { () => this.handleSaving() }
                >
                    <Text style = {styles.submitButtonText}> Save </Text>
                </TouchableOpacity>
            ),
        };
    };



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