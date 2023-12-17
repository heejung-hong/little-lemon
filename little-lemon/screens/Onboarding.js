import * as React from 'react';
import { useState } from 'react';
import { Image, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import Button from '../components/Button';
import { validateName, validateEmail } from '../utils';

export default function Onboarding({ navigation, route }) {
  // declare the variables
  const [firstName, onChangeFirstName] = useState('');
  const [email, onChangeEmail] = useState('');

  const isNameValid = validateName(firstName);
  const isEmailValid = validateEmail(email);

  const { setUserToken } = route.params;

  return (
    <SafeAreaView style={styles.container}>      
      <Image 
        style={styles.logo} 
        source={require('../assets/Logo.png')}
        accessible={true}
        accessibilityLabel={'Little Lemon logo and title'}
      />      
      <Text style={styles.headerText}>Let us get to know you</Text>
      <Text style={styles.regularText}>First Name</Text>
      <TextInput
        style={styles.input} 
        onChangeText={onChangeFirstName}
        placeholder='Enter your first name'
        value={firstName}
      />
      <Text style={styles.regularText}>Email</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeEmail}
        placeholder='Enter your email'
        value={email}
        keyboardType='email-address'
        textContentType='emailAddress'
      />      
      <Button 
        onPress={() => setUserToken('token')}
        disabled={!isEmailValid || !isNameValid}
        style={styles.button}        
      >
        <Text style={styles.buttonText}>
          Next
        </Text>
      </Button>     
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  logo: {
    height: 100,
    width: 300,
    resizeMode: 'contain',
    marginTop: 40,
  },
  headerText: {
    padding: 40,
    fontSize: 25,
    marginTop: 20,
    marginBottom: 20,
    color: '#495E57',
    textAlign: 'center',
  },
  regularText: {
    fontSize: 20,
    padding: 5,
    marginTop: 20,
    color: '#495E57',
    textAlign: 'center',
  },
  input: {
    height: 50,
    width: 300,
    borderWidth: 1.5,
    fontSize: 16,
    borderColor: '#495E57',
    borderRadius: 8,
    margin: 10,
    paddingLeft: 15,
  },
  button: {
    backgroundColor: '#c4ccd3',
    borderRadius: 8,
    width: 150,
    marginTop: 20,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 25,
  }
})