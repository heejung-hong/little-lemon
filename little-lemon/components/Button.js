import * as React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

const Button = ({onPress, children, disabled}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.buttonWrapper, disabled && styles.disabled]}
      disabled={disabled}
    >
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    padding: 10,
    width: 150,
    marginRight: 20,  
    backgroundColor: '#c4ccd3',
    borderRadius: 10,
  },
  disabled: {
    backgroundColor: 'lightgrey',
    opacity: 0.5,
  },
  text: {
    color: 'black',
    textAlign: 'center',
    fontSize: 25,
  }
});

export default Button;
