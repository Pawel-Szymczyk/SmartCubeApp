import React, {Component} from 'react';
import { Platform, StyleSheet, View, Image, TouchableOpacity, Text, FlatList, Dimensions, Alert } from 'react-native';
import { List, ListItem, Icon } from 'react-native-elements'
import Swipeable from 'react-native-swipeable';

import Constants from "../../components/Constants";



let willfocus = null;

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

  swipeable = null;

  // Header
  static navigationOptions = ({navigation}) => {
    
    return {
      //headerTitle: <Logo />,
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.openDrawer()} >
          <Icon
            iconStyle={{ paddingLeft: 20}}
            name='bars'  
            type='font-awesome'
            color='#fff'
          />
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
    willFocus = this.props.navigation.addListener(
      'willFocus',
      payload => {
       // if (this.state.isLoading) {
          this.loadAreas();
       // }
      }
    );
  }

  loadAreas = () => {
    const {areas, seed, page} = this.state;
    this.setState({ isLoading: true });
    
    fetch('http://' + Constants.SERVER_IP + ':' + Constants.PORT + '/api/v1/areas')
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

  handleEditArea = () => {
    alert("lol")
  }

  addAreaEvent() {
    this.navigate("AddEditArea", {
      name: 'Add Area'
    });
  }

  actionOnRow(item) {
    this.navigate("Devices", {
      areaId: item.areaId,
      areaName: item.name
    });
  }

  

  render() {
    const { areas, isRefreshing } = this.state;
    
    return (
      <View style={styles.scene}>
        {
          this.state.areas.map((item) => {
            return (
              <Swipeable 
                onRef={ref => this.swipeable = ref} 
                key={item.areaId}
                rightButtons={[
                  <TouchableOpacity
                    onPress={() => alert("lol")}
                  >
                    <Icon
                      //raised
                      containerStyle={{backgroundColor: '#00a8ff', height: 80, paddingLeft: 30, alignItems: 'flex-start'}}
                      name='edit'  
                      type='font-awesome'
                      color='#fff'
                      
                    />
                  </TouchableOpacity>,
                  <TouchableOpacity>
                    <Icon
                      //raised
                      containerStyle={{backgroundColor: '#e84118', height: 80, paddingLeft: 30, alignItems: 'flex-start'}}
                      name='trash'  
                      type='font-awesome'
                      color='#fff'
                    />
                  </TouchableOpacity>
                ]} 
                
                >
                <View>
                  <TouchableOpacity 
                    onPress = { () => this.actionOnRow(item)}
                  >
                  <ListItem
                    leftIcon={
                      <Icon
                        raised
                        name='bed'
                        type='font-awesome'
                        color='#f50'
                      />
                    }
                    title={item.name}
                    subtitle = {item.areaState}
                    chevronColor={'transparent'}
                    containerStyle={{height: 80, justifyContent: 'center'}}
                  />
                  </TouchableOpacity> 
                </View>
              </Swipeable>
            )
          })
        }

        <TouchableOpacity activeOpacity={0.5} onPress={ () => this.addAreaEvent() } style={styles.touchableOpacityStyle} >
          <Image source={require('../../images/addButton.png')}  style={styles.floatingButtonStyle} />
        </TouchableOpacity>

      </View>  


    )
  }





}

const styles = StyleSheet.create({
  scene: {
   // justifyContent: 'center',
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