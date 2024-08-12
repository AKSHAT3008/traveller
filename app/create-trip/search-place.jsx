import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { useNavigation, useRouter } from 'expo-router';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { CreateTripContext } from './../../context/CreateTripContext';
import SelectTraveller from './select-traveller';

export default function SearchPlace() {

    const navigation = useNavigation();
    const {tripData,setTripData} = useContext(CreateTripContext);
    const router=useRouter();
    useEffect(() => {
        navigation.setOptions({
          headerShown: true,
          headerTransparent:true,
          headerTitle: 'Search',
          
          
        });
    }, []);
    useEffect(()=>{
        console.log(tripData);
    }),[tripData]
  return (
    <View style={{
        padding:10,
        paddingTop:75,
        backgroundColor:"#90c2d1",
        height:"100%"
    }}>
      <GooglePlacesAutocomplete
      placeholder='Search Place'
      fetchDetails={true}
      
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
        setTripData({
            locationInfo:{
                name:data.description,
                coordinates:details?.geometry.location,
                photoRef:details?.photos[0]?.photo_reference,
                url:details?.url
            }
        })
      }}
      query={{
        key: process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
        language: 'en',
      }}

      styles={{
        textInputContainer:{
            borderWidth:1,
            borderRadius:8,
            marginTop:28,
            padding:3,
            backgroundColor:'white',
            
        }
      }}
    />
    <TouchableOpacity
      onPress={() => router.replace('create-trip/select-traveller')}
      style={{
        padding:10,
        backgroundColor:"#9c4646",
        borderRadius:15,
        marginTop:10,
        marginHorizontal:10

      }}>
        <Text style={{
            textAlign:'center',
            color:'white',
            fontFamily:'tinos-bold',
            fontSize:20

        }}>Next</Text>
      </TouchableOpacity>
    
    
    </View>
  )
}