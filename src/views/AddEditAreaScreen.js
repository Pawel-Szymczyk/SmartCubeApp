import React, {Component} from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import { FormLabel, Header} from 'react-native-elements'

export default class AddEditAreaScreen extends Component {

    static navigationOptions = ({ navigation }) => {
      return {
        title: navigation.getParam('otherParam', 'Add / Edit Area'),
      };
    };



    render() {
        const { navigation } = this.props;

        return (


            <View style = {styles.container}>

                <FormLabel style = {styles.label}>Area Name</FormLabel>
                <TextInput
                    style = {styles.input}
                    // placeholder = 'Username'
                    onChangeText={(username) => this.setState({username})}
                />
            </View>



            
        )
    }



  
    // render() {
  
    //   const { navigation } = this.props;
    //   const itemId = navigation.getParam('itemId', 'NO-ID');
    //   const otherParam = navigation.getParam('otherParam', 'some default value');
  
    //   return (
    //     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    //       <Text>Details Screen</Text>
    //       <Text>itemId: {JSON.stringify(itemId)}</Text>
    //       <Text>otherParam: {JSON.stringify(otherParam)}</Text>
    //       <Button
    //         title="Go to Details... again"
    //         onPress={() =>
    //           this.props.navigation.push('Details', {
    //             itemId: Math.floor(Math.random() * 100),
    //           })}
    //       />
    //       <Button
    //         title="Go to Home"
    //         onPress={() => this.props.navigation.navigate('Home')}
    //       />
    //       <Button
    //         title="Go back"
    //         onPress={() => this.props.navigation.goBack()}
    //       />
    //     </View>
    //   );
    // }

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
    }
  });