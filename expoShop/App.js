import React from 'react';
import { StyleSheet, Text, View, FlatList, LogBox } from 'react-native';
import Main from './Navigators/Main'
import { Provider } from 'react-redux';
import Header from './Shared/Header';
import store from './Redux/store';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import Auth from "./context/Store/Auth";

export default function App() {
  return (
    <Auth>
      <Provider store={store}>
        <NavigationContainer>
          <Header />
          <Main />
          <Toast
            ref={(ref) => {
              Toast.setRef(ref)
            }}
          />
        </NavigationContainer>
      </Provider>
    </Auth>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});
