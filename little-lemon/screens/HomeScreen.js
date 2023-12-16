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
        'https://raw.githubusercontent.com/heejung-hong/little-lemon/main/little-lemon/menu.json'
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
    <View style={styles.container}>
      <View style={{ backgroundColor: '#2F4F4F' }}>
        <Text style={styles.headerText}>Little Lemon</Text>
        <View style={{ flexDirection: 'row' }}>
          <View>
            <Text style={styles.chicago}>Chicago</Text>
            <Text style={styles.summary}>
              We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
            </Text>
          </View>
          <View>
            <Image source={require('../assets/HeroImage.png')} style={styles.hero} />
          </View>
        </View>
      </View>
      <View>
        <Text style={styles.delivery}>ORDER FOR DELIVERY!</Text>
      </View>
      <View style={styles.category}>
        <Pressable style={styles.categoryBtn}>
          <Text style={styles.categoryText}>Starters</Text>
        </Pressable>
        <Pressable style={styles.categoryBtn}>
          <Text style={styles.categoryText}>Mains</Text>
        </Pressable>
        <Pressable style={styles.categoryBtn}>
          <Text style={styles.categoryText}>Desserts</Text>
        </Pressable>
        <Pressable style={styles.categoryBtn}>
          <Text style={styles.categoryText}>Drinks</Text>
        </Pressable>
      </View>
      <View>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.dish}>
                <View>
                  <Text style={styles.dishName}>{item.name}</Text>
                  <Text style={styles.dishDescription}>{item.description}</Text>
                  <Text style={styles.dishPrice}>{'$' + item.price}</Text>
                </View>
                <View>
                  <Image source={{ uri: item.image }} style={styles.image} />
                </View>
              </View>
            )}
          />
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerText: {
    fontSize: 45,
    fontWeight: 'bold',
    color: '#F4CE14',
    marginLeft: 15,
    marginTop: 10,
  },
  chicago: {
    color: 'white', 
    fontSize: 25, 
    marginLeft: 15,
  },
  summary: {
    color: 'white', 
    fontSize: 16, 
    width: 190, 
    margin: 15
  },
  hero: {
    width: 150, 
    height: 150, 
    borderRadius: 25, 
    margin: 7
  },
  delivery: {
    color: 'black', 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginLeft: 15, 
    marginTop: 20, 
    marginBottom: 10
  },
  category: {
    flexDirection: 'row', 
    justifyContent: 'space-evenly', 
    marginBottom: 20
  },
  categoryBtn: {
    backgroundColor: 'lightgrey',
    padding: 10,
    height: 35,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  categoryText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2F4F4F',
  },
  dish: {
    flexDirection: 'row',
    borderTopColor: 'lightgrey', 
    borderTopWidth: 1, 
    marginHorizontal: 15,
    alignItems: 'center'
  },
  dishName: {
    color: 'black', 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginVertical: 10
  },
  dishDescription: {
    color: '#2F4F4F', 
    fontSize: 18, 
    marginVertical: 5, 
    width: 245,
    height: 50,
    overflow: 'scroll'
  },
  dishPrice: {
    color: '#2F4F4F', 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginVertical: 5
  },
  image: {
    width: 100, 
    height: 100,
    margin: 15
  }
})
