import { View, Text, TouchableOpacity, Linking } from 'react-native'
import React from 'react'

export default function FlightInfo({flightdata}) {
  return (
    <View>
      <Text style={{fontSize:18,fontFamily:'tinos-bold'}}>✈️ Flights </Text>
      <Text style={{marginTop:5,fontSize:15,fontFamily:'playfair-semibold'}}>Airline : {flightdata?.airline}</Text>
      <Text style={{fontFamily:'playfair-semibold',marginTop:3,fontSize:15}}>Price: {flightdata.price}</Text>
      
      
    </View>
  )
}