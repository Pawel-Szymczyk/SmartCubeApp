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
          plugData: [],
          plugState: false,
        };

    }

    static navigationOptions = ({ navigation }) => {
      return {
        title: navigation.getParam('deviceName', 'Rollet'),
      };
    };

        // load data from server
    componentDidMount() {
        const {areas, seed, page} = this.state;
        this.setState({ isLoading: true });
 

        fetch('http://192.168.0.17:3000/api/v1/devices/plug/'+ this.params.deviceId)
            .then(res => res.json())
            .then(res => {

                this.setState({
                    plugState: res.powerState
                });

            })
            .catch(err => {
                console.error(err);
            })
    }



    // send message to the server
    plugControl = (value) => {

        this.setState({
            plugState: value,
        });

        // post message
        let data = {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                plugId: this.params.deviceObject.id,
                name: this.params.deviceObject.name,
                type: this.params.deviceObject.type,
                powerState: !this.state.plugState,
                serialNumber: "p0000001",
                topic: this.params.deviceObject.topic,
                areaId: this.params.deviceObject.areaId
            })
          };

          
  
  
          // add device serial number to url
          fetch('http://192.168.0.17:3000/api/v1/devices/plug', data)
          .then((response) => response.json())
          .then((responseJson) => {

            this.setState({
                plugState: responseJson.state
            });
  
          })
          .catch((error) =>{
            console.error(error);
          });

    };


    toggleSwitch1 = (value) => {
        this.setState({switch1Value: value})
        alert('Switch 1 is: ' + value)
     }



    render() {
        const { navigation } = this.props;
        
        return (

            <View style = {styles.container}>

                <View style={styles.box}>
                    <Text style={styles.textBox}>State</Text>
                    <Switch
                        style={styles.switchBox}
                        onValueChange = {this.plugControl}
                        value = {this.state.plugState}
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