import React, { Component } from 'react';
import {AsyncStorage} from 'react-native';
// import AppContext from './AppContext';

class Utilities extends Component {

    constructor(props) {
        super(props);
    }

    async retrieveItem(key) {
        try {
            const retrievedItem =  await AsyncStorage.getItem(key);
            const item = JSON.parse(retrievedItem);
            return item;
        } catch (error) {
        console.log(error.message);
        }
        return
    }


    getURL = () => {
        return new Promise((resolve) => {
            this.retrieveItem('configDetails').then((credentials) => {
                if(!credentials.checked) {
                    resolve(`https://${credentials.url}`)
                } else {
                    resolve(`https://${credentials.ip}:${credentials.port}`)
                }
            })
        })   
    }


    postRegistration = (data) => {

        return new Promise((resolve, reject) => {
        
            this.getURL().then((url) => {
                //fetch(`${this.getURL()}/api/v1/users/registration`, data)
                fetch(`${url}/api/v1/users/login`, data)
                .then((res) => {
                    status = res.status;
                    return res.json();
                }).then((data) => {
                    if(status === 200) {
                        resolve(data)
                    } else {
                        reject(data.message)
                    }
                }).catch(error => {
                    reject(error)
                });
            })
        })
    }
       


    
    

}

// Utilities.contextType = AppContext
export default new Utilities();