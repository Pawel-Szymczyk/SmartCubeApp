import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Alert, YellowBox, TouchableOpacity, Image} from "react-native";
import { Menu, MenuProvider, MenuOptions, MenuOption, MenuTrigger} from "react-native-popup-menu";

export default class DropDownMenu extends Component {


    render() {
        return (
            <View elevation={3}>
            <MenuProvider style={{ flexDirection: "column"}}>
                <Menu onSelect={value => alert(`You Clicked : ${value}`)} >

                <MenuTrigger  >
                    <Image source={require('../images/dango.png')}  style={{width: 30, height: 30, marginTop: 15, marginRight: 10 }} />
                </MenuTrigger  >

                <MenuOptions  optionsContainerStyle={{ marginTop: 50, zIndex: 99}} >
                    <MenuOption value={"Edit"}  customStyles={{optionTouchable: {underlayColor: 'red',activeOpacity: 40, zIndex: 99, position: 'absolute'}}}>
                        <Text style={styles.menuContent}>Edit</Text>
                    </MenuOption>
                    <MenuOption value={"Delete"}>
                        <Text style={styles.menuContent}>Delete</Text>
                    </MenuOption>
                </MenuOptions>

                </Menu>
            </MenuProvider>
            </View>
        );
    }

}

const styles = StyleSheet.create({
  menuContent: {
    padding: 5
    //   zIndex: 1,
    // color: "#000",
    // fontWeight: "bold",
    // padding: 2,
    // fontSize: 20,
    // width: 100,
  }
});