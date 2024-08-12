import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GetPhotoRef } from '../../services/GooglePlaceApi';

export default function HotelCard({ item }) {

    const [photoRef, setPhotoRef] = useState();
    useEffect(() => {
        GetGooglePhotoRef();
    }, [])
    const GetGooglePhotoRef = async () => {
        const result = await GetPhotoRef(item?.name);
        
        setPhotoRef(result);
        
    }

    return (
        <View style={{
            marginRight: 10,
            borderRadius: 8,
            overflow: 'hidden',
            backgroundColor: '#fff',
            
        }}>
            <Image
                source={require('./../../assets/images/hotel.jpg')}
                style={{
                    width: '100%',
                    height: 120,
                }}
                resizeMode="cover"
            />

            <View style={{ padding: 10, }}>
                <Text style={{
                    fontSize: 16,
                    fontFamily:'playfair-semibold'
                }}>{item?.name}</Text>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 7,
                }}>
                    <Text style={{ fontSize: 14, }}>⭐ {item?.rating}</Text>
                    <Text style={{
                        fontSize: 14,
                        color: 'green',
                    }}>💸 {item?.price}</Text>
                </View>
            </View>
        </View>
    )
}