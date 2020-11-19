import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import DataContext from '../context/DataContext';

const DesciptionScreen = ({ navigation }) => {
  const { addDescription } = useContext(DataContext)

  const [description, setDescription] = useState();
  const [hours, setHours] = useState();
  const [pricePerHour, setPricePerHour] = useState();

  const info = {description: description, hours: hours, pricePerHour: pricePerHour}

  return(
    <View style={styles.container}>
      <Text style={styles.title}>Description screen</Text>
      <TextInput
        placeholder='description'
        style={styles.input}
        onChangeText={(text) => setDescription(text)}
      />
      <TextInput
        placeholder='hours'
        style={styles.input}
        keyboardType="numeric"
        onChangeText={(text) => setHours(text)}
      />
      <TextInput
        placeholder='price per hour'
        style={styles.input}
        keyboardType="numeric"
        onChangeText={(text) => setPricePerHour(text)}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          addDescription(info)
        }}
      >
        <Text style={styles.buttonTitle}> Add Description </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('Preview')
        }}
      >
        <Text style={styles.buttonTitle}> See Data </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
    borderRadius: 5,
    borderColor: 'grey',
    height: 50,
    margin: 10,
    padding: 10,
    fontSize: 18
  },
  button: {
    backgroundColor: '#FF7A5A',
    margin: 10,
    borderRadius: 50,
    justifyContent: 'center'
  },
  buttonTitle: {
    color: '#fff',
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#0893B0',
    textAlign: 'center',
    margin: 10
  },
  container: {
    backgroundColor: '#fff'
  }
})

export default DesciptionScreen;