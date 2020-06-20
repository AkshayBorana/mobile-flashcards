import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from './Button';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
    infoTextContainer: {
      alignItems: "center",
      marginTop: 20
    },
    decksPage: {
      padding: 30,
      margin: 20
    },
    decksPageTitle: {
      fontSize: 28,
      fontWeight: "bold"
    },
    decksPageSubTitle: {
      fontSize: 16
    }
  });

class DecksPage extends React.Component {

  goToAddCardPage = () => {
    const { navigation, deck } = this.props;
    navigation.push("Add Card", { id: deck.id, name: deck.name });
  };

  goToQuizPage = () => {
    const { navigation, deck } = this.props;
    navigation.push("Take Quiz", { id: deck.id, name: deck.name });
  };

  render() {

    const { deck } = this.props;

    return (
      <View style={ styles.decksPage }>
        <Text style={ styles.decksPageTitle }>{ deck.name }</Text>
        <Text style={ styles.decksPageSubTitle }>
          { deck.cards.length } card{ deck.cards.length !== 1 && 's' }
        </Text>
        <Button
          text="Take a Quiz"
          style={{
            margin: 0,
            marginTop: 20,
            backgroundColor: "black",
            padding: 8
          }}
          disabled={deck.cards.length === 0}
          onPress={this.goToQuizPage}
        />

        {/* {deck.cards.length === 0 && (
          <View style={styles.infoTextContainer}>
            <Text>(Add cards to take a quiz)</Text>
          </View>
        )} */}

        <Button
          text='Add a Card'
          onPress={ this.goToAddCardPage }
          style={{ margin: 0, marginTop: 30, backgroundColor: 'black' }}
        />
      </View>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    deck: state.decks[props.route.params.id]
  };
}

export default connect(mapStateToProps)(DecksPage);