import React, { useContext, useState } from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  View,
  Dimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import DataContext from "../context/DataContext";

const DesciptionScreen = ({ navigation }) => {
  const { state, addDescription, deleteDescription } = useContext(DataContext);

  const [description, setDescription] = useState();
  const [hours, setHours] = useState();
  const [pricePerHour, setPricePerHour] = useState();

  const info = {
    description: description,
    hours: hours,
    pricePerHour: pricePerHour,
    id: Math.floor(Math.random() * 99999),
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled" style={styles.container}>
      <Text style={styles.title}>Description screen</Text>
      <TextInput
        placeholder="description"
        style={styles.input}
        onChangeText={(text) => setDescription(text)}
      />
      <TextInput
        placeholder="hours"
        style={styles.input}
        keyboardType="numeric"
        onChangeText={(text) => setHours(text)}
      />
      <TextInput
        placeholder="price per hour"
        style={styles.input}
        keyboardType="numeric"
        onChangeText={(text) => setPricePerHour(text)}
      />
      {state.descriptions ? (
        <FlatList
          data={state.descriptions}
          keyExtractor={(desciption) => desciption.id}
          renderItem={({ item }) => {
            return (
              <View style={styles.description}>
                <Text style={styles.price}>{item.description}</Text>
                <Text>{item.hours}</Text>
                <Text style={styles.price}>
                  {state.settings.currency}
                  {item.pricePerHour}
                </Text>
                <TouchableOpacity onPress={() => deleteDescription(item.id)}>
                  <Feather style={styles.icon} name="trash" />
                </TouchableOpacity>
              </View>
            );
          }}
        />
      ) : (
        <Text></Text>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          addDescription(info);
          console.log(state);
        }}
      >
        <Text style={styles.buttonTitle}> Add Description </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("Preview");
        }}
      >
        <Text style={styles.buttonTitle}> See Data </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "grey",
    height: 50,
    margin: 10,
    padding: 10,
    fontSize: 18,
    backgroundColor: "#fff",
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
  description: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    padding: 15,
    margin: 10,
    borderRadius: 10,
    justifyContent: "space-between",
  },
  price: {
    fontWeight: "bold",
    fontSize: 15,
  },
  icon: {
    fontSize: 24,
  },
});

export default DesciptionScreen;
