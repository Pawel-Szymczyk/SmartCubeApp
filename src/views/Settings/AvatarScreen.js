import React, {Component} from 'react';
import {AsyncStorage, Platform, StyleSheet, View, Image, TouchableOpacity, Text, FlatList, Dimensions, Alert } from 'react-native';

import ImagePicker from 'react-native-image-picker';
import Constants from "../../components/Constants";
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
      let parsed = JSON.parse(avatarDetails);

      this.setState({
        avatarSource: parsed.source,
      });
    } else {
      //alert("@")
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

        
    
        this.setState({
          avatarSource: source,
        });
      }
    });
  }

  render() {
    return (
      <View style={styles.scene}>

        <Image source={this.state.avatarSource}
          style={styles.avatar}
        />

        <TouchableOpacity style={styles.btn}
          onPress={()=>this.handleAvatarImage()}
        >
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