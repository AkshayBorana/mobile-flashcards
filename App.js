// import * as React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Provider } from 'react-redux';
import rootReducer from './reduecrs';
import middleware from "./middleware";
import { handleInitialData } from "./actions/decks";
import { setNotification } from "./utils/notifications";
import { createStore } from 'redux';
import Decks from './components/Decks';
import AddDeck from './components/AddDeck';
import DecksPage from "./components/DecksPage";
import AddNewCard from "./components/AddNewCard";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import TakeQuiz from "./components/TakeQuiz";

const instructions = Platform.select({
  ios: `Press Cmd+R to reload,\nCmd+D or shake for dev menu`,
  android: `Double tap R on your keyboard to reload,\nShake or press menu button for dev menu`,
});

const store = createStore(rootReducer, middleware);

const Stack = createStackNavigator();

export default class App extends React.Component {
  componentDidMount() {
    setNotification();
    store.dispatch(handleInitialData());
  }

  render() {
    return (
      <NavigationContainer>
        <Provider store={store}>
          <View style={styles.container}>
            <Stack.Navigator>
              <Stack.Screen
                name="Decks"
                component={Decks}
                options={{ title: "Mobile Flashacrds" }}
              />
              <Stack.Screen name="Add Deck" component={AddDeck} />
              <Stack.Screen
                name="Deck Page"
                component={DecksPage}
                options={({ route }) => {
                  return { title: route.params.name };
                }}
              />
              <Stack.Screen
                name="Add New Card"
                component={AddNewCard}
                options={({ route }) => {
                  return { title: "Add New Card   " };
                }}
              />
              <Stack.Screen
                name="Take a Quiz"
                component={TakeQuiz}
                options={{
                  title: "Take Quiz "
                }} />
            </Stack.Navigator>
          </View>
        </Provider>
      </NavigationContainer>
    );
  }
}
 const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',

  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});