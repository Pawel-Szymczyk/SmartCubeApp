import React, {Component} from 'react';
import { AsyncStorage, View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { FormLabel } from 'react-native-elements';

import AppContext from '../../components/AppContext';
import Utilities from '../../components/Utilities';

export default class AddEditAreaScreen extends Component {

    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;

        this.state = {
            areaId: this.params.areaId,
            isEdit: this.params.isEdit,
            name: '',
            owner: '',
            areaState: '',
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
        this.props.navigation.setParams({handleSave: () => this.handleSaving()});
        this.loadData();
    }

    loadData = () => {
        if(this.state.isEdit) {
            
            this.methodRequest = 'PUT';
            this.url = `/api/v1/areas/${this.state.areaId}`
            
            // get area
            let data = {
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  'authenticationToken': `Bearer ${this.context.user.authenticationToken}`
                },
              }
          
              Utilities.serverRequest(`/api/v1/areas/${this.state.areaId}`, data)
                .then((res) => {
                    // alert(res.area.name)
                  this.setState({
                    name: res.area.name,
                    owner: res.area.owner,
                    areaState: res.area.areaState
                  })
                })
                .catch((error) => {
                    this.props.navigation.navigate('Login', {isLoading: true});
                    // console.log(error)
                    // alert(error);
                });

        } else {
            this.methodRequest = 'POST';
            this.url = '/api/v1/areas/create'

            this.setState({
                owner: this.context.user.username
            })
        }
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
            method: this.methodRequest,
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'authenticationToken': `Bearer ${this.context.user.authenticationToken}`
            },
            body: JSON.stringify({
              name: this.state.name,
              owner: this.state.owner,
              areaState: this.state.areaState
            })
        }

        Utilities.serverRequest(this.url, data)
            .then((res) => {
                // close this window and open main...
                this.props.navigation.navigate('Home', {isLoading: true});
            })
            .catch((error) => {
                this.props.navigation.navigate('Login', {isLoading: true});
                //alert(error);
            });
      
    }

    render() {
        
        const { navigation } = this.props;
        return (

            <View style = {styles.container}>

                <FormLabel style = {styles.label}>Area Name</FormLabel>
                <TextInput
                    style = {styles.input}
                    onChangeText={(text) => this.setState({name: text})}
                    placeholder='ex. Bedroom'
                    value={this.state.name}
                />
                <FormLabel style = {styles.label}>Owner</FormLabel>
                <TextInput
                    style = {styles.input}
                    onChangeText={(text) => this.setState({owner: text})}
                    placeholder='ex. Username'
                    value={this.state.owner}
                    editable={false} 
                />
                <FormLabel style = {styles.label}>Area State</FormLabel>
                <TextInput
                    style = {styles.input}
                    onChangeText={(text) => this.setState({areaState: text})}
                    placeholder='Opened or Closed'
                    value={this.state.areaState}
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
    },
});

AddEditAreaScreen.contextType = AppContext