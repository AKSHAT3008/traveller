import { View, Text,Image,StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { useRouter } from 'expo-router'

export default function login() {
    const router = useRouter();
  return (
    <View>
      <Image source={require('./../assets/images/Login.jpg')}
      style={{width:'100%',height:450}}
      />
      <View style={styles.container}>
        <Text
        style={{
            fontSize: 28,
            fontFamily:'playfair-black',
            textAlign:'center',
            color:'#BC5656',
        }}>AI Travel Planner</Text>
        <Text style={{
            fontSize: 17,
            fontFamily:'gupter-medium',
            textAlign:'center',
            paddingTop:20,
            
            
        }}>
        Welcome to your personal AI Travel Planner! ✈️
        {'\n'} 
        Ready to embark on an unforgettable adventure? Tell me your dream destination and your budget, and I'll craft a personalized itinerary just for you.
        </Text>
        <TouchableOpacity style={styles.button}
         onPress={() => router.push('auth/SignIn')}>
        
            <Text style={
                {
                    fontSize: 18,
                    fontFamily:'gupter-medium',
                    color:Colors.WHITE,
                    textAlign:'center',
                    
                }
            }>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:Colors.WHITE,
        marginTop:-20,
        height:'100%',
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        padding:25
    },
    button:{
        backgroundColor:"#4785C9",
        borderRadius:99,
        padding:15,
        marginTop:15,
        
    }
})