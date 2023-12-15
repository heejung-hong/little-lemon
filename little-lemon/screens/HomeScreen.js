import * as React from 'react';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMenu = async () => {
    try {
      // fetch method are Get requests
      // in React Native, fetch can make POST request to send data to server
      const response = await fetch(
        'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json'
      );
      const json = await response.json();
      setData(json.menu);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMenu();
  }, []);

  return (
    <SafeAreaView style={styles.main}>
      <View>
        <Text style={styles.headerText}>Little Lemon</Text>
        <Text>Chicago</Text>
        <Text>
          We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
        </Text>
      </View>
      <View>
        <Text>ORDER FOR DELIVERY!</Text>
      </View>
      <View>
        <Pressable><Text>Starters</Text></Pressable>
        <Pressable><Text>Mains</Text></Pressable>
        <Pressable><Text>Desserts</Text></Pressable>
        <Pressable><Text>Drinks</Text></Pressable>
      </View>
      <View>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View>
                <Text>{item.name}</Text>
                <Text>{item.description}</Text>
                <Text>{'$' + item.price}</Text>
                <Image source={{ uri: item.imageUrl }} style={{ width: 100, height: 100 }} />
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1
  },
  headerText: {
    padding: 40,
    fontSize: 25,
    color: '#495E57',
    textAlign: 'center',
  }
})
