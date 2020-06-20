import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function Button({ text, onPress, style, disabled }) {
  return (
    <TouchableOpacity
      style={[styles.btn, style, disabled ? { opacity: 0.5 } : {}]}
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.txt}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    padding: 20,
    backgroundColor: "black",
    borderRadius: 6,
    margin: 10,
    alignItems: "center",
    elevation: 6,
    width: 200
  },
  txt: {
    color: "white",
    fontSize: 24
  }
});