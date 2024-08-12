import { View, Text, TextInput,StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Colors } from '@/constants/Colors';
import {createUserWithEmailAndPassword} from 'firebase/auth'
import { auth } from '../../../configs/FirebaseConfig';

export default function SignUp() {
  const navigation = useNavigation();
  const router = useRouter();
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  const [username,setUsername] = useState();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, []);

  const OnCreateAccount = () =>{

    if(!email || !password || !username){
      ToastAndroid.show('Please enter all details', ToastAndroid.TOP);
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    router.replace('/mytrips');
    console.log(user);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
    // ..
  });
  }


  return (
    <View>
    <View style={{
      padding: 25,
      height:180,
      backgroundColor: "#89B8C7"
    }}>
      <Text style={{
        fontSize: 40,
        fontFamily: 'gupter-bold',
        textAlign: 'center',
        color: "#EBBE13",
        textShadowOffset: { width: -2, height: 2 },
        textShadowRadius: 3,
        textShadowColor: "#808182"
      }}>WELCOME</Text>

      <Text style={{
        fontSize: 25,
        fontFamily: 'gupter-bold',
        textAlign: 'center',
        color: "#BF4C4F",
        paddingTop: 20
      }}>Let's take off</Text>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <FontAwesome5 name="plane-departure" size={24} color="#C94741" />
        <FontAwesome5 name="plane-arrival" size={24} color="#C94741" />
      </View>

      
    </View>
    <View style={styles.container}>
        <Text style={{textAlign:'center'}}> Sign Up</Text>
        <Text style={{marginTop:10,fontFamily:'mukta-medium'}}>Username</Text>
        <TextInput style={styles.input} placeholder='Enter username' onChangeText={(value) => setUsername(value)}/>
        <Text style={{marginTop:10,fontFamily:'mukta-medium'}}>Email</Text>
        <TextInput style={styles.input} placeholder='Enter email' onChangeText={(value) => setEmail(value)}/>
        <Text style={{marginTop:10, fontFamily:'mukta-medium'}}>Password</Text>
        <TextInput secureTextEntry={true} style={styles.input} placeholder='Enter password' onChangeText={(value) => setPassword(value)}/>
        
    </View>
    <View style={{alignItems:'center'}}>
      <TouchableOpacity style={{backgroundColor:"#4785C9",
      borderRadius:15,
      width:'80%',
      padding:10,
      marginTop:15,
      }} onPress={OnCreateAccount}>
      <Text style={{fontFamily:'gupter',
      color:Colors.WHITE, textAlign:'center',
      fontSize:20}}>Sign Up</Text>
      </TouchableOpacity>
      
      <TouchableOpacity  style={{borderColor:"#4785C9", 
      borderRadius:15,
      borderWidth:1,
      width:'80%',
      padding:10,
      marginTop:15}}
      onPress={() => router.replace('auth/SignIn')}
      >

      
      <Text style={{
      textAlign:'center',
      fontFamily:'gupter-medium',
      fontSize:20}}>Log In
      </Text>
      </TouchableOpacity>
      
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
      borderWidth:2,
      padding:15,
      backgroundColor:'#FFF',

    },
    input:{
        padding:10,
        borderWidth:1,
        borderRadius:10,
        borderColor:"#898989"
    }
    
})
