import React from "react";
import { connect } from "react-redux";
import { View, Text } from "react-native";

class TakeQuiz extends React.Component {
  render() {

    return (
      <View>
        <Text>Take a Quiz</Text>
      </View>
    );

  }
}

const mapStateToProps = (state, props) => {
    return {}
}

export default connect(mapStateToProps)(TakeQuiz);