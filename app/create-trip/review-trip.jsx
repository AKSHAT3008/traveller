import { View, Text,TouchableOpacity} from 'react-native'
import React, { useContext, useEffect } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { CreateTripContext } from '../../context/CreateTripContext';
import moment from 'moment';

export default function ReviewTrip() {

    const navigation = useNavigation();
    const {tripData,settripData} = useContext(CreateTripContext);
    const router = useRouter();

    useEffect(() => {
        navigation.setOptions({
          headerShown: true,
          headerTransparent: true,
          headerTitle: '',
        });
      }, []);
  return (
    <View style={{
        backgroundColor:'#f5ebc6',
        height:'100%',
        padding:25,
        paddingTop:75
    }}>
      <Text style={{
        fontSize: 35,
        fontFamily:'mukta-bold',
        marginTop:20
      }}>Review Trip</Text>
      <View>
        <Text style={{
            fontFamily:'mukta',
            fontSize:15
        }}>
            Before generating your ideal trip, please review the selections
        </Text>
      </View>

        <View style={{
            backgroundColor:'#edc945',
            padding:5,
            width:'100%',
            marginTop:20,
            borderRadius:10,
            paddingBottom:15,
            borderWidth:2,
            
        }}>
      <View style={{
        display:'flex',
        flexDirection:'row',
        marginTop:25,
        marginLeft:10,
        gap:20
      }}>
      <Entypo name="location-pin" size={30} color="black" />
      <View>
      <Text style={{
        fontFamily:'mukta-bold',
        fontSize:20
      }}>Destination</Text>
      <Text>{tripData?.locationInfo?.name}</Text>
      </View>
      </View>

      <View style={{
        display:'flex',
        flexDirection:'row',
        marginTop:25,
        marginLeft:10,
        gap:20
      }}>
      <Ionicons name="person" size={25} color="black" />
      <View>
        <Text  style={{
        fontFamily:'mukta-bold',
        fontSize:20
      }}>Travellers</Text>
        <Text>{tripData?.travelerCount?.title}</Text>
      </View>
      </View>

      <View style={{
        display:'flex',
        flexDirection:'row',
        marginTop:25,
        marginLeft:10,
        gap:20
      }}>
      <MaterialCommunityIcons name="calendar-check" size={30} color="black" />
      <View>
        <Text  style={{
        fontFamily:'mukta-bold',
        fontSize:20
      }}>Travel Date</Text>
        <Text>{moment(tripData.startDate).format('DD MMM') +" - "+ moment(tripData.endDate).format('DD MMM')+ " "}
            ({tripData?.totalNoOfDays} days)
        </Text>
      </View>
      </View>
      
      <View style={{
        display:'flex',
        flexDirection:'row',
        marginTop:25,
        marginLeft:10,
        marginLeft:15,
        gap:32
      }}>
      <FontAwesome name="dollar" size={30} color="black" style={{marginTop:5}} />
      <View>
        <Text  style={{
        fontFamily:'mukta-bold',
        fontSize:20
      }}>
            Budget
        </Text>
        <Text>
        {tripData?.budget}
        </Text>
      </View>
      </View>
      </View>
      <TouchableOpacity 
    onPress={()=>router.replace('/create-trip/generate-trip')}
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
  )
}