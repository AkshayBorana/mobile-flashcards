import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

export default function Button({ text, onPress, style, disabled }) {
  return (
    <TouchableOpacity
      style={[styles.btnStyle, style, disabled ? { opacity: 0.5 } : {}]}
      activeOpacity={0.9}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.btnTxt}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btnStyle: {
    padding: 10,
    backgroundColor: "black",
    margin: 10,
    alignItems: "center",
    width: 200,
    borderRadius: 4,
  },
  btnTxt: {
    fontSize: 18,
    color: "white"
  }
});