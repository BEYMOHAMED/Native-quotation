import React, { useContext } from 'react';
import * as Print from 'expo-print';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from "expo-sharing";
import { View, Text, TouchableOpacity } from 'react-native';
import DataContext from '../context/DataContext';

const PreviewScreen = () => {
  const { state } = useContext(DataContext);

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
              display: flex;
              border-bottom: 4px solid #dadada;
              padding: 30px;
            }
            .header img{
              width: 60px;
              margin-right: 30px;
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
          <img src="https://www.flaticon.com/svg/static/icons/svg/3643/3643358.svg" alt="">
          <div>
            <h1>Devis</h1>
            <p>DVS-${state.settings.number}</p>
          </div>
        </div>
        <div class="info">
          <section>
            <table>
              <th>TO</th>
              <th>FROM</th>
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
                <th>DAYS</th>
                <th>PRICE</th>
                <th>TOTAL</th>
                ${state.descriptions.map(description => {
                  return(
                    '<tr><td>' + description.description + '</td><td>' + description.hours + '</td><td>' + description.pricePerHour + '</td><td>$22000</td></tr>'
                  )
                }).join('')}
              </table>
            </div>
          </section>
          <section>
            <div class="table">
              <table>
                <th>SUBTOTAL</th>
                <th>GST (${state.settings.taxRate}%)</th>
                <th>TOTAL</th>
                <tr>
                  <td>$42,000</td>
                  <td>$1,500</td>
                  <td>$22,500</td>
                </tr>
              </table>
            </div>
          </section>
          <section>
            <div class="bank">
              <h3>BANK DETAILS</h3>
              <p>Bank Name: Macquaria Bank</p>
              <p>BIC / SWIFT CODE: MACQUAU25</p>
              <p>Account Holder: Tesla</p>
              <p>Account Number: 1234567890</p>
            </div>
          </section>
        </div>
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
  return (
    <View>
      <Text>Preview Screen</Text>
      <Text>{JSON.stringify(state)}</Text>
      <Text>my object: {state.descriptions.map(item => {
        return item.description
      }).join('')}</Text>
      <TouchableOpacity
        onPress={() => {
          createAndSavePDF(htmlContent)
          alert('PDF generated')
        }}
      >
        <Text>Create PDF</Text>
      </TouchableOpacity>
    </View>
  )
};

export default PreviewScreen;