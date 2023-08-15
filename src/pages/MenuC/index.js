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
import { MyInput } from '../../components';
import Tts from 'react-native-tts';
export default function MenuC({ navigation, route }) {
    const item = route.params;

    const [kirim, setKirim] = useState({
        id: '',
        pesan: ''
    });
    const [data, setData] = useState([]);

    const sendServer = () => {
        console.log(kirim);

        axios.post(apiURL + 'chat_add', kirim).then(res => {
            console.log(res.data);
            Tts.speak(kirim.pesan, {
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
                pesan: '',
            });

            axios.post(apiURL + 'chat', {
                id: u.id
            }).then(res => {
                console.log(res.data);
                setData(res.data);
            })

        })
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
                <ScrollView style={{
                    flex: 1,
                }} showsVerticalScrollIndicator={false}>

                    {data.map(i => {
                        return (
                            <TouchableWithoutFeedback onPress={() => {
                                Alert.alert(MYAPP, 'Delete this messege ?', [
                                    {
                                        text: 'CANCEL'
                                    }, {
                                        text: 'DELETE',
                                        onPress: () => {
                                            axios.post(apiURL + 'chat_delete', {
                                                id: i.id
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
                                    marginBottom: 10,
                                    borderBottomLeftRadius: 20,
                                    borderTopRightRadius: 20,
                                    width: '85%',
                                    alignSelf: 'flex-end',
                                }}>
                                    <Text style={{
                                        fontFamily: fonts.secondary[600],
                                        fontSize: 15,
                                    }}>{i.pesan}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        )
                    })}
                </ScrollView>
            </View>

            <View style={{
                padding: 10,
                backgroundColor: colors.secondary
            }}>
                <MyInput value={kirim.pesan} onChangeText={x => {
                    setKirim({
                        ...kirim,
                        pesan: x
                    })
                }} placeholder="TYPE SOMETHING AND DOLLY WILL SAY IT" onSubmitEditing={sendServer} />
            </View>


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})