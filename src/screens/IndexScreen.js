import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

const IndexScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Welcome page</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => console.log('object')}
      >
        <Text
          style={styles.buttonTitle}
        >
          Create Quotation
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: 100
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#0893B0',
    textAlign: 'center',
    margin: 10
  },
  card: {
    backgroundColor: '#D1EAF2',
    height: 600,
    margin: 15,
    marginTop: 30,
    borderRadius: 30
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
  }
});

export default IndexScreen;