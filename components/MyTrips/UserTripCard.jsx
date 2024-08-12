import { View, Text, Image, ScrollView } from 'react-native'
import React from 'react'
import moment from 'moment'

export default function UserTripCard({ trip }) {

  const formatData = (data) => {
    return JSON.parse(data);
  }

  const tripData = formatData(trip.tripData);
  const travelerCount = tripData?.travelerCount;

  return (
    <ScrollView>
    <View style={{
      marginTop: 20,
      display: 'flex',
      flexDirection: 'row',
      gap: 10,
      alignItems: 'center'
    }}>
      <Image source={{ uri: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=' + tripData.locationInfo?.photoRef + '&key=' + process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY }}
        style={{
          width: 100,
          height: 100,
          borderRadius: 15
        }} />
      <View>
        <Text style={{
          fontFamily: 'mukta-medium',
          fontSize: 18,
        }}>{trip.tripPlan?.trip?.location}</Text>
        <Text style={{
          fontFamily: 'mukta',
          fontSize: 16,
        }}>{moment(tripData.startDate).format('DD MMM YYYY')}</Text>
        <Text style={{
          fontFamily: 'mukta',
          fontSize: 16,
        }}> Travellers : 
          {travelerCount ? ` ${travelerCount.icon} ${travelerCount.title}` : 'N/A'}
        </Text>
      </View>
    </View>
    </ScrollView>
  )
}
