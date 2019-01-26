import React, {Component} from 'react';
import { Platform, StyleSheet, View, Image, TouchableOpacity, Alert, Text, FlatList } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import { List, ListItem } from 'react-native-elements';



export default class HomeScreen extends Component {

  // Header
  static navigationOptions = {
    title: 'Home',
  };

  state = {
    seed: 1,
    page: 1,
    areas: [
      {
        name: 'Room 1',
        subtitle: 'Pawel room'
      },
      {
        name: 'Room 2',
        subtitle: 'Parents room'
      },
      {
        name: 'Room 3',
        subtitle: 'Parents room'
      },
      {
        name: 'Room 4',
        subtitle: 'Parents room'
      },
    ],
    isLoading: false,
    isRefreshing: false,
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
    
  };

  floatingButtonEvent = () => {
    // add Area ...
    this.props.navigation.navigate('AddEditArea', {
      //itemId: 90,
      otherParam: 'Add Area'
    });
  }

  actionOnRow(item) {
    // Alert.alert("Floating Button Clicked", item.name);
    this.props.navigation.navigate('Devices', {
      //itemId: 90,
      otherParam: item.name
    });
  }


  render() {
    const { areas, isRefreshing } = this.state;

    return (
      
      // List areas
      // Add button
      <View style={styles.scene}>
        
        <List style={styles.scene}>
        
          <FlatList 
            data={areas}
            renderItem={({item}) => (
              <TouchableOpacity onPress = { () => this.actionOnRow(item)}>
                <ListItem 
                  roundAvatar
                  title={item.name}
                  subtitle={item.subtitle} 
                />
              </TouchableOpacity>

            )}
            keyExtractor={i => i.name}
            refreshing={isRefreshing}
            onRefresh={this.onRefresh}
            onEndReached={this.handleLoadMore}
            onEndThreshold={0}
          />
        </List>
        
        <TouchableOpacity activeOpacity={0.5} onPress={this.floatingButtonEvent} style={styles.touchableOpacityStyle} >
          <Image source={require('../images/button.png')}  style={styles.floatingButtonStyle} />
        </TouchableOpacity>

      </View>
    )
  }

}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    paddingTop: 25,
  },
  user: {
    width: '100%',
    backgroundColor: '#333',
    marginBottom: 10,
    paddingLeft: 25,
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