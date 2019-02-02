'use strict';

import React, {Component} from 'react';
import { Platform, StyleSheet, View, Image, TouchableOpacity, Alert, Text, FlatList, Dimensions } from 'react-native';

export default class TitleLogo extends Component {
    render() {
        return (
            <Image 
                source={require('../images/whiteCube.png')}
                style={{width: 30, height: 30}}
                
            />
        );
    }
}