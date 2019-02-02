import React, {Component} from 'react';
import { Platform, StyleSheet, View, Image, TouchableOpacity, Alert, Text, FlatList, Dimensions, onPress } from 'react-native';
import { List, ListItem, Button } from 'react-native-elements';

import Logo from "../../components/nav";


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
  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: <Logo />,
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.openDrawer()} >
          <Image source={require('../../images/hamburgerIcon.png')}  style={{width: 30, height: 30}} />
        </TouchableOpacity>
      ),
    };
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
                <Text style={styles.boxName}>{item.name}</Text>
                <Text style={styles.boxState}>{item.areaState} </Text>
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

        <TouchableOpacity activeOpacity={0.5} onPress={ () => this.addAreaEvent() } style={styles.touchableOpacityStyle} >
          <Image source={require('../../images/addButton.png')}  style={styles.floatingButtonStyle} />
        </TouchableOpacity>

      </View>  
    )
  }

}

const styles = StyleSheet.create({
  scene: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#fff',
  },
  boxes: {
    flex: 1, 
    flexDirection: 'column',
    margin: 2,
    backgroundColor: '#ecf0f1',
    borderWidth: 1,
    borderColor: '#ecf0f1',
    height: Dimensions.get('window').width / 3,
  },
  box: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxName: {
    fontSize: 16,
    color: '#000'
  },
  boxState: {
    fontSize: 14,
  },
  touchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },
  floatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
  },
});