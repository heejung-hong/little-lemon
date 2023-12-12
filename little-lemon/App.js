import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboarding from './screens/Onboarding'
import HomeScreen from './screens/HomeScreen'

// Instantiate stack
const Stack = createNativeStackNavigator();


export default function App() {

  return (
    <NavigationContainer>      
      <Stack.Navigator>
        <Stack.Screen name='Welcome' component={Onboarding} />
        <Stack.Screen name='Home' component={HomeScreen} />      
      </Stack.Navigator>            
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});