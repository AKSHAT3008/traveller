import { View, Text, TextInput, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Colors } from '@/constants/Colors';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../configs/FirebaseConfig';
import * as SecureStore from 'expo-secure-store';

export default function SignIn() {
  const navigation = useNavigation();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    });

    const checkForSavedCredentials = async () => {
      const savedEmail = await SecureStore.getItemAsync('userEmail');
      const savedPassword = await SecureStore.getItemAsync('userPassword');

      if (savedEmail && savedPassword) {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, savedEmail, savedPassword);
          const user = userCredential.user;
          console.log(user);
          // Navigate to the home screen or dashboard
          router.replace('/mytrips'); // Replace with your target route

        } catch (error) {
          console.log("Auto login failed:", error);
        }
      }
    };

    checkForSavedCredentials();
  }, []);

  const onSignIn = async () => {
    if (!email || !password) {
      ToastAndroid.show("Please enter all the details", ToastAndroid.TOP);
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(user);

      // Save credentials to Secure Store
      await SecureStore.setItemAsync('userEmail', email);
      await SecureStore.setItemAsync('userPassword', password);

      // Navigate to the home screen or dashboard
      router.replace('/mytrips'); // Replace with your target route

    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage, errorCode);
      if (errorCode === 'auth/invalid-credential') {
        ToastAndroid.show("Invalid Credentials", ToastAndroid.LONG);
      }
    }
  };

  return (
    <View>
      <View style={{ padding: 25, height: 230, backgroundColor: "#89B8C7" }}>
        <Text style={styles.welcomeText}>WELCOME BACK</Text>
        <Text style={styles.subTitle}>Let's dive you in</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <FontAwesome5 name="plane-departure" size={24} color="#C94741" />
          <FontAwesome5 name="plane-arrival" size={24} color="#C94741" />
        </View>
      </View>
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}> Log In</Text>
        <Text style={{ marginTop: 15, fontFamily: 'mukta-medium' }}>Email</Text>
        <TextInput onChangeText={(value) => setEmail(value)} style={styles.input} placeholder='Enter email' />
        <Text style={{ marginTop: 15, fontFamily: 'mukta-medium' }}>Password</Text>
        <TextInput secureTextEntry={true} onChangeText={(value) => setPassword(value)} style={styles.input} placeholder='Enter password' />
      </View>
      <View style={{ alignItems: 'center' }}>
        <TouchableOpacity style={styles.loginButton} onPress={onSignIn}>
          <Text style={styles.loginButtonText}>Log in</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signUpButton} onPress={() => router.replace('auth/SignUp')}>
          <Text style={styles.signUpButtonText}>Create New Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    padding: 15,
    backgroundColor: '#FFF',
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#898989"
  },
  loginButton: {
    backgroundColor: "#4785C9",
    borderRadius: 15,
    width: '80%',
    padding: 15,
    marginTop: 15,
  },
  loginButtonText: {
    textAlign: 'center',
    fontFamily: 'gupter',
    color: Colors.WHITE,
    fontSize: 20
  },
  signUpButton: {
    borderColor: "#4785C9",
    borderRadius: 15,
    borderWidth: 1,
    width: '80%',
    padding: 15,
    marginTop: 15,
  },
  signUpButtonText: {
    textAlign: 'center',
    fontFamily: 'gupter-medium',
    fontSize: 20
  },
  welcomeText: {
    fontSize: 40,
    fontFamily: 'gupter-bold',
    textAlign: 'center',
    paddingTop: 10,
    color: "#EBBE13",
    textShadowOffset: { width: -2, height: 2 },
    textShadowRadius: 3,
    textShadowColor: "#808182"
  },
  subTitle: {
    fontSize: 25,
    fontFamily: 'gupter-bold',
    textAlign: 'center',
    color: "#BF4C4F",
    paddingTop: 20
  },
});
