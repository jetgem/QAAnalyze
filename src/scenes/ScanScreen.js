"use strict";

import React, { Component } from "react";
import { View, Dimensions, Text } from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";
import Icon from "react-native-vector-icons/Ionicons";
import * as Animatable from "react-native-animatable";
import { connect } from "react-redux";
const SCREEN_HEIGHT = Dimensions.get("screen").height;
const SCREEN_WIDTH = Dimensions.get("screen").width;

class ScanScreen extends Component {
  static navigationOptions = {
    title: "ScanScreen",
    header: null,
    headerForceInset: { top: "never" }
  };

  constructor() {
    super();
  }

  getOrientation() {
    if (this.refs.rootView) {
      if (Dimensions.get("window").width < Dimensions.get("window").height) {
        this.props.saveData("");
        this.props.navigation.pop();
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

  onSuccess(e) {
    this.props.saveData(e.data);
    this.props.navigation.pop();
  }

  makeSlideOutTranslation(translationType, fromValue) {
    return {
      from: {
        [translationType]: SCREEN_HEIGHT * -0.05
      },
      to: {
        [translationType]: fromValue
      }
    };
  }

  render() {
    return (
      <QRCodeScanner
        ref="rootView"
        showMarker
        onRead={this.onSuccess.bind(this)}
        cameraStyle={{ height: SCREEN_HEIGHT, width: SCREEN_WIDTH }}
        customMarker={
          <View style={styles.rectangleContainer}>
            <View style={styles.topOverlay}>
              <Text style={{ fontSize: 30, color: "white" }}>
                QR CODE SCANNER
              </Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <View style={styles.leftAndRightOverlay} />

              <View style={styles.rectangle}>
                <Icon
                  name="ios-qr-scanner"
                  size={SCREEN_HEIGHT * 0.8}
                  color={iconScanColor}
                />
                <Animatable.View
                  style={styles.scanBar}
                  direction="alternate-reverse"
                  iterationCount="infinite"
                  duration={1700}
                  easing="linear"
                  animation={this.makeSlideOutTranslation(
                    "translateY",
                    SCREEN_HEIGHT * -0.7
                  )}
                />
              </View>

              <View style={styles.leftAndRightOverlay} />
            </View>

            <View style={styles.bottomOverlay} />
          </View>
        }
      />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveData: url => dispatch({ type: "SAVE_QR_DATA", url })
  };
};

const overlayColor = "rgba(0,0,0,0.5)"; // this gives us a black color with a 50% transparency

const rectDimensions = SCREEN_HEIGHT * 0.65; // this is equivalent to 255 from a 393 device width
const rectBorderWidth = SCREEN_HEIGHT * 0.005; // this is equivalent to 2 from a 393 device width
const rectBorderColor = "red";

const scanBarWidth = SCREEN_HEIGHT * 0.65; // this is equivalent to 180 from a 393 device width
const scanBarHeight = SCREEN_HEIGHT * 0.0025; //this is equivalent to 1 from a 393 device width
const scanBarColor = "#22ff00";

const iconScanColor = "blue";

const styles = {
  rectangleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
  },

  rectangle: {
    height: rectDimensions,
    width: rectDimensions,
    borderWidth: rectBorderWidth,
    borderColor: rectBorderColor,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
  },

  topOverlay: {
    flex: 1,
    height: SCREEN_HEIGHT * 0.2,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
    justifyContent: "center",
    alignItems: "center"
  },

  bottomOverlay: {
    flex: 1,
    height: SCREEN_HEIGHT * 0.2,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
    paddingBottom: SCREEN_HEIGHT * 0.1
  },

  leftAndRightOverlay: {
    height: SCREEN_HEIGHT * 0.65,
    width: SCREEN_HEIGHT,
    backgroundColor: overlayColor
  },

  scanBar: {
    width: scanBarWidth,
    height: scanBarHeight,
    backgroundColor: scanBarColor
  }
};

export default connect(
  null,
  mapDispatchToProps
)(ScanScreen);
