import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  list: {
    flex: 1,
    padding: 10,
    width: "100%",
  },
  imageContainer: {
    flex: 1,
    aspectRatio: 0.7,
    margin: 5,

    borderWidth: 0.5,
    borderColor: "black",
    borderRadius: 5,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  voteContainer: {
    height: 30,

    backgroundColor: "black",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },
  voteCount: {
    color: "white",
    marginHorizontal: 10,
    fontSize: 16,
  },
});

export default styles;
