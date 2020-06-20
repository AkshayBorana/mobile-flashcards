import React from 'react';
import { connect } from 'react-redux';
import Button from './Button';
import Deck from './Deck';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  StatusBar,
  FlatList,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
    decksContainer: {
      paddingTop: 50,
      justifyContent: "flex-start",
      alignItems: "center"
    },
    infoTextContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      },
    items: {
      borderRadius: 4,
      backgroundColor: "black",
      padding: 20,
      margin: 15,

    },
    infoTxt: {
      fontSize: 24,
      marginBottom: 12
    }
  });

class Decks extends React.Component {

  renderDeckItem = ({ item }) => {

    const deck = this.props.decks[item];

    return (
      <Deck
        key={item.id}
        deck={deck}
        openDeckPage={() => this.goToDeckPage(deck)}
      />
    );
  };

  goToAddDeckPage = () => {
    const { navigation } = this.props;
    navigation.push("Add Deck");
  };

  goToDeckPage = deck => {
    const { navigation } = this.props;
    navigation.push("Deck Page", deck);
  };

  render() {

    const { decks } = this.props;

    return (
      <SafeAreaView style={styles.decksContainer}>
        <StatusBar />
        {!!Object.keys(decks).length ? (
          <FlatList
            data={Object.keys(decks)}
            renderItem={this.renderDeckItem}
            keyExtractor={item => `${item}`}
          />
        ) : (
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTxt}>Sorry your Deck is empty...</Text>
            <Text>Click on the below button to create new deck.</Text>
          </View>
        )
        }
        <Button text="Add New Deck" onPress={this.goToAddDeckPage} />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    decks: state.decks
  };
}

export default connect(mapStateToProps)(Decks);