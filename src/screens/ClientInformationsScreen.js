import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from "react-native";
import DataContext from "../context/DataContext";

const ClientInformationsScreen = ({ navigation }) => {
  const { addClient } = useContext(DataContext);

  const [clientName, setClientName] = useState();
  const [clientAddress, setClientAddress] = useState();
  const [clientEmail, setClientEmail] = useState();

  const info = { name: clientName, address: clientAddress, email: clientEmail };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Client Screen</Text>
      <TextInput
        placeholder="client name"
        style={styles.input}
        onChangeText={(text) => setClientName(text)}
      />
      <TextInput
        placeholder="client address"
        style={styles.input}
        onChangeText={(text) => setClientAddress(text)}
      />
      <TextInput
        placeholder="client email"
        style={styles.input}
        keyboardType="email-address"
        onChangeText={(text) => setClientEmail(text)}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          addClient(info);
          navigation.navigate("Settings");
        }}
      >
        <Text style={styles.buttonTitle}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "grey",
    height: 50,
    margin: 10,
    padding: 10,
    fontSize: 18,
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#0893B0",
    textAlign: "center",
    margin: 10,
  },
  container: {
    backgroundColor: "#f0f3f8",
    height: Dimensions.get("window").height,
  },
});

export default ClientInformationsScreen;
