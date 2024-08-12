import { View, Text, FlatList, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { SelectTravelerList } from './../../constants/Options';
import OptionCard from '../../components/CreateTrip/OptionCard';
import { CreateTripContext } from '../../context/CreateTripContext';

export default function SelectTraveller() {
    
    const[selectTraveler,setSelectTraveler] = useState();
    const {tripData,setTripData} = useContext(CreateTripContext);
    const router=useRouter();

    useEffect(() =>{
        setTripData({...tripData,
            travelerCount:selectTraveler
        })
    },[selectTraveler])

    
    
  return (
    <View style={{
        padding:3,
        paddingBottom:80,
        borderWidth:2,
        backgroundColor:"#edc945",
        borderRadius:10,
        height:'100%'
    }}>
      <Text style={{
        fontFamily:'tinos-bold',
        fontSize:25,
        textAlign:'center',
        padding:10,
        marginTop:90,

      }}

      >Who's Travelling?</Text>
      <FlatList
      data={
        SelectTravelerList
      }
      renderItem={({item,index})=>(
        <TouchableOpacity 
        onPress={()=>
            setSelectTraveler(item)
        }
        style={{
            
            marginVertical:5,
            borderRadius:10, 
            padding:3,
            marginHorizontal:10
        }}>
            <OptionCard option={item} selectOption={selectTraveler}/>
        </TouchableOpacity>
      )}></FlatList>
      <TouchableOpacity 
      onPress={() => router.replace('create-trip/SelectDates')}
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