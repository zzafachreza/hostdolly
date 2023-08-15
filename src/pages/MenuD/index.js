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
import SoundPlayer from 'react-native-sound-player'
export default function MenuD({ navigation, route }) {

    const [data, setData] = useState([]);
    const [pilih, setPilih] = useState({
        judul: '',
        suara: '',
    })
    const item = route.params;

    useEffect(() => {
        axios.post(apiURL + 'suara').then(res => {
            console.log(res.data);
            setData(res.data);
        })
    }, [])
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
                padding: 20,
                backgroundColor: colors.secondary,
                position: 'relative',
            }}>
                <ScrollView style={{
                    flex: 1
                }} showsVerticalScrollIndicator={false}>
                    {data.map((i, index) => {
                        return (
                            <View style={{

                                backgroundColor: colors.primary,
                                padding: 20,
                                height: 70,
                                width: '90%',
                                marginVertical: 10,
                                borderRadius: 10,
                                borderWidth: 2,
                                left: 20,

                                borderColor: colors.satu,

                            }}>

                                <TouchableWithoutFeedback onPress={() => {
                                    console.log(i);
                                    setPilih(i);
                                    // play the file tone.mp3
                                    SoundPlayer.playSoundFile('telolet', 'mp3')
                                    // SoundPlayer.playUrl(i.suara)


                                }}>
                                    <View style={{
                                        top: 7,
                                        left: -20,
                                        zIndex: 10,
                                        width: 50,
                                        position: 'absolute',
                                        borderRadius: 25,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: 50,
                                        backgroundColor: colors.tertiary,
                                    }}>

                                        <View style={{
                                            width: 30,
                                            borderRadius: 15,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            height: 30,
                                            borderWidth: 2,
                                            borderColor: colors.white
                                        }}>
                                            <Icon type='ionicon' name='play' size={22} color={colors.white} />
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                                <Text style={{
                                    left: 20,
                                    fontFamily: fonts.secondary[600],
                                    fontSize: 15,
                                    color: colors.textUtama
                                }}>{i.judul}</Text>
                            </View>
                        )
                    })}
                </ScrollView>
                <View style={{
                }}>
                    <Text style={{
                        textAlign: 'center',
                        fontFamily: fonts.secondary[600],
                        fontSize: 20,
                    }}>{pilih.judul}</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})