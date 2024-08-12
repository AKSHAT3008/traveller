import { View, Text, Image } from 'react-native'
import React from 'react'
import ItineraryCard from './ItineraryCard';

export default function Itinerary({ details }) {

  

  return (
    <View>
      <Text style={{
        fontSize: 20,
        
        fontFamily:'tinos-bold'
      }}>🏕️ Itinerary</Text>
    {Object.entries(details).reverse().map(([day,details]) => (
      <View style={{
        
        borderRadius:8,
        padding:10,
        margin:10,
        backgroundColor:'#fcba03',
        shadowColor: '#000', // Shadow color for iOS
        shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
        shadowOpacity: 0.25, // Shadow opacity for iOS
        shadowRadius: 3.84, // Shadow radius for iOS
        elevation: 50, 
        
      }}>
        <Text style={{
          fontFamily:'tinos-bold',
          fontSize: 20,
          textAlign:'center'
          
          
        }}>{day.charAt(0).toUpperCase()+day.slice(1)}</Text>
        {details.activities.map((place,index) => (
          <ItineraryCard place={place}/>
        ))}
      </View>
    ))}
      
    </View>
  )
}

