import React from "react";
import { connect } from "react-redux";
import Button from "./Button";
import {
  View,
  Text,
  StatusBar,
  FlatList,
  StyleSheet,
  TouchableOpacity
} from "react-native";

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
      <TouchableOpacity
        style={styles.items}
        key={item}
        activeOpacity={0.7}
        onPress={() => this.openDeckPage(deck)}
      >
        <Text style={{ fontSize: 24, color: "white" }}>{deck.name}</Text>
        <Text style={{ fontSize: 18, color: "white" }}>
          {deck.cards.length} card{deck.cards.length !== 1 && "s"}
        </Text>
      </TouchableOpacity>
    );
  };

  openAddDeckPage = () => {
    const { navigation } = this.props;
    navigation.push("Add Deck");
  };

  openDeckPage = deck => {
    const { navigation } = this.props;
    navigation.push("Deck Page", deck);
  };

  render() {

    const { decks } = this.props;

    return (
      <View style={styles.decksContainer}>
        <StatusBar />
        {!!Object.keys(decks).length ? (
          <FlatList
            data={Object.keys(decks)}
            renderItem={this.renderDeckItem}
          />
        ) : (
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTxt}>Sorry your Deck is empty...</Text>
            <Text>Click on the below button to create new deck.</Text>
          </View>
        )
        }
        <Button text="Add New Deck" onPress={this.openAddDeckPage} />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    decks: state.decks
  };
}

export default connect(mapStateToProps)(Decks);