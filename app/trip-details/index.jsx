import { View, Text, Image, ToastAndroid, ScrollView, TouchableOpacity, Linking } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import moment from 'moment';
import FlightInfo from '../../components/TripPlans/FlightInfo';
import HotelList from '../../components/TripPlans/HotelList';
import Itinerary from '../../components/TripPlans/Itinerary';

export default function TripDetails() {
    const navigation = useNavigation();
    const { trip } = useLocalSearchParams();
    const [tripDetails, setTripDetails] = useState(null);

    const parseTrip = (data) => {
        try {
            return typeof data === 'string' ? JSON.parse(data) : data;
        } catch (error) {
            console.error('Failed to parse trip data:', error);
            return null;
        }
    };

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: '',
        });

        if (trip) {
            const parsedTrip = parseTrip(trip);
            if (parsedTrip) {
                setTripDetails(parsedTrip);
            } else {
                console.error('Invalid trip data');
            }
        } else {
            console.error('Trip data is undefined or null.');
        }
    }, [trip]);

    const openBookingURL = () => {
        const bookingURL = tripDetails?.tripPlan?.trip?.flights?.booking_url;
        if (bookingURL) {
            Linking.openURL(bookingURL).catch(err => console.error("Couldn't load page", err));
        } else {
            ToastAndroid.show('Booking URL not found.', ToastAndroid.LONG);
        }
    };

    return tripDetails ? (
        <ScrollView>
            <View>
                <Image
                    source={{
                        uri: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference='
                            + parseTrip(tripDetails?.tripData).locationInfo?.photoRef
                            + '&key=' + process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY
                    }}
                    style={{
                        width: '100%',
                        height: 330,
                    }}
                />

                <View style={{
                    padding: 15,
                    backgroundColor: '#f5ebc6',
                    height: '100%',
                    marginTop: -30,
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                }}>
                    <View style={{
                        padding: 8,
                        borderRadius: 5,
                        backgroundColor: '#9c4646'
                    }}>
                        <Text style={{
                            fontFamily: 'playfair-black',
                            fontSize: 20,
                            color: 'white'
                        }}>{tripDetails?.tripPlan?.trip?.location}</Text>

                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>
                            <View style={{
                                display: 'flex',
                                flexDirection: 'row',
                            }}>
                                <Text style={{
                                    fontFamily: 'mukta-semibold',
                                    fontSize: 17,
                                    marginTop: 7,
                                }}>
                                    {moment(parseTrip(tripDetails?.tripData).startDate).format('DD MMM YYYY')} -
                                </Text>
                                <Text style={{
                                    fontFamily: 'mukta-semibold',
                                    fontSize: 17,
                                    marginTop: 7,
                                    marginLeft: 5,
                                }}>
                                    {moment(parseTrip(tripDetails?.tripData).endDate).format('DD MMM YYYY')}
                                </Text>
                            </View>
                            <View style={{
                                marginTop: 7,
                            }}>
                                <Text style={{
                                    fontFamily: 'mukta-semibold',
                                    fontSize: 17,
                                }}>
                                    {parseTrip(tripDetails?.tripData).travelerCount?.icon}
                                    {parseTrip(tripDetails?.tripData).travelerCount?.title}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={{
    borderRadius: 8,
    marginTop: 10,
    padding: 10,
    flexDirection: 'column', // Stack flight details and button vertically
    backgroundColor: '#fcba03', // Background color of the main container
    shadowColor: '#000', // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
    shadowOpacity: 0.25, // Shadow opacity for iOS
    shadowRadius: 3.84, // Shadow radius for iOS
    elevation: 5, // Elevation for Android
}}>
    <View style={{ 
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#f5ebc6',
        flexWrap: 'wrap', // Allow contents to wrap to the next line
        shadowColor: '#000', // Shadow color for iOS
        shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
        shadowOpacity: 0.5, // Shadow opacity for iOS
        shadowRadius: 3.84, // Shadow radius for iOS
        elevation: 30, // Elevation for Android
    }}>
        {tripDetails?.tripPlan?.trip?.flights?.options?.map((flight, index) => (
            <View key={index} style={{ width: '48%', marginBottom: 10 }}> 
                <FlightInfo flightdata={flight} />
            </View>
        ))}
    </View>

    <TouchableOpacity 
        onPress={openBookingURL} 
        style={{
            marginTop: 10, // Space between flights and button
            borderRadius: 8,
            backgroundColor: '#9c4646',
            padding: 10, 
            alignSelf: 'center',
            width: '100%',
            shadowColor: '#000', // Shadow color for iOS
            shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
            shadowOpacity: 0.25, // Shadow opacity for iOS
            shadowRadius: 3.84, // Shadow radius for iOS
            elevation: 50, // Elevation for Android
        }}
    >
        <Text style={{ 
            textAlign: 'center',
            fontSize: 18,
            fontFamily: 'gupter-bold',
            color: 'white' 
        }}>Book here</Text>
    </TouchableOpacity>
</View>





                    <HotelList hotellist={tripDetails?.tripPlan?.trip?.hotels} />

                    <Itinerary details={tripDetails?.tripPlan?.trip?.itinerary} />
                    <View></View>
                </View>
            </View>
            <View></View>
        </ScrollView>
    ) : (
        <View>
            <Text>Loading trip details...</Text>
        </View>
    );
}
