import React from "react";
import {
  StyleSheet,
  Animated,
  Text,
  TouchableOpacity,
} from "react-native";

const styles = StyleSheet.create({
    listItem: {
      flex: 1,
      padding: 20,
      margin: 10,
      borderRadius: 6,
      elevation: 6,
    //   backgroundColor: "cornflowerblue"
    }
  });

export default class Deck extends React.Component {
  state = {
    zoom: new Animated.Value(1.0),
    rotation: new Animated.Value(0.0)
  };

  zoomIn = () => {
    Animated.sequence([
      Animated.timing(this.state.zoom, { toValue: 0.8, duration: 200 }),
      Animated.spring(this.state.zoom, { toValue: 0.9, duration: 100 })
    ]).start();

    Animated.sequence([
        Animated.timing(this.state.rotation, { toValue: -1.2, duration: 200 }),
        Animated.spring(this.state.rotation, { toValue: -1.0, duration: 100 })
    ]).start();
  };

  zoomOut = () => {
    Animated.timing(this.state.zoom, { toValue: 1.0, duration: 200 }).start();

    Animated.timing(this.state.rotation, {
        toValue: 0.0,
        duration: 200
    }).start();
  };

  render() {
    const { deck, openDeckPage } = this.props;
    return (
      <Animated.View
      style={{
        scaleX: this.state.zoom,
        scaleY: this.state.zoom,
        rotation: this.state.rotation
      }}
      >
        <TouchableOpacity
          style={styles.listItem}
          activeOpacity={0.7}
          onPress={openDeckPage}
          onPressIn={this.zoomIn}
          onPressOut={this.zoomOut}
        >
          <Text style={{ fontSize: 24, color: "white" }}>{deck.name}</Text>
          <Text style={{ fontSize: 18, color: "white" }}>
            {deck.cards.length} card{deck.cards.length !== 1 && "s"}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}