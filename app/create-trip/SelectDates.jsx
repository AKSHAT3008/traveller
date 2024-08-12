import { View, Text, TouchableOpacity, ToastAndroid } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import { CreateTripContext } from '../../context/CreateTripContext';

export default function SelectDates() {
  const navigation = useNavigation();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const { tripData, setTripData } = useContext(CreateTripContext);
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: '',
    });
  }, []);

  const onDateChange = (date, type) => {
    if (type === "START_DATE") {
      setStartDate(moment(date));
    } else {
      setEndDate(moment(date));
    }
  };

  const OnDateSelection = () => {
    if (!startDate || !endDate) {
      ToastAndroid.show("Please select both start and end date", ToastAndroid.LONG);
      return;
    }

    const totalNoOfDays = endDate.diff(startDate, 'days');
    console.log(totalNoOfDays + 1);

    setTripData({
      ...tripData,
      startDate: startDate,
      endDate: endDate,
      totalNoOfDays: totalNoOfDays + 1,
    });

    router.push('/create-trip/select-budget');
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 25,
        paddingTop: 75,
        backgroundColor: '#90c2d1',
      }}
    >
      <Text
        style={{
          fontFamily: 'playfair-bold',
          fontSize: 30,
          marginTop: 20,
        }}
      >
        Travel Dates
      </Text>
      <View
        style={{
          flex: 1,
          marginTop: 30,
          padding: 15,
        }}
      >
        <CalendarPicker
          onDateChange={onDateChange}
          allowRangeSelection={true}
          minDate={new Date()}
          maxRangeDuration={8}
          selectedRangeStyle={{
            backgroundColor: '#edc945',
          }}
          width={305}
          height={400}
        />
      </View>
      <TouchableOpacity 
        onPress={OnDateSelection}
        style={{
          padding: 10,
          backgroundColor: "#9c4646",
          borderRadius: 15,
          marginTop: 10,
          marginHorizontal: 10,
        }}
      >
        <Text
          style={{
            textAlign: 'center',
            color: 'white',
            fontFamily: 'tinos-bold',
            fontSize: 20,
          }}
        >
          Next
        </Text>
      </TouchableOpacity>
    </View>
  );
}
