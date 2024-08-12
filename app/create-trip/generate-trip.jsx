import { View, Text, Image, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { CreateTripContext } from '../../context/CreateTripContext'
import { AI_PROMPT } from '../../constants/Options';
import { chatSession } from '../../configs/AIModel';
import { useRouter } from 'expo-router';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../configs/FirebaseConfig';

export default function GenerateTrip() {

  const { tripData, setTripData } = useContext(CreateTripContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const user = auth.currentUser;

  useEffect(() => {
    if (tripData) {
      GenerateAITrip();
    }
  }, []);

  const GenerateAITrip = async () => {
    try {
      setLoading(true);
      const FINAL_PROMPT = AI_PROMPT
        .replace('{location}', tripData?.locationInfo?.name)
        .replace('{totalDay}', tripData?.totalNoOfDays)
        .replace('{totalNight}', tripData?.totalNoOfDays - 1)
        .replace('{traveler}', tripData?.travelerCount?.title)
        .replace('{budget}', tripData?.budget)
        .replace('{totalDay}', tripData?.totalNoOfDays)
        .replace('{totalNight}', tripData?.totalNoOfDays - 1);

      console.log(FINAL_PROMPT);

      const result = await chatSession.sendMessage(FINAL_PROMPT);

      const responseText = await result.response.text();

      if (!responseText) {
        throw new Error("Empty response from AI model");
      }

      const tripResponse = JSON.parse(responseText);

      setLoading(false);

      const docId = Date.now().toString();
      await setDoc(doc(db, "UserTrips", docId), {
        userEmail: user.email,
        tripPlan: tripResponse, // AI Result
        tripData: JSON.stringify(tripData), // User Selections
        docId: docId,
      });

      router.push('/mytrips');

    } catch (error) {
      setLoading(false);
      console.error('Error generating trip:', error);
      Alert.alert("Error", "There was an error generating your trip. Please try again.");
    }
  };

  return (
    <View style={{
      padding: 25,
      paddingTop: 75,
      height: '100%',
      backgroundColor: '#FEEBEA'
    }}>
      <Text style={{
        textAlign: 'center',
        fontSize: 30,
        fontFamily: 'playfair-bold'
      }}>Please Wait...</Text>

      <Text style={{
        textAlign: 'center',
        fontSize: 18,
        marginTop: 10,
        fontFamily: 'playfair'
      }}>We are planning your dream trip</Text>

      <Image source={require('./../../assets/images/loader.gif')}
        style={{
          marginTop: 50,
          marginLeft: 10,
          width: 300,
          height: 300
        }}
      />

      <Text style={{
        textAlign: 'center',
        fontSize: 15,
        marginTop: 20,
        fontFamily: 'playfair-black',
        color: '#9c4646'
      }}>
        Please do not refresh or Go Back
      </Text>
    </View>
  );
}
