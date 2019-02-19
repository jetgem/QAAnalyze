import { StyleSheet } from "react-native";
export default (Styles = StyleSheet.create({
  flexOne: {
    flex: 1
  },
  resolution: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  qrButton: {
    alignSelf: "center"
  },
  cameraIcon: {
    marginRight: 10,
    position: "absolute",
    left: 30
  },
  qrText: {
    fontSize: 20,
    color: "black",
    width: 250,
    textAlign: "center"
  },
  qrURLText: {
    fontSize: 20,
    color: "black",
    textAlign: "center"
  }
}));
