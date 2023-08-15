import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions, ImageBackground, TouchableWithoutFeedback, TouchableNativeFeedback, Linking, BackHandler, Animated, Easing } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData } from '../../utils/localStorage';
import { DimensionThisPhone, colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import 'intl';
import 'intl/locale-data/jsonp/en';
import moment from 'moment';
import 'moment/locale/id';
import { Calendar, CalendarList, Agenda, LocaleConfig } from 'react-native-calendars';
export default function MenuB({ navigation, route }) {
    const [selected, setSelected] = useState('');
    LocaleConfig.locales['id'] = {
        monthNames: [
            'Januari',
            'Februari',
            'Maret',
            'April',
            'Mei',
            'Juni',
            'Juli',
            'Agustus',
            'September',
            'Oktober',
            'November',
            'Desember'
        ],
        monthNamesShort: ['Jan.', 'Feb.', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul.', 'Agu', 'Sept.', 'Oct.', 'Nov.', 'Des.'],
        dayNames: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
        dayNamesShort: ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'],
        today: "Jumat"
    };

    LocaleConfig.defaultLocale = 'id';


    const item = route.params;
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <View style={{
                backgroundColor: colors.primary,
                height: 50,
                flexDirection: 'row',
                alignItems: 'center'
            }}>

                <Image source={{
                    uri: item.image
                }} style={{
                    flex: 0.3,
                    width: 30,
                    height: 30,
                    resizeMode: 'contain'
                }} />
                <Text style={{
                    flex: 1,
                    fontFamily: fonts.secondary[600],
                    fontSize: 20,
                    color: colors.black
                }}>
                    {item.judul}
                </Text>


                <Image source={require('../../assets/kanan.png')} style={{
                    width: 140,
                    height: 50,
                }} />

            </View>

            <View style={{
                flex: 1,
                backgroundColor: colors.secondary
            }}>

                <Calendar
                    theme={{
                        backgroundColor: colors.secondary,
                        calendarBackground: colors.secondary,
                        textSectionTitleColor: colors.black,
                        selectedDayBackgroundColor: colors.black,
                        selectedDayTextColor: colors.black,
                        todayTextColor: colors.black,
                        dayTextColor: colors.primary,
                    }}
                    onDayPress={day => {
                        setSelected(day.dateString);
                    }}
                    markedDates={{
                        [selected]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' }
                    }}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})