import { View, Text } from 'react-native'
import React from 'react'

export default function OptionCard({option,selectOption}) {
  return (
    <View style={[{
        padding:10,
        marginTop:10,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'#f5ebc6',
        borderRadius:10
        
    },selectOption?.id == option?.id && {borderWidth:3,borderColor:"#BC5656"}]}>
        <View>

        
      <Text style={{
        fontSize: 15,
        fontFamily:'mukta-bold'
      }}>{option?.title}</Text>
      <Text style={{
        fontSize: 12,
        fontFamily:'mukta-medium',
      }}>{option?.desc}</Text>
      </View>
      <Text style={{
        fontSize: 20,
      }}>{option?.icon}
      </Text>
    </View>
  )
}