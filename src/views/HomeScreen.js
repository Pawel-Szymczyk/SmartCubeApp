import React, {Component} from 'react';
import { View, Text, Button } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";

export default class HomeScreen extends Component {

  // Header
  static navigationOptions = {
    title: 'Home',
  };

  render() {
    return (

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => {
            this.props.navigation.navigate('Details', {
              itemId: 86,
              otherParam: 'home -> otherParam'
            });
          }}
        />
      </View>
      
    );
  }
}