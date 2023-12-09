import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboarding from './screens/Onboarding'
import HomeScreen from './screens/HomeScreen';

// Instantiate stack
const Stack = createNativeStackNavigator();

export default function App() {

  if (state.isLoading) {
    // If the reading from AsyncStorage haven't been read yet.
    return <SplashScreen />
  }

  return (
    <NavigationContainer>      
      <Stack.Navigator initialRouteName='Onboarding'>
        {state.isOnboardingCompleted ? (
          // Onboarding completed, user is signed in
          <Stack.Screen name='Home' component={HomeScreen} />
        ) : (
          // If user is NOT signed in
          <Stack.Screen name='Welcome' component={Onboarding} />
        )}        
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
