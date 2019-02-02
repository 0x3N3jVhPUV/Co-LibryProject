import React, { Component } from 'react'
//import { AppRegistry, StyleSheet, Text, View, TextInput } from "react-native";

//import Video from "react-native-video";
//import LightVideo from "../Stairway.mp4"; npm i react - native

class Landing extends Component {
  render() {
    return (
         <div className="landing">
            <div className="dark-overlay landing-inner text-light">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <h1 className="display-3 mb-4">Co-libry
            </h1>
                            <p className="lead"> Livrer ou envoyer un colis à un proche n'a jamais été aussi simple,</p>
                            <hr />
                            <a href="register.html" className="btn btn-lg btn-info mr-2">S'inscrire</a>
                            <a href="login.html" className="btn btn-lg btn-light">Se connecter</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
  }
}


export default Landing;