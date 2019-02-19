/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from "react";
import { View, ImageBackground, Text, Dimensions, Alert } from "react-native";
import Styles from "../styles/GlobalStyle";
import { webWeights } from "react-native-typography";
import Icon from "react-native-vector-icons/FontAwesome";
import AwesomeButtonRick from "react-native-really-awesome-button/src/themes/rick";
import { connect } from "react-redux";
import back from "../util/loadImage";
class Splash extends Component {
  static navigationOptions = {
    title: "Splash",
    header: null,
    headerForceInset: { top: "never" }
  };
  constructor() {
    super();
    this.state = { orientation: "" };
  }

  getOrientation() {
    if (this.refs.rootView) {
      if (Dimensions.get("window").width < Dimensions.get("window").height) {
        this.setState({ orientation: "portrait" });
      } else {
        this.setState({ orientation: "landscape" });
      }
    }
  }

  componentDidMount() {
    this.getOrientation();

    Dimensions.addEventListener("change", () => {
      this.getOrientation();
    });
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change");
  }

  qrPressed() {
    if (this.state.orientation == "portrait") {
      Alert.alert("Error", "Please change orientation to landscape", [
        { text: "OK" }
      ]);
    } else {
      this.props.navigation.navigate("ScanScreen");
    }
  }

  render() {
    return (
      <View ref="rootView" style={Styles.flexOne}>
        <ImageBackground
          source={back}
          style={Styles.resolution}
          resizeMode="cover"
        >
          <Text style={[webWeights.black, Styles.qrURLText]}>
            {this.props.qrURL}
          </Text>
          <AwesomeButtonRick
            style={[Styles.qrButton]}
            backgroundActive="#50a2ff"
            backgroundColor="#20c2ff"
            onPress={click => {
              this.qrPressed();
            }}
          >
            <Icon
              name="camera"
              size={20}
              style={Styles.cameraIcon}
              color="#000"
              type="primary"
            />
            <Text style={[webWeights.black, Styles.qrText]}>QR Code</Text>
          </AwesomeButtonRick>
        </ImageBackground>
      </View>
    );
  }
}
mapStateToProps = state => {
  return {
    qrURL: state.qrURL
  };
};

export default connect(mapStateToProps)(Splash);
