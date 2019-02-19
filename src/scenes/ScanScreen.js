import React, { Component } from "react";
import { View, Dimensions, Text } from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";
import Icon from "react-native-vector-icons/Ionicons";
import * as Animatable from "react-native-animatable";
import { connect } from "react-redux";
let SCREEN_HEIGHT = Dimensions.get("window").height;
let SCREEN_WIDTH = Dimensions.get("window").width;

const overlayColor = "rgba(0,0,0,0.5)"; // this gives us a black color with a 50% transparency
const rectBorderColor = "red";
const scanBarColor = "#22ff00";
const iconScanColor = "blue";

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
    SCREEN_HEIGHT = Dimensions.get("window").height;
    SCREEN_WIDTH = Dimensions.get("window").width;
    this.rectDimensions = SCREEN_HEIGHT * 0.6; // this is equivalent to 255 from a 393 device width
    this.rectBorderWidth = SCREEN_HEIGHT * 0.005; // this is equivalent to 2 from a 393 device width
    this.scanBarWidth = SCREEN_HEIGHT * 0.55; // this is equivalent to 180 from a 393 device width
    this.scanBarHeight = SCREEN_HEIGHT * 0.0025; //this is equivalent to 1 from a 393 device width
    if (this.refs.rootView) {
      if (Dimensions.get("window").width < Dimensions.get("window").height) {
        this.props.saveData("");
        this.props.navigation.pop();
      }
    }
  }

  componentWillMount() {
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
          <View
            style={{
              // rectangleContainer
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "transparent"
            }}
          >
            <View
              style={{
                // topOverlay
                flex: 1,
                height: SCREEN_HEIGHT * 0.2,
                width: SCREEN_WIDTH,
                backgroundColor: overlayColor,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text style={{ fontSize: 30, color: "white" }}>
                QR CODE SCANNER
              </Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  // leftAndRightOverlay
                  height: SCREEN_HEIGHT * 0.6,
                  width: SCREEN_HEIGHT,
                  backgroundColor: overlayColor
                }}
              />

              <View
                style={{
                  // rectangle
                  height: this.rectDimensions,
                  width: this.rectDimensions,
                  borderWidth: this.rectBorderWidth,
                  borderColor: this.rectBorderColor,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "transparent"
                }}
              >
                <Icon
                  name="ios-qr-scanner"
                  size={SCREEN_HEIGHT * 0.7}
                  color={iconScanColor}
                />
                <Animatable.View
                  style={{
                    // scanBar
                    width: this.scanBarWidth,
                    height: this.scanBarHeight,
                    backgroundColor: scanBarColor
                  }}
                  direction="alternate-reverse"
                  iterationCount="infinite"
                  duration={1700}
                  easing="linear"
                  animation={this.makeSlideOutTranslation(
                    "translateY",
                    SCREEN_HEIGHT * -0.65
                  )}
                />
              </View>

              <View
                style={{
                  // leftAndRightOverlay
                  height: SCREEN_HEIGHT * 0.6,
                  width: SCREEN_HEIGHT,
                  backgroundColor: overlayColor
                }}
              />
            </View>

            <View
              style={{
                // bottomOverlay
                flex: 1,
                height: SCREEN_HEIGHT * 0.2,
                width: SCREEN_WIDTH,
                backgroundColor: overlayColor,
                paddingBottom: SCREEN_HEIGHT * 0.1
              }}
            />
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

export default connect(
  null,
  mapDispatchToProps
)(ScanScreen);
