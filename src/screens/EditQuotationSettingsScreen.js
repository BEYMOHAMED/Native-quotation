import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import DatePicker from "react-native-datepicker";
import DataContext from "../context/DataContext";
import RNPickerSelect from "react-native-picker-select";

const EditQuotationSettingsScreen = ({ navigation }) => {
  const { state, addSettings } = useContext(DataContext);

  let { number, date, taxRate, currency } = state.settings;

  const [quotationNumber, setQuotationyNumber] = useState(number);
  const [quotationDate, setQuotationDate] = useState(date);
  const [quotationRate, setQuotationRate] = useState(taxRate);
  const [quotationCurrency, setQuotationCurrency] = useState(currency);

  const info = {
    number: quotationNumber,
    date: quotationDate,
    taxRate: quotationRate,
    currency: quotationCurrency,
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quotation settings</Text>
      <TextInput
        placeholder="quotation number"
        style={styles.input}
        value={quotationNumber}
        keyboardType="numeric"
        onChangeText={(text) => setQuotationyNumber(text)}
      />
      <DatePicker
        mode="date"
        placeholder={quotationDate}
        format="YYYY-MM-DD"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        value={quotationDate}
        customStyles={{
          dateIcon: {
            position: "absolute",
            right: 0,
            top: 4,
            marginLeft: 0,
          },
          dateInput: {
            backgroundColor: "#fff",
            borderWidth: 2,
            borderRadius: 5,
            borderColor: "grey",
            height: 50,
            margin: 10,
            padding: 10,
            fontSize: 18,
            width: Dimensions.get("window").width,
          },
        }}
        onDateChange={(date) => setQuotationDate(date)}
      />
      <TextInput
        placeholder="tax rate"
        style={styles.input}
        value={quotationRate}
        keyboardType="numeric"
        onChangeText={(text) => setQuotationRate(text)}
      />
      <View style={styles.picker}>
        <RNPickerSelect
          onValueChange={(value) => setQuotationCurrency(value)}
          placeholder={{
            label: "Select currency...",
            value: quotationCurrency,
          }}
          style={{
            placeholder: {
              fontSize: 18,
              color: "#111",
            },
          }}
          items={[
            { label: "EUR", value: "€" },
            { label: "USD", value: "$" },
            { label: "JPY", value: "¥" },
            { label: "GBP", value: "£" },
            { label: "DZD", value: "DA" },
          ]}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          addSettings(info);
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
  picker: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "grey",
    height: 50,
    margin: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default EditQuotationSettingsScreen;
