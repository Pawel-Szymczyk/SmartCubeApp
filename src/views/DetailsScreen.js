import React, {Component} from 'react';
import { View, Text, Button } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";

export default class DetailsScreen extends Component {

    static navigationOptions = ({ navigation }) => {
      return {
        title: navigation.getParam('otherParam', 'A Nested Details Screen'),
      };
    };
  
    render() {
  
      const { navigation } = this.props;
      const itemId = navigation.getParam('itemId', 'NO-ID');
      const otherParam = navigation.getParam('otherParam', 'some default value');
  
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Details Screen</Text>
          <Text>itemId: {JSON.stringify(itemId)}</Text>
          <Text>otherParam: {JSON.stringify(otherParam)}</Text>
          <Button
            title="Go to Details... again"
            onPress={() =>
              this.props.navigation.push('Details', {
                itemId: Math.floor(Math.random() * 100),
              })}
          />
          <Button
            title="Go to Home"
            onPress={() => this.props.navigation.navigate('Home')}
          />
          <Button
            title="Go back"
            onPress={() => this.props.navigation.goBack()}
          />
        </View>
      );
    }
  }