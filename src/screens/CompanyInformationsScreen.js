import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import DataContext from '../context/DataContext';

const CompanyIformationsScreen = ({ navigation }) => {
  const { addCompany } = useContext(DataContext)
  
  const [companyName, setCompanyName] = useState();
  const [companyAddress, setCompanyAddress] = useState();
  const [companyPhoneNumber, setCompanyPhoneNumber] = useState();
  const [companyEmail, setCompanyEmail] = useState();

  const info = {name: companyName, address: companyAddress, phone: companyPhoneNumber, email: companyEmail}
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Company Screen</Text>
      <TextInput
        placeholder='company name'
        style={styles.input}
        onChangeText={(text) => setCompanyName(text)}
      />
      <TextInput
        placeholder='company address'
        style={styles.input}
        onChangeText={(text) => setCompanyAddress(text)}
      />
      <TextInput
        placeholder='company phone number'
        style={styles.input}
        keyboardType="phone-pad"
        onChangeText={(text) => setCompanyPhoneNumber(text)}
      />
      <TextInput
        placeholder='company email'
        style={styles.input}
        keyboardType="email-address"
        onChangeText={(text) => setCompanyEmail(text)}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          addCompany(info)
          navigation.navigate('Client')
        }}
      >
        <Text
          style={styles.buttonTitle}
        >Next</Text>
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

export default CompanyIformationsScreen;