import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { clearNotifications, setNotification } from "../utils/notifications";
import Button from './Button';


const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1
  },
  counterContainer: {
    alignItems: "center"
  },
  counter: {
    backgroundColor: "black",
    alignItems: "center",
    padding: 10,
    borderRadius: 4,
    elevation: 6,
    marginBottom: 24
  },
  counterText: {
    color: "white",
    fontSize: 24
  },
  contentCard: {
    elevation: 6,
    padding: 24,
    backgroundColor: "white",
    borderRadius: 4
  },
  questionLabel: {
    fontSize: 16,
    color: "black"
  },
  questionTxt: {
    fontSize: 28
  },
  answerBtnContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  statsTxt: {
    fontSize: 24
  }
});

class TakeQuiz extends React.Component {
  state = {
    cardCounter: 0,
    isCountCorrect: 0,
    isCountIncorrect: 0,
    quizStat: false,
    displayAnswer: false,
  };

  handleAnswer = isCorrect => {
    const { deck } = this.props;
    this.setState(state => {
      let { cardCounter, isCountCorrect, isCountIncorrect, quizStat } = state;

      if (isCorrect) {
        isCountCorrect++;
      } else {
        isCountIncorrect++;
      }

      if (cardCounter === deck.cards.length - 1) {
        clearNotifications().then(setNotification);
        quizStat = true;
      } else {
        cardCounter++;
      }

      return {
        displayAnswer: false,
        isCountCorrect,
        isCountIncorrect,
        cardCounter,
        quizStat
      };
    });
  };

  handleGoToDeck = () => {
    const { navigation } = this.props;
    navigation.pop();
  };

  handleRestartQuiz = () => {
    this.setState(() => {
      return {
        cardCounter: 0,
        displayAnswer: false,
        isCountCorrect: 0,
        isCountIncorrect: 0,
        quizStat: false
      };
    });
  };

  handleDisplayAnswer = () => {
    this.setState(() => {
      return { displayAnswer: true };
    });
  };

  renderQuestionCard = () => {
    const { deck } = this.props;
    const question = deck.cards[this.state.cardCounter];
    return (
      <View style={ styles.contentCard }>
        <Text style={ styles.questionLabel }>Question</Text>
        <Text style={styles.questionTxt}>{question.question}</Text>
        {this.state.displayAnswer && (
          <View>
            <Text style={[styles.questionLabel, { marginTop: 16 }]}>
              Answer
            </Text>
            <Text style={styles.questionTxt}>{question.answer}</Text>
          </View>
        )}
        {this.state.displayAnswer ? (
          <View style={{ marginTop: 32, alignItems: "center" }}>
            <Text style={{ fontSize: 24 }}>Was your answer?</Text>
            <View style={styles.answerBtnContainer}>
              <Button
                text="Correct"
                style={{
                  padding: 10,
                  backgroundColor: "green"
                }}
                onPress={() => this.handleAnswer(true)}
              />
              <Button
                text="Incorrect"
                style={{ padding: 10, backgroundColor: "red" }}
                onPress={() => this.handleAnswer(false)}
              />
            </View>
          </View>
        ) : (
          <Button
            text="Show Answer"
            style={{ padding: 6, backgroundColor: "black", marginTop: 64 }}
            onPress={this.handleDisplayAnswer}
          />
        )}
      </View>
    );
  };

  renderStats = () => {
    const { deck } = this.props;
    return (
      <View style={[styles.contentCard, { alignItems: "center" }]}>
        <Text style={{ fontSize: 24, marginBottom: 16 }}>Your Performance</Text>
        <Text style={styles.statsTxt}>
          Correct: {this.state.isCountCorrect} (
          {((this.state.isCountCorrect / deck.cards.length) * 100).toFixed(2)}%)
        </Text>
        <Text style={styles.statsTxt}>
          Incorrect: {this.state.isCountIncorrect} (
          {((this.state.isCountIncorrect / deck.cards.length) * 100).toFixed(2)}%)
        </Text>
        <View style={{ marginTop: 32, alignItems: "center" }}>
          <View style={styles.answerBtnContainer}>
            <Button
              text="Restart Quiz"
              style={{
                padding: 10,
                backgroundColor: "black"
              }}
              onPress={this.handleRestartQuiz}
            />
            <Button
              text="Go to Deck"
              style={{ padding: 10, backgroundColor: "black" }}
              onPress={this.handleGoToDeck}
            />
          </View>
        </View>
      </View>
    );
  };

  render() {

    const { deck } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.counterContainer}>
          <View style={styles.counter}>
            <Text style={styles.counterText}>
              Question {this.state.cardCounter + 1}/{deck.cards.length}
            </Text>
          </View>
        </View>
        {this.state.quizStat ? this.renderStats() : this.renderQuestionCard()}
      </View>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    deck: state.decks[props.route.params.id]
  };
}

export default connect(mapStateToProps)(TakeQuiz);
