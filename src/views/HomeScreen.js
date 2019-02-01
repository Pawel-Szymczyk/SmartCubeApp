import React, {Component} from 'react';
import { Platform, StyleSheet, View, Image, TouchableOpacity, Alert, Text, FlatList, Dimensions } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import { List, ListItem } from 'react-native-elements';


export default class HomeScreen extends Component {

  constructor(props) {
    super(props);
    this.navigate = this.props.navigation.navigate;

    this.state = {
      seed: 1,
      page: 1,
      areas: [],
      isLoading: false,
      isRefreshing: false,
    };
  }

  // Header
  static navigationOptions = {
    title: 'Home',
  };



  handleRefresh = () => {
    this.setState({
      seed: this.state.seed + 1,
      isRefreshing: true,
    }, () => {
      this.loadAreas();
    });
  };

  handleLoadMore = () => {
    this.setState({
      page: this.state.page + 1,
    }, () => {
      this.loadAreas();
    });
  };

  componentDidMount() {
    this.loadAreas();
  }

  loadAreas = () => {
    const {areas, seed, page} = this.state;
    this.setState({ isLoading: true });

    // fetch here
    fetch('http://192.168.0.17:3000/api/v1/areas')
      .then(res => res.json())
      .then(res => {
        this.setState({
          areas: res.areas,
          isLoading: false,
        });
      })
      .catch(err => {
        console.error(err);
      })

  };

  addAreaEvent() {

    this.navigate("AddEditArea", {
      areaId: item.areaId,
      name: 'Add Area'
    });
    
  }

  actionOnRow(item) {

    this.navigate("Devices", {
      areaId: item.areaId,
      //devices: item.devices,
      areaName: item.name
    });

  }











  render() {
    const { areas, isRefreshing } = this.state;
    
    return (

      <View style={styles.scene}>
        <FlatList 
          data={areas}
          renderItem={({item}) => (
            
            <View style={styles.boxes}>

              <TouchableOpacity 
                onPress = { () => this.actionOnRow(item)}
                style={styles.box}
              >
                <Text>{item.name}</Text>
                <Text>{item.areaState} </Text>
              </TouchableOpacity> 

            </View>
        )}
        numColumns={3}
        keyExtractor={(index) => index.name}
                    refreshing={isRefreshing}
            onRefresh={this.onRefresh}
            onEndReached={this.handleLoadMore}
            onEndThreshold={0}
        />
      </View>





      
      // List areas
      // Add button
      // <View style={styles.scene}>

            
      //   <List style={styles.scene}>
        
      //     <FlatList 
      //       data={areas}
      //       renderItem={({item}) => (
      //         <TouchableOpacity onPress = { () => this.actionOnRow(item)}>
      //           <ListItem 
      //             roundAvatar
      //             title={item.name}
      //             subtitle={item.areaState} 
      //           />
      //         </TouchableOpacity>

      //       )}
      //       keyExtractor={i => i.name}
      //       refreshing={isRefreshing}
      //       onRefresh={this.onRefresh}
      //       onEndReached={this.handleLoadMore}
      //       onEndThreshold={0}
      //     />
      //   </List>
        
      //   <TouchableOpacity activeOpacity={0.5} onPress={ () => this.addAreaEvent() } style={styles.touchableOpacityStyle} >
      //     <Image source={require('../images/button.png')}  style={styles.floatingButtonStyle} />
      //   </TouchableOpacity>

      // </View>
    )
  }

}

const styles = StyleSheet.create({

  scene: {
    justifyContent: 'center',
    flex: 1,
    // paddingTop: 30,


    borderWidth: 1,
    borderColor: '#000',
  },

  boxes: {
    flex: 1, 
    flexDirection: 'column',
    margin: 2,


    borderWidth: 1,
    borderColor: '#000',
    height: Dimensions.get('window').width / 3,
  },

  box: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // scene: {
  //   flex: 1,
  //   paddingTop: 25,
  // },
  // user: {
  //   width: '100%',
  //   backgroundColor: '#333',
  //   marginBottom: 10,
  //   paddingLeft: 25,
  // },

  // touchableOpacityStyle: {
  //   position: 'absolute',
  //   width: 50,
  //   height: 50,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   right: 30,
  //   bottom: 30,
  // },
  // floatingButtonStyle: {
  //   resizeMode: 'contain',
  //   width: 50,
  //   height: 50,
  // },
});