import React, {Component} from 'react';
import { StyleSheet, View, TouchableOpacity, Dimensions, } from 'react-native';
import { ListItem, Icon } from 'react-native-elements'
import Swipeable from 'react-native-swipeable';

import AppContext from '../../components/AppContext';
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


  // handleRefresh = () => {
  //   this.setState({
  //     seed: this.state.seed + 1,
  //     isRefreshing: true,
  //   }, () => {
  //     this.loadAreas();
  //   });
  // };

  // handleLoadMore = () => {
  //   this.setState({
  //     page: this.state.page + 1,
  //   }, () => {
  //     this.loadAreas();
  //   });
  // };

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
    
    fetch('http://' + Constants.SERVER_IP + ':' + Constants.PORT + '/api/v1/areas', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'authenticationToken': 'Bearer ' + this.context.user.authenticationToken
      },
    })
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

  deleteArea = (item) => {

    fetch('http://' + Constants.SERVER_IP + ':' + Constants.PORT + '/api/v1/areas/' + item.areaId, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'authenticationToken': 'Bearer ' + this.context.user.authenticationToken
      },
    })
    .then(res => res.json())
    .then(res => {

      this.loadAreas();

      alert("Area removed successfuly");
    })
    .catch(err => {
      console.error(err);
    })

  };

  handleEditArea(item) {
    this.navigate("AddEditArea", {
      name: 'Edit Area'
    });
  }

  handleAddArea() {
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
    const { areas } = this.state;
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
                    onPress={() => this.handleEditArea(item)}
                  >
                    <Icon
                      //raised
                      containerStyle={{backgroundColor: '#00a8ff', height: 80, paddingLeft: 30, alignItems: 'flex-start'}}
                      name='edit'  
                      type='font-awesome'
                      color='#fff'
                      
                    />
                  </TouchableOpacity>,
                  <TouchableOpacity
                    onPress={ () => this.deleteArea(item)}
                  >
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

        <TouchableOpacity activeOpacity={0.5} onPress={ () => this.handleAddArea() } style={styles.touchableOpacityStyle} >
          <Icon
            iconStyle={{fontSize: 40}}
            name='plus-square'  
            type='font-awesome'
            color='#34495e'
          />
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

HomeScreen.contextType = AppContext