import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import Button from './Button';
import { handleAddCardToDeck } from '../actions/decks';
import { connect } from 'react-redux';
import { TextInput } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  addNewCardContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    width: 500,
    margin: "auto"
  },
  title: {
    fontSize: 20
  },
  textInput: {
    width: 400,
    margin: "auto",
    fontSize: 18,
    borderWidth: 1,
    marginTop: 18,
    padding: 20,
    borderRadius: 4,
    borderColor: "grey",
  }
});

class AddNewCard extends Component {

  state = {
    question: "",
    answer: ""
  };

  handleChange = (name, text) => {
    this.setState(() => {
      return { [name]: text };
    });
  };

  handleAddNewCard = () => {
    const { addNewCard, navigation } = this.props;
    const { question, answer } = this.state;

    addNewCard({ question, answer });
    navigation.pop();
  };

  render() {

    const { deck } = this.props;

    return (

      <View style={ styles.addNewCardContainer }>
        <Text style={ styles.title }>Add New Card to '{ deck.name }'</Text>
        <TextInput
          style={ styles.textInput }
          placeholder="Enter your Question"
          value={ this.state.question }
          onChangeText={text => this.handleChange("question", text)}
        />
        <TextInput
          style={ styles.textInput }
          placeholder="Enter your Answer"
          value={ this.state.answer }
          onChangeText={ text => this.handleChange("answer", text) }
        />
        <Button
          text="Add"
          style={{
            margin: 0,
            marginTop: 32,
            padding: 8,
            backgroundColor: "black"
          }}
          disabled={ !this.state.question || !this.state.answer }
          onPress={ this.handleAddNewCard }
        />
      </View>

    );
  }
}

const mapStateToProps = (state, { route }) => {
  return {
    deck: state.decks[route.params.id]
  };
}

const mapDispatchToProps = (dispatch, { route })  =>{
  const { id: deckId } = route.params;
  return {
    addNewCard: card => dispatch(handleAddCardToDeck(deckId, card))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNewCard);