import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.main}>
      <Text style={styles.headerText}>
        Home Screen
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#c4ccd3',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerText: {
    padding: 40,
    fontSize: 25,
    color: '#495E57',
    textAlign: 'center',
  }
})
