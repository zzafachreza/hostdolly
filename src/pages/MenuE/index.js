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
import { MyButton, MyGap, MyInput } from '../../components';
import Tts from 'react-native-tts';
export default function MenuE({ navigation, route }) {
    const item = route.params;

    const [kirim, setKirim] = useState({
        id: '',
        keterangan: ''
    });
    const [data, setData] = useState([]);

    const sendServer = () => {
        console.log(kirim);

        axios.post(apiURL + 'catatan_add', kirim).then(res => {
            console.log(res.data);
            Tts.speak(kirim.keterangan, {
                androidParams: {
                    KEY_PARAM_PAN: -1,
                    KEY_PARAM_VOLUME: 0.5,
                    KEY_PARAM_STREAM: 'STREAM_MUSIC',
                },
            });
            __getTransaction();

        })
    }

    useEffect(() => {
        __getTransaction();
    }, [])

    const __getTransaction = () => {
        getData('user').then(u => {
            setKirim({
                id: u.id,
                keterangan: '',
            });

            axios.post(apiURL + 'catatan', {
                id: u.id
            }).then(res => {
                console.log(res.data);
                setData(res.data);
            })

        })
    }

    const __renderItem = ({ item }) => {
        return (
            <TouchableWithoutFeedback onPress={() => {
                Alert.alert(MYAPP, 'Delete this note ?', [
                    {
                        text: 'CANCEL'
                    }, {
                        text: 'DELETE',
                        onPress: () => {
                            axios.post(apiURL + 'catatan_delete', {
                                id: item.id
                            }).then(res => {
                                __getTransaction()
                            })
                        }
                    }
                ])
            }}>
                <View style={{
                    backgroundColor: colors.primary,
                    padding: 20,
                    margin: 5,
                    marginBottom: 10,
                    borderRadius: 20,
                    flex: 0.5,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[400],
                        color: colors.black,
                        fontSize: 12,
                        marginBottom: 5,
                        paddingBottom: 5,
                        borderBottomWidth: 1,

                    }}>{moment(item.tanggal).format('dddd , DD MMMM YYYY')} {'\n'}Pukul {item.jam}</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        color: colors.black,
                        fontSize: 12,
                    }}>{item.keterangan}</Text>

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
                backgroundColor: colors.secondary,
                padding: 20,
            }}>

                <FlatList data={data} renderItem={__renderItem} numColumns={2} />

            </View>

            <View style={{
                padding: 10,
                backgroundColor: colors.secondary
            }}>
                <MyInput value={kirim.keterangan} onChangeText={x => {
                    setKirim({
                        ...kirim,
                        keterangan: x
                    })
                }} placeholder="TYPE YOUR NOTES" multiline />
                <MyGap jarak={10} />
                <MyButton title="Add Notes" Icons="create-outline" onPress={sendServer} />

            </View>


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})