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
export default function MenuA({ navigation, route }) {
    const item = route.params;

    const MenuData = ({ label, value, warna }) => {
        return (
            <View style={{
                flexDirection: 'row',
                marginBottom: 10,
            }}>
                <View style={{
                    flex: 1,
                    borderWidth: 2,
                    borderColor: colors.dua,
                    borderRadius: 25,
                    padding: 2,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <View style={{
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        marginRight: 10,
                        backgroundColor: warna
                    }}></View>
                    <Text style={{
                        flex: 1,
                        fontFamily: fonts.secondary[600],
                        fontSize: 18,
                        color: colors.dua
                    }}>{label}</Text>
                </View>
                <View style={{
                    width: 70,
                    paddingLeft: 10,
                    justifyContent: 'center',
                    alignItems: 'flex-end'
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 30,
                        color: colors.dua
                    }}>{value}</Text>
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.secondary
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
            <ScrollView showsVerticalScrollIndicator={false} style={{
                padding: 20,
            }}>
                <MenuData warna={colors.satu} label="Minum Obat Pagi" value="7.0" />
                <MenuData warna={colors.dua} label="Minum Obat Siang" value="13.0" />
                <MenuData warna={colors.tiga} label="Minum Obat Malam" value="19.0" />
                <MenuData warna={colors.satu} label="Olahraga Pagi" value="8.0" />
                <MenuData warna={colors.dua} label="Makan Siang" value="12.0" />
                <MenuData warna={colors.tiga} label="Sarapan" value="6.0" />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})