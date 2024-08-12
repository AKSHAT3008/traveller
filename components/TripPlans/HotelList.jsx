import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { GetPhotoRef } from '../../services/GooglePlaceApi';
import HotelCard from './HotelCard';

export default function HotelList({ hotellist }) {

 

 

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🏨 Hotel Recommendations</Text>
      <FlatList
        data={hotellist}
        showHorizontalScrollIndicator={false}
        horizontal={true}
        renderItem={({ item, index }) => (
          <HotelCard item = {item} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  header: {
    fontSize: 22,
    fontFamily:'tinos-bold',
    marginBottom: 10,
    marginTop:5,
  },
  card: {
    marginRight: 10,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 120,
  },
  infoContainer: {
    padding: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  rating: {
    fontSize: 14,
  },
  price: {
    fontSize: 14,
    color: 'green',
  },
});
