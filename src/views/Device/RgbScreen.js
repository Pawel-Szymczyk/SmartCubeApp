import React, {Component} from 'react';
import { AsyncStorage, View, Text, StyleSheet, Switch, TouchableOpacity, Image  } from 'react-native';

import Utilities from '../../components/Utilities';

export default class RgbScreen extends Component {

    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;
        this.state = {
          isLoading: true, 
          name: '',
          deviceId: this.params.deviceId,
          serialNumber: '',
        };
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('deviceName', 'RGB'),
        };
    };


}