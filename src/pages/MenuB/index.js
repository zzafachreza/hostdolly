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
import { MyButton, MyCalendar, MyGap, MyInput } from '../../components';
import PushNotification, { Importance } from 'react-native-push-notification';
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

    const [kirim, setKirim] = useState({
        id: '',
        keterangan: '',

    });
    const [data, setData] = useState([]);
    const [marked, setMarked] = useState({});

    const sendServer = () => {
        console.log(kirim);


        PushNotification.localNotificationSchedule({
            //... You can use all the options from localNotifications
            channelId: 'HostdollyIDX',
            title: 'Host Dolly', // (optional)
            message: "Alarm Sudah aktif sesuai jadwal", // (required)
            // date: moment().utc().toISOString(), // in 60 secs
            // ew Date(moment(kirim.tanggal + ' ' + '00:37').toISOString().valueOf())
            date: new Date(Date.now() + 2 * 1000), // in 60 secs
            allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
            playSound: true, // (optional) default: true
            soundName: "alarm", // (optional) See `soundName` parameter of `localNotification` function
            importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
            vibrate: true,
            /* Android Only Properties */
            repeatTime: 1, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
        });


        PushNotification.localNotificationSchedule({
            //... You can use all the options from localNotifications
            channelId: 'HostdollyIDX',
            title: 'Host Dolly', // (optional)
            message: "Minum Obat Pagi", // (required)
            // date: moment().utc().toISOString(), // in 60 secs
            // ew Date(moment(kirim.tanggal + ' ' + '00:37').toISOString().valueOf())
            date: new Date(moment(kirim.tanggal + ' ' + '07:00').toISOString().valueOf()), // in 60 secs
            allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
            playSound: true, // (optional) default: true
            soundName: "alarm", // (optional) See `soundName` parameter of `localNotification` function
            importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
            vibrate: true,
            /* Android Only Properties */
            repeatTime: 1, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
        });

        PushNotification.localNotificationSchedule({
            //... You can use all the options from localNotifications
            channelId: 'HostdollyIDX',
            title: 'Host Dolly', // (optional)
            message: "Minum Obat Siang", // (required)
            // date: moment().utc().toISOString(), // in 60 secs
            // ew Date(moment(kirim.tanggal + ' ' + '00:37').toISOString().valueOf())
            date: new Date(moment(kirim.tanggal + ' ' + '13:00').toISOString().valueOf()), // in 60 secs
            allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
            playSound: true, // (optional) default: true
            soundName: "alarm", // (optional) See `soundName` parameter of `localNotification` function
            importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
            vibrate: true,
            /* Android Only Properties */
            repeatTime: 1, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
        });
        PushNotification.localNotificationSchedule({
            //... You can use all the options from localNotifications
            channelId: 'HostdollyIDX',
            title: 'Host Dolly', // (optional)
            message: "Minum Obat Malam", // (required)
            // date: moment().utc().toISOString(), // in 60 secs
            // ew Date(moment(kirim.tanggal + ' ' + '00:37').toISOString().valueOf())
            date: new Date(moment(kirim.tanggal + ' ' + '19:00').toISOString().valueOf()), // in 60 secs
            allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
            playSound: true, // (optional) default: true
            soundName: "alarm", // (optional) See `soundName` parameter of `localNotification` function
            importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
            vibrate: true,
            /* Android Only Properties */
            repeatTime: 1, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
        });
        PushNotification.localNotificationSchedule({
            //... You can use all the options from localNotifications
            channelId: 'HostdollyIDX',
            title: 'Host Dolly', // (optional)
            message: "Olahraga Pagi", // (required)
            // date: moment().utc().toISOString(), // in 60 secs
            // ew Date(moment(kirim.tanggal + ' ' + '00:37').toISOString().valueOf())
            date: new Date(moment(kirim.tanggal + ' ' + '08:00').toISOString().valueOf()), // in 60 secs
            allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
            playSound: true, // (optional) default: true
            soundName: "alarm", // (optional) See `soundName` parameter of `localNotification` function
            importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
            vibrate: true,
            /* Android Only Properties */
            repeatTime: 1, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
        });

        PushNotification.localNotificationSchedule({
            //... You can use all the options from localNotifications
            channelId: 'HostdollyIDX',
            title: 'Host Dolly', // (optional)
            message: "Makan Siang", // (required)
            // date: moment().utc().toISOString(), // in 60 secs
            // ew Date(moment(kirim.tanggal + ' ' + '00:37').toISOString().valueOf())
            date: new Date(moment(kirim.tanggal + ' ' + '12:00').toISOString().valueOf()), // in 60 secs
            allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
            playSound: true, // (optional) default: true
            soundName: "alarm", // (optional) See `soundName` parameter of `localNotification` function
            importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
            vibrate: true,
            /* Android Only Properties */
            repeatTime: 1, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
        });

        PushNotification.localNotificationSchedule({
            //... You can use all the options from localNotifications
            channelId: 'HostdollyIDX',
            title: 'Host Dolly', // (optional)
            message: "Sarapan", // (required)
            // date: moment().utc().toISOString(), // in 60 secs
            // ew Date(moment(kirim.tanggal + ' ' + '00:37').toISOString().valueOf())
            date: new Date(moment(kirim.tanggal + ' ' + '06:00').toISOString().valueOf()), // in 60 secs
            allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
            playSound: true, // (optional) default: true
            soundName: "alarm", // (optional) See `soundName` parameter of `localNotification` function
            importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
            vibrate: true,
            /* Android Only Properties */
            repeatTime: 1, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
        });


        axios.post(apiURL + 'jadwal_add', kirim).then(res => {
            console.log(res.data);
            Alert.alert(MYAPP, `Alarm berhasil dibuat untuk hari ${moment(kirim.tanggal).format('dddd, DD MMMM YYYY')}`)
            __getTransaction();

        })
    }

    useEffect(() => {
        console.log(moment().format('HH:mm:ss'))
        PushNotification.getScheduledLocalNotifications(callback => {
            console.log(callback)
        });
        __getTransaction();
    }, [])

    const __getTransaction = () => {
        getData('user').then(u => {
            setKirim({
                id: u.id,
                keterangan: '',
                tanggal: moment().format('YYYY-MM-DD')
            });

            axios.post(apiURL + 'jadwal', {
                id: u.id
            }).then(res => {

                setData(res.data);

                let arr = {}
                Object.keys(res.data).map(i => {
                    arr[res.data[i].tanggal] = { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' }
                });

                setMarked(arr);
            })

        })
    }

    const __renderItem = ({ item }) => {
        return (
            <TouchableWithoutFeedback onPress={() => {
                Alert.alert(MYAPP, 'Delete this schedule ?', [
                    {
                        text: 'CANCEL'
                    }, {
                        text: 'DELETE',
                        onPress: () => {
                            axios.post(apiURL + 'jadwal_delete', {
                                id: item.id
                            }).then(res => {
                                __getTransaction()
                            })
                        }
                    }
                ])
            }}>
                <View style={{
                    flex: 1,
                    backgroundColor: colors.primary,
                    padding: 20,
                    margin: 5,
                    marginBottom: 10,
                    borderRadius: 20,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        color: colors.black,
                        fontSize: 15,
                    }}>{item.keterangan}</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[400],
                        color: colors.black,
                        fontSize: 11,
                        marginBottom: 5,

                    }}>{moment(item.tanggal).format('DD/MM/YY')}</Text>


                </View>
            </TouchableWithoutFeedback>
        )

    }
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
                    markedDates={marked}
                    theme={{
                        backgroundColor: colors.secondary,
                        calendarBackground: colors.secondary,
                        textSectionTitleColor: colors.black,
                        selectedDayBackgroundColor: colors.primary,
                        selectedDayTextColor: colors.black,
                        todayTextColor: colors.black,
                        dayTextColor: colors.primary,
                    }}
                    onDayPress={day => {
                        let arr = {};
                        let tedss =
                            console.log(arr);
                    }}

                />
            </View>

            <View style={{
                flex: 0.5,
                backgroundColor: colors.secondary,
                paddingHorizontal: 10,
            }}>

                <FlatList data={data} renderItem={__renderItem} numColumns={4} />

            </View>

            <View style={{
                padding: 10,
                backgroundColor: colors.secondary
            }}>
                <MyCalendar value={kirim.tanggal} onDateChange={x => {
                    setKirim({
                        ...kirim,
                        tanggal: x
                    })
                }} />
                <MyGap jarak={10} />
                <MyInput nolabel value={kirim.keterangan} onChangeText={x => {
                    setKirim({
                        ...kirim,
                        keterangan: x
                    })
                }} placeholder="TYPE YOUR NOTES" multiline />
                <MyGap jarak={10} />
                <MyButton title="Add Schedule" Icons="create-outline" onPress={sendServer} />

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})