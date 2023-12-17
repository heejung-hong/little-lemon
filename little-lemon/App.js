import * as React from 'react';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SQLite from 'expo-sqlite';
import Onboarding from './screens/Onboarding'
import HomeScreen from './screens/HomeScreen'
import Profile from './screens/Profile';

// Instantiate stack
const Stack = createNativeStackNavigator();

function SplashScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Getting token...</Text>
      <ActivityIndicator size="large" />
    </View>
  );
}

const getIsSignedIn = () => {
  // custom logic
  return false;
};

export default function App({ navigation }) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);
  const isSignedIn = getIsSignedIn();

  const getUserToken = async () => {
    // testing purposes
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    try {
      // custom logic
      await sleep(2000);
      const token = null;
      setUserToken(token);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    getUserToken();
  }, []);

  if (isLoading) {
    // We haven't finished checking for the token yet
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName='Welcome'
      >
        {userToken == null ? (
          <>
            <Stack.Screen 
              name='Welcome' 
              component={Onboarding} options={{ title: 'Sign in', headerShown: false }}
              initialParams={{ setUserToken }}
            />            
          </>
        ) : (
          <>
            <Stack.Screen name='Home' component={HomeScreen} options={{ headerShown: false }} />        
            <Stack.Screen name='Profile' component={Profile} options={{ headerShown: false }} />
          </>
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