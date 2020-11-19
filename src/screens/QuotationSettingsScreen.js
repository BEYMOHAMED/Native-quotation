import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import DataContext from '../context/DataContext';

const QuotationSettingsScreen = ({ navigation }) => {
  const { addSettings } = useContext(DataContext)

  const [quotationNumber, setQuotationyNumber] = useState();
  const [quotationDate, setQuotationDate] = useState();
  const [quotationRate, setQuotationRate] = useState();
  const [quotationCurrency, setQuotationCurrency] = useState();

  const info = {number: quotationNumber, date: quotationDate, taxRate: quotationRate, currency: quotationCurrency}
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quotation settings</Text>
      <TextInput
        placeholder='quotation number'
        style={styles.input}
        keyboardType="numeric"
        onChangeText={(text) => setQuotationyNumber(text)}
      />
      <TextInput
        placeholder='quotation date'
        style={styles.input}
        onChangeText={(text) => setQuotationDate(text)}
      />
      <TextInput
        placeholder='tax rate'
        style={styles.input}
        keyboardType="numeric"
        onChangeText={(text) => setQuotationRate(text)}
      />
      <TextInput
        placeholder='currency'
        style={styles.input}
        onChangeText={(text) => setQuotationCurrency(text)}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          addSettings(info)
          navigation.navigate('Description')
        }}
      >
        <Text
          style={styles.buttonTitle}
        >
          Next
        </Text>
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

export default QuotationSettingsScreen;