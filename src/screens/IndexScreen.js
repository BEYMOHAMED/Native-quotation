import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";

const IndexScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Welcome page</Text>
        <Image
          style={styles.logo}
          source={require("../../assets/contact-img1.png")}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("Company");
        }}
      >
        <Text style={styles.buttonTitle}>Start</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f0f3f8",
    height: 100,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#0893B0",
    textAlign: "center",
    margin: 10,
  },
  card: {
    backgroundColor: "#D1EAF2",
    height: 600,
    margin: 15,
    marginTop: 30,
    borderRadius: 30,
  },
  button: {
    backgroundColor: "#FF7A5A",
    margin: 10,
    borderRadius: 50,
    justifyContent: "center",
  },
  buttonTitle: {
    color: "#fff",
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
  },
  logo: {
    width: Dimensions.get("window").width - 100,
    alignSelf: "center",
  },
});

export default IndexScreen;
