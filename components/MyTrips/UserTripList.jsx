import { View, Text, Image, TouchableOpacity,ScrollView } from 'react-native'
import React from 'react'
import UserTripCard from './UserTripCard'
import moment from 'moment'
import { useRouter } from 'expo-router';



export default function UserTripList({userTrips}) {
    const LatestTrip = JSON.parse(userTrips[0].tripData);
    const router = useRouter();
    
  return (
    <ScrollView>
      <View style={{
        marginTop:20,
      }}>
        {LatestTrip?.locationInfo?.photoRef?<Image source={{uri:'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference='+LatestTrip.locationInfo?.photoRef+'&key='+process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}}
        style={{
            width:'100%',
            height:240,
            objectFit:'cover',
            borderRadius:15
        }}/>:<Image style={{
            width:'100%',
            height:240,
            objectFit:'cover',
            borderRadius:15
        }} source={require('./../../assets/images/Login.jpg')}/>}
        <View style={{
            marginTop:10
        }}>
            <Text style={{
                fontFamily:'mukta-medium',
                fontSize:18,
            }}>
                {userTrips[0]?.tripPlan?.trip?.location}
            </Text>
            <View style={{
                display:'flex',
                flexDirection:'row',
                marginTop:5,
                justifyContent:'space-between'
            }}>
            <Text style={{
                fontFamily:'mukta',
                fontSize:16,
            }}>{moment(LatestTrip.startDate).format('DD MMM YYYY')}</Text>
            <Text style={{
                fontFamily:'mukta',
                fontSize:16,
            }}>
                {LatestTrip.travelerCount.icon}
                {LatestTrip.travelerCount.title}
            </Text>
            </View>
            <TouchableOpacity 
    onPress={()=>router.push({pathname:'/trip-details',params:{
      trip:JSON.stringify(userTrips[0])
    }})}
    style={{
      padding:10,
      backgroundColor:"#9c4646",
      borderRadius:15,
      marginTop:25,
      marginRight:3,

    }}>
      <Text style={{
          textAlign:'center',
          color:'white',
          fontFamily:'tinos-bold',
          fontSize:20

      }}>Build My Trip</Text>
    </TouchableOpacity>
        </View>
      {userTrips.map((trip,index)=>(
        <TouchableOpacity 
        onPress={()=>router.push({pathname:'/trip-details',params:{
          trip:JSON.stringify(trip)
        }})}>
        <View>
            <UserTripCard trip={trip} key={index}/>
        </View>
      </TouchableOpacity>
      ))}

      </View>
    </ScrollView>
  )
}