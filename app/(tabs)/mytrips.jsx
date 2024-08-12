import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Entypo from '@expo/vector-icons/Entypo';
import StartNewTrip from '../../components/MyTrips/StartNewTrip';
import { useRouter } from 'expo-router';
import { auth, db } from './../../configs/FirebaseConfig';
import UserTripList from '../../components/MyTrips/UserTripList';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function MyTrip() {

    const [userTrips,setUserTrips] = useState([]);
    const router = useRouter();
    const [loading,setLoading] = useState(false);

    const user = auth.currentUser;


    useEffect(()=>{
      user&&GetMyTrips();
    },[user])
    const GetMyTrips=async()=>{
      setLoading(true);
      setUserTrips([])
      const q = query(collection(db,'UserTrips'),where('userEmail','==',user?.email))
      const querySnapshot = await getDocs(q)

      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        setUserTrips(prev=>[...prev,doc.data()])
      });
      setLoading(false);
      
    }

  return (
    <ScrollView style={{
        padding:25,
        paddingTop:55,
        backgroundColor:"#f5ebc6",
        height:"100%"

    }}>
        
        <View style={{
            display:'flex',
            flexDirection:'row',
            alignContent:'center',
            justifyContent:'space-between',

        }}>
      <Text style={{
        fontFamily:"playfair-black",
        fontSize:30,
        }}>
        My trips
        </Text>
        <TouchableOpacity onPress={() =>router.push('/create-trip/search-place')}>
        <Entypo name="plus" size={40} color="black" style={{paddingTop:8}} />
        </TouchableOpacity>
        
        </View>
        {loading && <ActivityIndicator size={'large'} color="#3E798B"/>}
        {userTrips?.length == 0?
        <StartNewTrip/>:
        <UserTripList userTrips={userTrips}/>}
    </ScrollView  >
  )
}