import React from "react";
import { connect } from "react-redux";
import { StyleSheet, View, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Button from "./Button";
import { addDeck } from "../actions/decks";

class AddDeck extends React.Component {
  state = {
    deckName: ""
  };

  handleTextChange = text => {
    this.setState(() => {
      return { deckName: text };
    });
  };

  handleCreateDeck = () => {
    const { deckName } = this.state;
    const { addNewDeck, navigation } = this.props;
    addNewDeck(deckName);
    navigation.pop();
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Add New Deck</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Deck Name"
          value={this.state.deckName}
          onChangeText={this.handleTextChange}
        />
        <Button
          text="Add"
          style={{
            margin: 0,
            marginTop: 32,
            padding: 8,
            backgroundColor: "blue"
          }}
          disabled={!this.state.deckName}
          onPress={this.handleCreateDeck}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    addNewDeck: name => dispatch(addDeck(name))
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24
  },
  title: {
    fontSize: 24,
    textDecorationLine: "underline"
  },
  textInput: {
    borderColor: "lightgrey",
    borderWidth: 1,
    marginTop: 16,
    fontSize: 24,
    padding: 16,
    borderRadius: 6
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddDeck);