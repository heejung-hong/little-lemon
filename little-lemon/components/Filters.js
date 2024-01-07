import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const Filters = ({ onChange, selections, sections }) => {
  return (
    <View style={styles.filtersContainer}>
      {sections.map((section, index) => (
        <TouchableOpacity
          onPress={() => {
            onChange(index);
          }}
          style={{           
            backgroundColor: selections[index] ? '#EE9972' : 'lightgrey',
            marginHorizontal: 15,         
            padding: 10,
            height: 35,
            width: 90,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          <View>
            <Text style={{ 
              color: selections[index] ? 'white' : '#2F4F4F',
              fontSize: 14,
              fontWeight: 'bold',
            }}>
              {section}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  filtersContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-evenly', 
    marginBottom: 20
  },
});

export default Filters;
