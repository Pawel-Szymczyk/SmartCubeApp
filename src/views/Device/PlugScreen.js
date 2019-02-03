import React, {Component} from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, FlatList  } from 'react-native';

export default class PlugScreen extends Component {

    constructor(props) {
        super(props);

        this.params = this.props.navigation.state.params;

        this.state = {

          isLoading: true, 
          name: '',
          deviceId: this.params.deviceId,
          plugBoolValue: false,
          plugStringValue: '',
          plugData: [],
        };

    }

    static navigationOptions = ({ navigation }) => {

        

      return {
        title: navigation.getParam('deviceName', 'Rollet'),
      };
    };

    componentDidMount() {
        this.loadData();
    }

    // load data from server
    loadData = () => {
        const {areas, seed, page} = this.state;
        this.setState({ isLoading: true });
 

        fetch('http://192.168.0.17:3000/api/v1/devices/plug/'+ this.params.deviceId)
            .then(res => res.json())
            .then(res => {

                this.setState({
                    plugStringValue: res.powerState
                })
            })
            .catch(err => {
                console.error(err);
            })
        
    };

    // send message to the server
    plugControl() {

        this.setState({
            plugBoolValue: !this.state.plugBoolValue,
        })

        if(this.state.plugBoolValue) {
            this.setState({
                plugStringValue: 'on',
            });
            
        } else {
            this.setState({
                plugStringValue: 'off',
            });
            
        }

        // post message
        let data = {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              plugId: 2,
              state: this.state.plugStringValue,

              name: 'plug2',
              type: 'plug',
              powerState: this.state.plugStringValue,
              topic: "/devices/ligh/update",
              areaId: 1
            })
          }
  
  
          // add device serial number to url
          fetch('http://192.168.0.17:3000/api/v1/devices/plug', data)
          .then((response) => response.json())
          .then((responseJson) => {
  
  
          //   if(responseJson.state == false) {
          //     this.setState({
          //         plugBoolValue: true,
          //         plugStringValue: 'on'
          //     });
          //   }
          //   else {
          //     this.setState({
          //         plugBoolValue: false,
          //         plugStringValue: 'off'
          //     });
          //   }
  
          })
          .catch((error) =>{
            console.error(error);
          });

    };



    render() {
        const { navigation } = this.props;

        return (

            <View style = {styles.container}>

                <View style={styles.box}>
                    <Text style={styles.textBox}>State</Text>
                    <Switch
                        style={styles.switchBox}
                        onValueChange = {() => this.plugControl()}
                        value = {this.state.plugBoolValue}
                    />
                </View>

                {/* todo */}
                <View style={styles.box}>
                    {/* <View style={styles.innerBox}>
                        <Text style={styles.textBox2}>Current working time</Text>
                        <Text style={styles.textBox2}>Text here </Text>
                    </View>
                    <View style={styles.innerBox}>
                        <Text style={styles.textBox2}>Current working time</Text>
                        <Text style={styles.textBox2}>Text here </Text>
                    </View> */}
                    <FlatList
                    data={[{key: 'a'}, {key: 'b'}, {key: 'c'}]}
                    renderItem={({item}) => (
                        <View style={styles.innerBox}>
                            <Text style={styles.textBox2}>Current working time</Text>
                            <Text style={styles.textBox2}>{item.key}</Text>
                        </View>
                    )}
                    
                    
                    />
                </View>



            </View>

        )
    }

  }

  const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    box: {
        flexDirection: 'row',
       // height: 70,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        margin: 10,
        padding: 10
    },

    innerBox: {
        flex: 1,
        flexDirection: 'row',
        
        borderWidth: 1,
        borderColor: '#000',
    },

    textBox: {
        flex: 1,
        alignSelf: 'center',
        fontSize: 18,
        color: '#000',
        // borderWidth: 1,
        // borderColor: 'red',
    },

    textBox2: {
        flex: 1,
        alignSelf: 'center',
        fontSize: 14,
        color: '#000',
        borderWidth: 1,
        borderColor: 'red',
    },

    switchBox: {
        flex: 1,
    },

  });