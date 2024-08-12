import { View, Text,FlatList, TouchableOpacity} from 'react-native'
import React, { useContext, useState,useEffect } from 'react'
import { useRouter,useNavigation } from 'expo-router';
import { SelectBudgetList } from './../../constants/Options';
import { CreateTripContext } from '../../context/CreateTripContext';
import OptionCard from '../../components/CreateTrip/OptionCard';

export default function SelectBudget() {

  const[selectOption,setSelectOption] = useState();
    const {tripData,setTripData} = useContext(CreateTripContext);
    const router=useRouter();
    const navigation = useNavigation();

    useEffect(() => {
      navigation.setOptions({
        headerShown: true,
        headerTransparent: true,
        headerTitle: 'Budget',
      });
    }, []);

     useEffect(() =>{
      selectOption && setTripData({...tripData,
          budget:selectOption?.title
          
      })
  },[selectOption])

  const onClickContinue=()=>{
    if(!selectOption){
      ToastAndroid.show('Select your budget',ToastAndroid.LONG)
      return;
    }
    router.push('/create-trip/review-trip')
  }

  return (
    <View style={{
      paddingTop:100,
      backgroundColor:"#edc945",
      paddingBottom:10,
      height:"100%"
  }}>
    <Text style={{
      fontFamily:'tinos-bold',
      fontSize:25,
      textAlign:'center',
      padding:10

    }}

    > Select your Budget</Text>
    <FlatList
    data={
      SelectBudgetList
    }
    renderItem={({item,index})=>(
      <TouchableOpacity 
      onPress={()=>
          setSelectOption(item)
      }
      style={{
          
          marginVertical:5,
          borderRadius:10,
          padding:3,
          marginHorizontal:10
      }}>
          <OptionCard option={item} selectOption={selectOption}/>
      </TouchableOpacity>
    )}></FlatList>
    <TouchableOpacity 
    onPress={onClickContinue}
    style={{
      padding:10,
      backgroundColor:"#9c4646",
      borderRadius:15,
      marginTop:5,
      marginHorizontal:15

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