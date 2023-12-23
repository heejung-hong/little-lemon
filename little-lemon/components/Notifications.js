import * as React from 'react';
import { useState } from 'react';
import Checkbox from 'expo-checkbox';
import { StyleSheet, Text, View } from 'react-native';

export default function Notifications() {
  const [isOrder, setOrder] = useState(false);
  const [isChanges, setChanges] = useState(false);
  const [isSpecial, setSpecial] = useState(false);
  const [isNewsletter, setNewsletter] = useState(false);

  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 25 }}>
        <Checkbox 
          value={isOrder}
          onValueChange={setOrder}
          color={isOrder ? '#2F4F4F' : undefined }
        />
        <Text style={styles.text}>Order statuses</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 25 }}>
        <Checkbox 
          value={isChanges}
          onValueChange={setChanges}
          color={isChanges ? '#2F4F4F' : undefined }
        />
        <Text style={styles.text}>Password changes</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 25 }}>
        <Checkbox 
          value={isSpecial}
          onValueChange={setSpecial}
          color={isSpecial ? '#2F4F4F' : undefined }
        />
        <Text style={styles.text}>Special offers</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 25 }}>
        <Checkbox 
          value={isNewsletter}
          onValueChange={setNewsletter}
          color={isNewsletter ? '#2F4F4F' : undefined }
        />
        <Text style={styles.text}>Newsletter</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    paddingLeft: 25,
    paddingTop: 15,
    paddingBottom: 5,
    fontSize: 14,
    color: 'black',
  },
})

