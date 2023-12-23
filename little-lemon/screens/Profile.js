import * as React from 'react';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import { Button, Image, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { MaskedTextInput } from 'react-native-mask-text';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Onboarding from './Onboarding';
import Notifications from '../components/Notifications'

export default function Profile({ navigation, route, inputFirstName }) {  
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }



  const [lastNameInput, setLastNameInput] = useState('');
  const [userLastName, setUserLastName] = useState([]);

  useEffect(() => {
    // Populating userInfo from storage using AsyncStorage.multiGet
    (async () => {
      try {
        const userLastName = await AsyncStorage.getItem('userLastName');
        setUserLastName(userLastName === null ? [] : JSON.parse(userLastName));
      } catch (e) {}
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem('userLastName', JSON.stringify(userLastName));
      } catch (e) {}
    })();
  }, [userLastName]);



  const [phoneNumInput, setPhoneNumInput] = useState('');
  const [userPhoneNum, setUserPhoneNum] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const userPhoneNum = await AsyncStorage.getItem('userPhoneNum');
        setUserPhoneNum(userPhoneNum === null ? [] : JSON.parse(userPhoneNum));
      } catch (e) {}
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem('userPhoneNum', JSON.stringify(userPhoneNum));
      } catch (e) {}
    })();
  }, [userPhoneNum]);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.headerText}>Personal information</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
        <View style={{ width: 65, height: 65, borderRadius: 50, borderColor: '#2F4F4F', borderWidth: 1 }}>
          <Button 
            title='Pic'
            onPress={pickImage}
          />
          {image && <Image source={{ uri: image}} style={{ width: 65, height: 65 }} />}
        </View>
        <Pressable style={styles.changeBtn}>
          <Text style={styles.greenBtnText}>Change</Text>
        </Pressable>
        <Pressable style={styles.removeBtn}>
          <Text style={styles.whiteBtnText}>Remove</Text>
        </Pressable>
      </View>
      <View>
        <Text style={styles.text}>First name</Text>
        <View
          style={styles.inputBox}          
        >
          {/* {inputFirstName.map((inputFirstName) => (
          <Text>{inputFirstName}</Text>
          ))} */}
        </View>
        <Text style={styles.text}>Last name</Text>
        <TextInput
          style={styles.inputBox} 
          placeholder='Enter your last name'
          value={lastNameInput}
          onChangeText={
            (data) => setLastNameInput(data)                      
          }          
        />
        {userLastName.map((userLastName) => (
              <Text>{userLastName}</Text>
            ))}        
        <Text style={styles.text}>Email</Text>
        <TextInput
          style={styles.inputBox} 
          placeholder='Enter your email'
        />
        <Text style={styles.text}>Phone number</Text> 
        <MaskedTextInput
          style={styles.inputBox} 
          placeholder='Enter your phone number'
          mask="SSS-SSS-SSSS"
          onChangeText={() => {
            (text, rawText) => {
              console.log(text);
              console.log(rawText);
            };
            (data) => setPhoneNumInput(data);            
          }}
          value={phoneNumInput}
        />
        {userPhoneNum.map((userPhoneNum) => (
              <Text>{userPhoneNum}</Text>
            ))}
      </View>
      <View>
        <Text style={styles.headerText}>Email notifications</Text>
      </View>
      <Notifications />
      <View style={{ alignItems: 'center', justifyContent: 'space-evenly', margin: 10 }}>
        <Pressable 
          style={styles.logOutBtn}
          
        >
          <Text style={styles.yellowBtnText}>Log out</Text>
        </Pressable>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', margin: 5 }}>
        <Pressable style={styles.discardBtn}>
          <Text style={styles.whiteBtnText}>Discard changes</Text>
        </Pressable>
        <Pressable 
          onPress={() => {
            setUserLastName([...userLastName, lastNameInput]);
            setLastNameInput('');
            setUserPhoneNum([...userPhoneNum, phoneNumInput]);
            setPhoneNumInput('');
          }}
          style={styles.saveBtn}
        >
          <Text style={styles.greenBtnText}>Save changes</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  headerText: {
    paddingLeft: 25,
    paddingTop: 20,
    paddingBottom: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  text: {
    paddingLeft: 25,
    paddingTop: 15,
    paddingBottom: 5,
    fontSize: 14,
    color: 'black',
  },
  inputBox: {
    height: 35,
    width: 350,
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'grey',
    backgroundColor: 'white',
    alignSelf: 'center'
  },
  changeBtn: {
    backgroundColor: '#2F4F4F',
    width: 90,
    height: 35,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  removeBtn: {
    backgroundColor: 'white',
    width: 90,
    height: 35,
    borderColor: '#2F4F4F',
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logOutBtn: {
    backgroundColor: '#F4CE14',
    width: 350,
    height: 35,
    borderColor: '#EE9972',
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  discardBtn: {
    backgroundColor: 'white',
    width: 150,
    height: 35,
    borderColor: '#2F4F4F',
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  saveBtn: {
    backgroundColor: '#2F4F4F',
    width: 130,
    height: 35,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  whiteBtnText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2F4F4F',
  },
  greenBtnText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  yellowBtnText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
})