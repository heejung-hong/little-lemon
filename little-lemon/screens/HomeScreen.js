import * as React from 'react';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { 
  Alert, 
  Image, 
  Pressable, 
  SafeAreaView,
  SectionList, 
  StatusBar, 
  StyleSheet, 
  Text, 
  View 
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
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

const API_URL = 'https://raw.githubusercontent.com/heejung-hong/little-lemon/main/little-lemon/menu.json';
const sections = ['Starters', 'Main', 'Deserts']

const Item = ({ name, price, description, image }) => (
  <View style={styles.dish}>
    <View>
      <Text style={styles.dishName}>{name}</Text>
      <Text style={styles.dishDescription}>{description}</Text>
      <Text style={styles.dishPrice}>${price}</Text>
    </View>
    <View style={{ border: 'black' }}>
      <Image source={{ uri: `https://github.com/heejung-hong/little-lemon/blob/main/little-lemon/assets/${image}?raw=true` }} style={styles.image} />
    </View>    
  </View>
);

export default function HomeScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [searchBarText, setSearchBarText] = useState('');
  const [query, setQuery] = useState('');
  const [filterSelections, setFilterSelections] = useState(sections.map(() => false));

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
        // console.log(menuItems)
        const sectionListData = getSectionListData(menuItems);
        setData(sectionListData);
      } catch (e) {
        // Handle error
        Alert.alert(e.message);
      }
    })();
  }, []);

  // custom useEffect hook that runs on updates
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
      <View style={{flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <View style={{ height: 80, width: 50 }}></View>
        <Image 
          style={styles.logo} 
          source={require('../assets/Logo.png')}
          accessible={true}
          accessibilityLabel={'Little Lemon logo and title'}
        />
        <Pressable 
          onPress={() => navigation.navigate('Profile')} 
          style={{ height: 80, width: 50, alignItems: 'center', justifyContent: 'center' }}
        >
          <FontAwesome5 name="user-circle" size={40} color="#2F4F4F" />
        </Pressable>
      </View>      
      <View style={{ backgroundColor: '#2F4F4F' }}>
        <View>
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
            placeholderTextColor="#2F4F4F"
            onChangeText={handleSearchChange}
            value={searchBarText}
            style={styles.searchBar}
            iconColor="#2F4F4F"
            inputStyle={{ color: '#2F4F4F' }}
            elevation={0}
          />
        </View>          
      </View>      
      <Filters
        selections={filterSelections}
        onChange={handleFiltersChange}
        sections={sections}
      />      
      <SectionList
        sections={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Item name={item.name} description={item.description} price={item.price} image={item.image} />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
      />      
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: StatusBar.currentHeight,
  },
  logo: {
    height: 80,
    width: 200,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
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
  searchBar: {
    marginBottom: 14,
    marginHorizontal: 15,
    backgroundColor: 'white',
    shadowRadius: 0,
    shadowOpacity: 0,
    height: 50,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingVertical: 8,
    marginLeft: 15,
    color: '#F4CE14',
    backgroundColor: 'white'
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
    margin: 15,
    borderRadius: 10
  }
})
