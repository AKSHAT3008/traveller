import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GetPhotoRef } from '../../services/GooglePlaceApi';

export default function ItineraryCard({place}) {

    const getTimeEmoji = (time) => {
        switch (time.toLowerCase()) {
          
          case 'morning':
            return '🌅'; // Morning
          case 'afternoon':
            return '☀️'; // Afternoon
          case 'evening':
            return '🌇'; // Evening
          case 'night':
            return '🌙'; // Night
          default:
            return '🕒'; // Default emoji if time doesn't match
        }
      };

      

  return (
    <View style={{
        
        borderRadius:8,
        padding:10,
        margin:10,
        backgroundColor:'#f5ebc6',
        shadowColor: '#000', // Shadow color for iOS
        shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
        shadowOpacity: 0.25, // Shadow opacity for iOS
        shadowRadius: 3.84, // Shadow radius for iOS
        elevation: 50, 
        
      }}>
        
        
        <Text style={{
          fontFamily:'mukta-bold',
          fontSize: 18,
        }}>-{place?.name}</Text>
        <Text style={{
          fontFamily:'tinos-bold',
          fontSize: 17,
        }}>{getTimeEmoji(place?.time)} {place?.time}</Text>
        <Text style={{
          marginTop:5
        }}> {place?.description}</Text>
        
      </View>
  )
}