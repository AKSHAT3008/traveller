import { View, Text } from 'react-native'
import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function StartNewTrip() {
  return (
    <View style={{
        padding:20,
        marginTop:50,
        display:'flex',
        alignItems:'center',
        gap:15 
    }}>
        <FontAwesome name="map-o" size={30} color="black" />
      <Text style={{
        fontSize:25,
        fontFamily:'mukta-medium'
      }}>No trips added yet</Text>

<View style={{
    display:'flex',
    flexDirection:'row'
}}>
<Text style={{
        fontSize:20,
        fontFamily:'mukta-medium',
        color:"#9a9c9a",
        paddingRight:10
      }}>Start a new Trip</Text>
      <FontAwesome name="paper-plane" size={24} color="black" />
      </View>
      
    </View>
  )
}