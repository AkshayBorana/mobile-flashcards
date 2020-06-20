import React from "react";
import { connect } from "react-redux";
import { StyleSheet, View, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Button from "./Button";
import { addDeck } from "../actions/decks";

const styles = StyleSheet.create({
  addDeckContainer: {
    padding: 24,
    width: 400,
    margin: "auto",
    alignItems: "center"
  },
  deckTitle: {
    fontSize: 24,
    marginBottom: 15
  },
  textInput: {
    borderColor: "lightgrey",
    borderWidth: 1,
    marginTop: 16,
    fontSize: 18,
    padding: 16,
    borderRadius: 4
  }
});

class AddDeck extends React.Component {

  state = {
    deckName: ""
  };

  handleChange = text => {
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
      <View style={ styles.addDeckContainer }>
        <Text style={ styles.deckTitle }>Add New Deck</Text>
        <TextInput
          style={ styles.textInput }
          placeholder="Give your Deck a name"
          value={ this.state.deckName }
          onChangeText={ this.handleChange }
        />
        <Button
          text="Add"
          style={{
            margin: 0,
            marginTop: 32,
            padding: 8,
            backgroundColor: "black"
          }}
          disabled={ !this.state.deckName }
          onPress={ this.handleCreateDeck }
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
}

const mapDispatchToProps = (dispatch) =>  {
  return {
    addNewDeck: name => dispatch(addDeck(name))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDeck);