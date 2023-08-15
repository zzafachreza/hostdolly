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
import MyCarouser from '../../components/MyCarouser';
import messaging from '@react-native-firebase/messaging';
import PushNotification, { Importance } from 'react-native-push-notification';
import GetLocation from 'react-native-get-location';
import { getDistance, convertDistance } from 'geolib';
import { showMessage } from 'react-native-flash-message';

import SoundPlayer from 'react-native-sound-player'
export default function Home({ navigation, route }) {

  const ImageAnimation = new Animated.Value(10)
  const TextAnimation = new Animated.Value(10);
  const [kirim, setKirim] = useState({})
  const [data, setData] = useState([]);

  const [user, setUser] = useState({
    nama_lengkap: 'Guest'
  });


  const PlaySuara = () => {
    try {
      // play the file tone.mp3
      SoundPlayer.playSoundFile('telolet', 'mp3')
      // or play from url

    } catch (e) {
      console.log(`cannot play the sound file`, e)
    }
  }

  useEffect(() => {

    axios.post(apiURL + 'menu').then(res => {

      console.log(res.data);
      setData(res.data);

    });

    Animated.timing(ImageAnimation, {
      toValue: 0,
      duration: 1000,
    }).start();
    Animated.timing(TextAnimation, {
      toValue: 0,
      duration: 1000,
    }).start();

    getData('user').then(uu => {
      setUser(uu);

      // GetLocation.getCurrentPosition({
      //   enableHighAccuracy: true,
      //   timeout: 15000,
      // })
      //   .then(location => {
      //     console.log(location);
      //     console.log('kirim', {
      //       fid_user: uu.id,
      //       lat_awal: location.latitude,
      //       long_awal: location.longitude,
      //     })


      //     setKirim({
      //       ...kirim,
      //       fid_user: uu.id,
      //       lat_awal: location.latitude,
      //       long_awal: location.longitude,
      //     });

      // const ProsesJarak = getDistance(
      //   { latitude: res.user_latitude, longitude: res.user_longitude },
      //   { latitude: location.latitude, longitude: location.longitude },

      //   1,
      // );
      // console.log('jarak',ProsesJarak)


      // })
      //   .catch(error => {

      //     const { code, message } = error;
      //     console.warn(code, message);
      //   });
    })


    const unsubscribe = messaging().onMessage(async remoteMessage => {

      const json = JSON.stringify(remoteMessage.notification);
      const obj = JSON.parse(json);

      console.log('remote message', remoteMessage);

      // alert(obj.notification.title)
      PlaySuara();
      PushNotification.localNotification({
        /* Android Only Properties */
        channelId: 'HostdollyID', // (required) channelId, if the channel doesn't exist, notification will not trigger.
        title: obj.title, // (optional)
        message: obj.body, // (required)
      });
    });

    return unsubscribe;


  }, [])

  const __renderItem = ({ item }) => {
    return (
      <TouchableWithoutFeedback onPress={() => navigation.navigate(item.modul, item)}>
        <View style={{
          flex: 1,
          padding: 10,
          borderWidth: 1,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
          borderColor: colors.secondary,
          // backgroundColor: colors.white,
          margin: 10,
          height: windowHeight / 4,
        }}>

          <Image source={{
            uri: item.image
          }} style={{
            // flex: 1,
            width: 100,
            height: 100,
            resizeMode: 'contain'
          }} />
          <Text style={{
            marginTop: 10,
            fontFamily: fonts.secondary[600],
            fontSize: 14,
            color: colors.black,
            textAlign: 'center'
          }}>{item.judul}</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  return (



    <SafeAreaView style={styles.container}>
      {/* header */}
      <View style={{
        backgroundColor: colors.primary,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center'
      }}>

        <Text style={{
          flex: 1,
          marginHorizontal: 10,
          fontFamily: fonts.secondary[600],
          fontSize: 20,
          color: colors.black
        }}>
          Hello Mom !
        </Text>


        <TouchableOpacity onPress={() => {
          PushNotification.localNotification({
            /* Android Only Properties */
            channelId: 'HostdollyID', // (required) channelId, if the channel doesn't exist, notification will not trigger.
            title: 'Test Alarm', // (optional)
            message: 'Waktunya Sarapan Pagi', // (required)
          });
        }}>
          <Image source={require('../../assets/kanan.png')} style={{
            width: 140,
            height: 50,
          }} />
        </TouchableOpacity>

      </View>
      <View style={{
        flex: 1,
        padding: 10,
        marginTop: 20,


        backgroundColor: colors.secondary
      }}>



        <FlatList data={data} renderItem={__renderItem} numColumns={2} />


      </View>








    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary
  }
})