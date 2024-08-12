import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
  
  return (
    <Tabs screenOptions={{
      headerShown:false,
      tabBarActiveTintColor:"black"
    }}>
      <Tabs.Screen name="mytrips"
      options={{
        tabBarLabel:"My Trips",
        tabBarIcon:({focused}) =><FontAwesome name="suitcase" size={24} color={focused ? "#3E798B" : "black"} />
      }}
      />
      
      <Tabs.Screen name="profile"
       options={{
        tabBarLabel:"Profile",
        tabBarIcon:({focused}) =><Ionicons name="person-circle" size={24} color={focused ? "#3E798B" : "black"} />
      }}
      />
    </Tabs>
  )
}