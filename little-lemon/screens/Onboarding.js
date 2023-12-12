import * as React from 'react';
import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';



export default function Onboarding({ navigation }) {
  // declare the variables
  const [firstName, onChangeFirstName] = useState('');
  const [email, onChangeEmail] = useState('');

  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <Image 
          style={styles.logo} 
          source={require('../assets/Logo.png')}
          accessible={true}
          accessibilityLabel={'Little Lemon logo and title'}
        />
      </View>
      <View style={styles.body}>
        <Text style={styles.headerText}>Let us get to know you</Text>
        <Text style={styles.regularText}>First Name</Text>
        <TextInput
          style={styles.input} 
          onChangeText={onChangeFirstName}
          placeholder='first name'
          value={firstName}
        />
        <Text style={styles.regularText}>Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeEmail}
          placeholder='email'
          value={email}
        />
      </View>
      <View style={styles.footer}>
        <Pressable onPress={() => navigation.navigate('Home')}
          style={styles.button}
        >
          <Text style={styles.buttonText}>
            Next
          </Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  header: {
    flex: 0.2,
    backgroundColor: '#d9dfe5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 100,
    width: 300,
    resizeMode: 'contain'
  },
  body: {
    flex: 0.6,
    backgroundColor: '#c4ccd3',
    alignItems: 'center',
  },
  headerText: {
    padding: 40,
    fontSize: 25,
    marginTop: 20,
    marginBottom: 30,
    color: '#495E57',
    textAlign: 'center',
  },
  regularText: {
    fontSize: 20,
    padding: 5,
    marginVertical: 10,
    color: '#495E57',
    textAlign: 'center',
  },
  input: {
    height: 50,
    width: 300,
    borderWidth: 2,
    fontSize: 16,
    borderColor: 'black',
    borderRadius: 8,
    padding: 15
  },
  footer: {
    flex: 0.2,
    backgroundColor: '#EDEFEE',
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  button: {
    padding: 10,
    backgroundColor: '#c4ccd3',
    borderRadius: 10,
    width: 150,
    marginRight: 20
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 25,
  }
})