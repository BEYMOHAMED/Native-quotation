import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import IndexScreen from './src/screens/IndexScreen';
import CompanyInformationsScreen from './src/screens/CompanyInformationsScreen';
import ClientsInformationsScreen from './src/screens/ClientInformationsScreen';
import QuotationSettingsScreen from './src/screens/QuotationSettingsScreen';
import DescriptionScreen from './src/screens/DescriptionScreen';
import { DataProvider } from './src/context/DataContext'; 
import PreviewScreen from './src/screens/PreviewScreen';
// import { LogBox } from 'react-native';

// LogBox.ignoreLogs(['Remote debugger']);

const navigator = createStackNavigator({
  Index: IndexScreen,
  Company: CompanyInformationsScreen,
  Client: ClientsInformationsScreen,
  Settings: QuotationSettingsScreen,
  Description: DescriptionScreen,
  Preview: PreviewScreen
  
}, {
  initialRouteName:'Company',
  defaultNavigationOptions: {
    title: 'QUOTATION'
  }
})

const App = createAppContainer(navigator);

export default () => {
  return (
  <DataProvider>
    <App />
  </DataProvider>)
};