import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from './Button';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
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

  openAddCardPage = () => {
    const { navigation, deck } = this.props;
    navigation.push("Add Card", deck);
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
          text='Add a Card'
          onPress={ this.openAddCardPage }
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