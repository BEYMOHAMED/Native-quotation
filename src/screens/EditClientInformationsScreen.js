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

const EditClientInformationsScreen = ({ navigation }) => {
  const { state, addClient } = useContext(DataContext);

  let { name, address, email } = state.client;

  const [clientName, setClientName] = useState(name);
  const [clientAddress, setClientAddress] = useState(address);
  const [clientEmail, setClientEmail] = useState(email);

  const info = { name: clientName, address: clientAddress, email: clientEmail };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Client Screen</Text>
      <TextInput
        placeholder="client name"
        style={styles.input}
        value={clientName}
        onChangeText={(text) => setClientName(text)}
      />
      <TextInput
        placeholder="client address"
        style={styles.input}
        value={clientAddress}
        onChangeText={(text) => setClientAddress(text)}
      />
      <TextInput
        placeholder="client email"
        style={styles.input}
        value={clientEmail}
        keyboardType="email-address"
        onChangeText={(text) => setClientEmail(text)}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          addClient(info);
          navigation.pop();
        }}
      >
        <Text style={styles.buttonTitle}>Save</Text>
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

export default EditClientInformationsScreen;
