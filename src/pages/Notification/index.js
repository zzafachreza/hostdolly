import React, { useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    Image,
    Animated,
    Easing,
    ImageBackground,
    SafeAreaView,
} from 'react-native';
import { MyButton } from '../../components';
import { DimensionThisPhone, colors, fonts, windowHeight, windowWidth } from '../../utils';
import { MYAPP, getData } from '../../utils/localStorage';

export default function Notification({ navigation }) {

    const ImageAnimation = new Animated.Value(200);
    const TextAnimation = new Animated.Value(-80);


    Animated.timing(ImageAnimation, {
        toValue: DimensionThisPhone,
        duration: 1500,
        easing: Easing.linear
    }).start();

    // Animated.timing(TextAnimation, {
    //   toValue: 0,
    //   duration: 500,
    //   easing: Easing.linear
    // }).start();

    useEffect(() => {
        setTimeout(() => {
            getData('user').then(res => {
                if (!res) {
                    navigation.replace('Login')
                } else {
                    // navigation.replace('GetStarted')
                    navigation.replace('Home')
                }
            })
        }, 1500)
    }, []);


    return (
        <ImageBackground style={styles.container}>
            <Animated.Image source={require('../../assets/logo2.png')} style={
                {
                    width: ImageAnimation,
                    height: ImageAnimation,
                    resizeMode: 'contain'
                }
            } />
            <View style={styles.loading}>
                <ActivityIndicator color={colors.primary} size="large" />
            </View>

        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.secondary,
        justifyContent: 'center',
        alignItems: 'center'
    },

    loading: {
        marginTop: 30,
        marginBottom: 10,
    }
});
