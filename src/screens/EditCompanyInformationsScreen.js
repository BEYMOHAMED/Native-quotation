import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import DataContext from "../context/DataContext";

const EditCompanyInformationsScreen = ({ navigation }) => {
  const { state, addCompany } = useContext(DataContext);
  let { name, address, email, phone } = state.company;

  const [companyName, setCompanyName] = useState(name);
  const [companyAddress, setCompanyAddress] = useState(address);
  const [companyPhoneNumber, setCompanyPhoneNumber] = useState(phone);
  const [companyEmail, setCompanyEmail] = useState(email);

  const info = {
    name: companyName,
    address: companyAddress,
    phone: companyPhoneNumber,
    email: companyEmail,
  };
  return (
    <View>
      <TextInput
        placeholder="company name"
        style={styles.input}
        value={companyName}
        onChangeText={(text) => setCompanyName(text)}
      />
      <TextInput
        placeholder="company address"
        style={styles.input}
        value={companyAddress}
        onChangeText={(text) => setCompanyAddress(text)}
      />
      <TextInput
        placeholder="company phone number"
        style={styles.input}
        value={companyPhoneNumber}
        keyboardType="phone-pad"
        onChangeText={(text) => setCompanyPhoneNumber(text)}
      />
      <TextInput
        placeholder="company email"
        style={styles.input}
        value={companyEmail}
        keyboardType="email-address"
        onChangeText={(text) => setCompanyEmail(text)}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          addCompany(info);
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

export default EditCompanyInformationsScreen;
