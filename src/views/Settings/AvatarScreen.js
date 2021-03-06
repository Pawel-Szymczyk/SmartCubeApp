import React, {Component} from 'react';
import {AsyncStorage, StyleSheet, View, Image, TouchableOpacity, Text, Alert, DeviceEventEmitter } from 'react-native';

import ImagePicker from 'react-native-image-picker';
import AppContext from '../../components/AppContext';

const options={
  title: 'Select Avatar',
  takePhotoButtonTitle: 'Take Photo',
  chooseFromLibraryButtonTitle: 'Choose Photo From Library',
}

export default class AvatarScreen extends Component {

  constructor(props) {
    super(props);
    this.navigate = this.props.navigation.navigate;

    this.state = {
      avatarSource: null
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Avatar Gallery",
    };
  };

  componentDidMount() {
    this.getAvatarImage();
  }

  storeAvatarDetails = async(avatarSource) => {
    let obj = {
        source: avatarSource,
    }

    try {
        await AsyncStorage.setItem('avatarDetails', JSON.stringify(obj));
        // TODO: convert this to store array, that allows to recognize who is trying to login in 
     } catch (error) {
       // Error retrieving data
       console.log(error.message);
     }
  }

  getAvatarImage = async() => {
    if(this.state.avatarSource == null) {
      let avatarDetails = await AsyncStorage.getItem('avatarDetails');

      if(avatarDetails != null) {
        let parsed = JSON.parse(avatarDetails);

        this.setState({
          avatarSource: parsed.source,
        });

      } else {
        this.setState({
          avatarSource: require('../../images/default.png')
        });
      }
    } 
  }

  handleAvatarImage() {
    ImagePicker.showImagePicker(options, (response) => {
     // console.log('Response = ', response);
    
      if (response.didCancel) {
       // console.log('User cancelled image picker');
      } else if (response.error) {
       // console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.uri };

        // store in local memeory...
        this.storeAvatarDetails(source);

        // Upload (emit) the 'avatar' object
        DeviceEventEmitter.emit('avatar');

        this.setState({
          avatarSource: source,
        });
      }
    });
  }

  removeAvatarAlert() {
    Alert.alert(
      'Delete',
      'Do you want to delete the image?',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => this.removeAvatar()},
      ],
      { cancelable: false }
    )
  }

  removeAvatar = async() => {
    let value = await AsyncStorage.getItem('avatarDetails');
    if(value !== null) {
      AsyncStorage.removeItem('avatarDetails');
    }

    this.setState({
      avatarSource: require('../../images/default.png')
    });
  }

  render() {
    return (
      <View style={styles.scene}>
        <TouchableOpacity onLongPress={()=>this.removeAvatarAlert()} activeOpacity={0.7} >
          <Image source={this.state.avatarSource} style={styles.avatar} /> 
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={()=>this.handleAvatarImage()} >
          <Text style={styles.label}>Select Image</Text>
        </TouchableOpacity>
      </View>  
    )
  }
}

const styles = StyleSheet.create({
  scene: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  avatar: {
    width: 400, 
    height:400, 
    borderRadius: 200,
    marginBottom: 330,
  },
  btn: {
    backgroundColor: '#34495e', 
    borderRadius: 7,
    width: 260,
    padding: 10,
  },
  label: {
    color: '#fff', 
    textAlign: 'center', 
    fontWeight: '700',
  }
});

AvatarScreen.contextType = AppContext