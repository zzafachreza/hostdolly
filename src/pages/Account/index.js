import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    Linking,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { windowWidth, fonts } from '../../utils/fonts';
import { getData, MYAPP, storeData, urlAPI, urlApp, urlAvatar } from '../../utils/localStorage';
import { colors } from '../../utils/colors';
import { MyButton, MyGap } from '../../components';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';

export default function ({ navigation, route }) {
    const item = route.params;
    const [user, setUser] = useState({});
    const [com, setCom] = useState({});
    const isFocused = useIsFocused();
    const [wa, setWA] = useState('');
    const [open, setOpen] = useState(false);



    useEffect(() => {


        if (isFocused) {
            getData('user').then(res => {

                setOpen(true);
                setUser(res);

            });
        }




    }, [isFocused]);



    const btnKeluar = () => {
        Alert.alert(MYAPP, 'Apakah kamu yakin akan keluar ?', [
            {
                text: 'Batal',
                style: "cancel"
            },
            {
                text: 'Keluar',
                onPress: () => {
                    storeData('user', null);

                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Splash' }],
                    });
                }
            }
        ])
    };

    const MyList = ({ label, value }) => {
        return (
            <View
                style={{
                    marginVertical: 3,
                    padding: 5,
                    backgroundColor: colors.white,
                    borderRadius: 5,
                }}>
                <Text
                    style={{
                        fontFamily: fonts.primary[400],
                        color: '#8E99A2',
                    }}>
                    {label}
                </Text>
                <Text
                    style={{
                        fontFamily: fonts.primary[400],
                        color: colors.black,
                    }}>
                    {value}
                </Text>
            </View>
        )
    }
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.secondary
        }}>

            {!open && <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>}


            {open &&
                <>
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
                        backgroundColor: colors.secondary,
                        padding: 20,
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                            <View>
                                <Image source={{
                                    uri: user.foto_user
                                }} style={{
                                    width: 80,
                                    height: 80,
                                    borderRadius: 40,
                                }} />
                            </View>
                            <View style={{
                                paddingLeft: 10,
                            }}>
                                <Text style={{
                                    fontFamily: fonts.primary[600],
                                    fontSize: windowWidth / 22,
                                    color: colors.black
                                }}>Halo,</Text>
                                <Text style={{
                                    fontFamily: fonts.primary[400],
                                    fontSize: windowWidth / 22,
                                    color: colors.black
                                }}>{user.nama_lengkap}</Text>
                                <Text style={{
                                    fontFamily: fonts.primary[600],
                                    fontSize: windowWidth / 28,
                                    color: colors.primary
                                }}>{user.level}</Text>
                            </View>
                        </View>
                        <View style={{ padding: 10, }}>
                            <MyList label="Username" value={user.username} />
                            <MyList label="Nomor Handphone" value={user.telepon} />
                            <MyList label="Alamat" value={user.alamat} />


                        </View>
                        {/* data detail */}
                    </View>
                </>
            }
            <View style={{
                padding: 10,
                flexDirection: 'row'
            }}>
                <View style={{
                    flex: 1,
                    paddingLeft: 5,
                }}>
                    <MyButton onPress={() => navigation.navigate('AccountEdit', user)} warna={colors.primary} title="Edit Profile" Icons="create" iconColor={colors.white} colorText={colors.white} />
                </View>
                <View style={{
                    flex: 1,
                    paddingLeft: 5,
                }}>
                    <MyButton onPress={btnKeluar} warna={colors.black} title="Keluar" Icons="log-out" iconColor={colors.white} colorText={colors.white} />
                </View>
            </View>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({});
