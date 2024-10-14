import { StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  uploadBtn: {
    width: screenWidth * 0.6,
    height: screenWidth * 0.6,
    backgroundColor: "pink",
    borderRadius: (screenWidth * 0.6) / 2,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    marginVertical: 20,
  },
  imageBackground: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 25,
  },
});

export default styles;
