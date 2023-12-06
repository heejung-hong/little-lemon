import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';



export default function Onboarding() {
  // declare the variables
  const [firstName, onChangeFirstName] = useState('');
  const [email, onChangeEmail] = useState('');

  return (
    <View>
      <Image style={styles.logo} source={require('../assets/Logo.png')} />
      <Text>Let us get to know you</Text>
      <Text>First Name</Text>
      <TextInput
        style={styles.input} 
        onChangeText={onChangeFirstName}
        placeholder='first name'
        value={firstName}
      />
      <Text>Email</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeEmail}
        placeholder='email'
        value={email}
      />
      <Pressable
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          Next
        </Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    marginTop: 25,
    backgroundColor: '#fff'
  },
  logo: {
    height: 100,
    width: 300,
    resizeMode: 'contain'
  },
  input: {
    height: 50,
    width: 300,
    borderWidth: 1,
    fontSize: 16,
    borderColor: 'black',
    borderRadius: 8,
    padding: 15
  },
  button: {
    padding: 10,
    backgroundColor: 'grey',
    borderRadius: 10
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 25,
  }
})