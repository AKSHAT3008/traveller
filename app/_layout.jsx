import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { CreateTripContext } from '../context/CreateTripContext';
import { useState } from "react";

export default function RootLayout() {

  useFonts({
    'gupter' : require('./../assets/fonts/Gupter-Regular.ttf'),
    'gupter-bold' : require('./../assets/fonts/Gupter-Bold.ttf'),
    'gupter-medium' : require('./../assets/fonts/Gupter-Medium.ttf'),
    'mukta' : require('./../assets/fonts/Mukta-Regular.ttf'),
    'mukta-bold' : require('./../assets/fonts/Mukta-Bold.ttf'),
    'mukta-medium' : require('./../assets/fonts/Mukta-Medium.ttf'),
    'mukta-semibold' : require('./../assets/fonts/Mukta-SemiBold.ttf'),
    'playfair' : require('./../assets/fonts/PlayfairDisplay-Regular.ttf'),
    'playfair-bold' : require('./../assets/fonts/PlayfairDisplay-Bold.ttf'),
    'playfair-extrabold' : require('./../assets/fonts/PlayfairDisplay-ExtraBold.ttf'),
    'playfair-semibold' : require('./../assets/fonts/PlayfairDisplay-SemiBold.ttf'),
    'playfair-black' : require('./../assets/fonts/PlayfairDisplay-Black.ttf'),
    'tinos' : require('./../assets/fonts/Tinos-Regular.ttf'),
    'tinos-bold' : require('./../assets/fonts/Tinos-Bold.ttf'),
    'tinos-bolditalic' : require('./../assets/fonts/Tinos-BoldItalic.ttf'),
    'tinos-italic' : require('./../assets/fonts/Tinos-Italic.ttf')

  })

  const [tripData,setTripData] = useState([]);

  return (
    <CreateTripContext.Provider value={{tripData,setTripData}}>
    <Stack screenOptions={{headerShown:false}}>
      <Stack.Screen name="index" options={{
        headerShown:false
      }} />
      
    </Stack>
    </CreateTripContext.Provider>
  );
}
