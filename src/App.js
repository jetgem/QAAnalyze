/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * export PATH=~/Library/Android/sdk/tools:$PATH
 * export PATH=~/Library/Android/sdk/platform-tools:$PATH
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Provider } from "react-redux";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Splash from "./scenes/Splash";
import store from "./store/store";
import ScanScreen from "./scenes/ScanScreen";
const AppNavigator = createStackNavigator(
  {
    Splash: { screen: Splash, params: { name: "Splash" } },
    ScanScreen: { screen: ScanScreen, params: { name: "ScanScreen" } }
  },
  {
    initialRouteName: "Splash"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
