import React, { useContext, useEffect, useState } from "react";
import * as Print from "expo-print";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import DataContext from "../context/DataContext";
import { Feather } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import email from "react-native-email";

const PreviewScreen = ({ navigation }) => {
  const [subTotal, setSubTotal] = useState();
  const { state, deleteDescription } = useContext(DataContext);
  let total = 0;
  useEffect(() => {
    state.descriptions.forEach((element) => {
      total = parseInt(element.hours) * parseInt(element.pricePerHour) + total;
    });
    setSubTotal(total);
  }, []);

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Pdf Content</title>
        <style>
            body {
              margin: 0;
              font-size: 16px;
              color: #5A5B6B;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            }
            .header{
              border-bottom: 4px solid #dadada;
              padding: 30px;
            }
            section {
              break-inside: avoid;
            }
            table{
              text-align: start;
              min-width: 80vw;
            }
            th{
              text-align: start;
              padding: 15px;
            }
            td{
              padding: 10px;
              font-size: 20px;
            }
            p{
              font-size: 20px;
            }
            section{
              border-bottom: 4px solid #dadada;
              width: 100vw;
              display: flex;
              align-items: center;
              justify-content: start;
              padding: 30px;
            }
        </style>
    </head>
    <body>
        <div class="header">
          <h1>Devis</h1>
          <p>DVS-${state.settings.number}</p>
          <p>Date: ${state.settings.date}</p>
        </div>
        <div class="info">
          <section>
            <table>
              <th>FROM</th>
              <th>TO</th>
              <tr>
                <td>${state.company.name}</td>
                <td>${state.client.name}</td>
              </tr>
              <tr>
                <td>${state.company.email}</td>
                <td>${state.client.email}</td>
              </tr>
              <tr>
                <td>${state.company.address}</td>
                <td>${state.client.address}</td>
              </tr>
              <tr>
                <td>${state.company.phone}</td>
                <td>${state.client.address}</td>
              </tr>
            </table>
          </section>
          <section>
            <div class="table">
              <table>
                <th>DESCRIPTION</th>
                <th>HOURS</th>
                <th>PRICE</th>
                <th>TOTAL</th>
                ${state.descriptions
                  .map((description) => {
                    return (
                      "<tr><td>" +
                      description.description +
                      "</td><td>" +
                      description.hours +
                      "</td><td>" +
                      state.settings.currency +
                      description.pricePerHour +
                      "</td><td>" +
                      state.settings.currency +
                      description.hours * description.pricePerHour +
                      "</td></tr>"
                    );
                  })
                  .join("")}
              </table>
            </div>
          </section>
          <section>
            <div class="table">
              <table>
                <th>TOTAL HTC</th>
                <th>TAX RATE (${state.settings.taxRate}%)</th>
                <th>TOTAL TTC</th>
                <tr>
                  <td>${state.settings.currency}${subTotal}</td>
                  <td>${state.settings.currency}${
    (subTotal * state.settings.taxRate) / 100
  }
                  </td>
                  <td>${state.settings.currency}${
    subTotal + (subTotal * state.settings.taxRate) / 100
  }
                  </td>
                </tr>
              </table>
            </div>
        </section>
    </body>
    </html>
`;

  const createAndSavePDF = async (html) => {
    try {
      const { uri } = await Print.printToFileAsync({ html });
      if (Platform.OS === "ios") {
        await Sharing.shareAsync(uri);
      } else {
        const permission = await MediaLibrary.requestPermissionsAsync();
        if (permission.granted) {
          await MediaLibrary.createAssetAsync(uri);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEmail = () => {
    const to = [state.client.email];
    email(to, {
      subject: "Show how to use",
      body: "Some body right here",
    }).catch(console.error);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Preview Screen</Text>
      <View style={styles.block}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("EditCompany");
          }}
        >
          <Text style={styles.blockTitle}>
            Company
            <EvilIcons name="pencil" size={25} />
          </Text>
        </TouchableOpacity>
        <Text style={styles.row}>Name: {state.company.name}</Text>
        <Text style={styles.row}>Address: {state.company.address}</Text>
        <Text style={styles.row}>Email: {state.company.email}</Text>
        <Text style={styles.row}>Phone: {state.company.phone}</Text>
      </View>
      <View style={styles.block}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("EditClient");
          }}
        >
          <Text style={styles.blockTitle}>
            Client
            <EvilIcons name="pencil" size={25} />
          </Text>
        </TouchableOpacity>
        <Text style={styles.row}>Name: {state.client.name}</Text>
        <Text style={styles.row}>Address: {state.client.address}</Text>
        <Text style={styles.row}>Email: {state.client.email}</Text>
      </View>
      <View style={styles.block}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("EditSettings");
          }}
        >
          <Text style={styles.blockTitle}>
            Settings
            <EvilIcons name="pencil" size={25} />
          </Text>
        </TouchableOpacity>
        <Text style={styles.row}>Number: {state.settings.number}</Text>
        <Text style={styles.row}>Date: {state.settings.date}</Text>
        <Text style={styles.row}>Tax Rate: {state.settings.taxRate}</Text>
        <Text style={styles.row}>Currency: {state.settings.currency}</Text>
      </View>
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
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          createAndSavePDF(htmlContent);
          alert("PDF generated");
        }}
      >
        <Text style={styles.buttonTitle}>Create PDF</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleEmail}>
        <Text style={styles.buttonTitle}>Send Mail</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
  button: {
    backgroundColor: "#FF7A5A",
    margin: 10,
    borderRadius: 50,
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#0893B0",
    textAlign: "center",
    margin: 10,
  },
  buttonTitle: {
    color: "#fff",
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
  },
  block: {
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 5,
    padding: 5,
  },
  blockTitle: {
    fontSize: 15,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#0893B0",
    textAlign: "center",
  },
  row: {
    margin: 5,
  },
  container: {
    backgroundColor: "#f0f3f8",
    height: Dimensions.get("window").height,
  },
});

export default PreviewScreen;
