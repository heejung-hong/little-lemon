import * as React from 'react';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { 
  ActivityIndicator, 
  Alert, 
  // FlatList, 
  Image, 
  Pressable, 
  SafeAreaView,
  SectionList, 
  StatusBar, 
  StyleSheet, 
  Text, 
  View 
} from 'react-native';
import { Searchbar } from 'react-native-paper';
import debounce from 'lodash.debounce';
import { 
  createTable, 
  getMenuItems, 
  saveMenuItems, 
  filterByQueryAndCategories 
} from '../database';
import Filters from '../components/Filters';
import { getSectionListData, useUpdateEffect } from '../utils/utils';

const API_URL = 'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json';
const sections = ['Starters', 'Main', 'Deserts']

const Item = ({ name, price, description, image }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{name}</Text>
    <Text style={styles.title}>{description}</Text>
    <Text style={styles.title}>${price}</Text>
    <Image 
      source={{
        uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${image}?raw=true`,
      }}
    />
  </View>
);

export default function HomeScreen({ navigation }) {
  // const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [searchBarText, setSearchBarText] = useState('');
  const [query, setQuery] = useState('');
  const [filterSelections, setFilterSelections] = useState(sections.map(() => false));

  // const getMenu = async () => {
  //   try {
  //     // fetch method are Get requests
  //     // in React Native, fetch can make POST request to send data to server
  //     const response = await fetch(
  //       'https://raw.githubusercontent.com/heejung-hong/little-lemon/main/little-lemon/menu.json'
  //     );
  //     const json = await response.json();
  //     setData(json.menu);
  //     console.log(setData)
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   getMenu();
  // }, []);

  useEffect(() => {
    (async () => {
      try {
        // 1. Create table if it does not exist
        await createTable();
        // 2. Check if data was already stored
        let menuItems = await getMenuItems();

        if (!menuItems.length) {
          // Fetching menu from URL
          const response = await fetch(API_URL);
          const json = await response.json();
          menuItems = json.menu.map((item) => ({
            ...item,
            category: item.category.title,
          }));
          // Storing into database
          saveMenuItems(menuItems);
        }

        const sectionListData = getSectionListData(menuItems);
        setData(sectionListData);
      } catch (e) {
        // Handle error
        Alert.alert(e.message);
      }
    })();
  }, []);

  useUpdateEffect(() => {
    (async () => {
      const activeCategories = sections.filter((s, i) => {
        // If all filters are deselected, all categories are active
        if (filterSelections.every((item) => item === false)) {
          return true;
        }
        return filterSelections[i];
      });
      try {
        const menuItems = await filterByQueryAndCategories(
          query,
          activeCategories
        );
        const sectionListData = getSectionListData(menuItems);
        setData(sectionListData);
      } catch (e) {
        Alert.alert(e.message);
      }
    })();
  }, [filterSelections, query]);

  const lookup = useCallback((q) => {
    setQuery(q);
  }, []);

  const debouncedLookup = useMemo(() => debounce(lookup, 500), [lookup]);

  const handleSearchChange = (text) => {
    setSearchBarText(text);
    debouncedLookup(text);
  };

  const handleFiltersChange = async (index) => {
    const arrayCopy = [...filterSelections];
    arrayCopy[index] = !filterSelections[index];
    setFilterSelections(arrayCopy);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <Image 
          style={styles.logo} 
          source={require('../assets/Logo.png')}
          accessible={true}
          accessibilityLabel={'Little Lemon logo and title'}
        />
        <Pressable onPress={() => navigation.navigate('Profile')} >
        <View style={{ width: 65, height: 65, borderRadius: 50, borderColor: '#2F4F4F', borderWidth: 1, justifyContent: 'flex-end' }}>
        <Text>Profile</Text>
        </View>
        </Pressable>
      </View>      
      <View style={{ backgroundColor: '#2F4F4F' }}>
        <Text         
        style={styles.headerText}>Little Lemon
        </Text>
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
        <Searchbar
          placeholder="Search"
          placeholderTextColor="white"
          onChangeText={handleSearchChange}
          value={searchBarText}
          style={styles.searchBar}
          iconColor="white"
          inputStyle={{ color: 'white' }}
          elevation={0}
        />
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
        <Filters
          selections={filterSelections}
          onChange={handleFiltersChange}
          sections={sections}
        />
        <SectionList
          style={styles.sectionList}
          sections={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Item 
              name={item.name} 
              price={item.price}
              description={item.description}
              image={item.image} 
            />
          )}
          renderSectionHeader={({ section: { name } }) => (
            <Text style={styles.header}>{name}</Text>
          )}
        />
      </View>
      {/* <View>
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
      </View> */}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  logo: {
    height: 100,
    width: 200,
    resizeMode: 'contain',
    justifyContent: 'center'
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
  sectionList: {
    paddingHorizontal: 16,
  },
  searchBar: {
    marginBottom: 24,
    backgroundColor: '#495E57',
    shadowRadius: 0,
    shadowOpacity: 0,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    paddingVertical: 8,
    color: '#FBDABB',
    backgroundColor: '#495E57',
  },
  title: {
    fontSize: 20,
    color: 'white',
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
