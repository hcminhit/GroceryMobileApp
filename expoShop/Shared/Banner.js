import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Dimensions, View, ScrollView } from 'react-native';
import Swiper from 'react-native-swiper';
const { width } = Dimensions.get('window');
const Banner = () => {
    const [bannerData, setBannerData] = useState([]);
    useEffect(() => {
        setBannerData([
            'https://pixabay.com/get/g763baa27be4e6e95cd629517aa9fb3cabbdecd9a15b5a6a8a226b5aaacf75766113648840c5302eabf576f90779104ec.jpg',
            'https://pixabay.com/get/gcbb65d4a2971e4dc69229c7ecc27ad44ac53f5e703506360aa2af4d8ad886b880c0a90808630e6fe59ed0fa174f09e5b.jpg',
            'https://pixabay.com/get/g604997e82131e8feddd09ffc3ca757b3d94de0e8d82fba362f721d51b04123341824540f1f7696cf0a0604e63cf253a6.jpg'
        ]);
        return () => {
            setBannerData([])
        }
    }, [])
    return (
        <ScrollView>
            <View style={styles.container}>
                <View
                    style={styles.swiper}
                >
                    <Swiper
                        showsButtons={false}
                        autoplay={true}
                        autoplayTimeout={2}
                        style={{ height: width / 2 }}
                    >
                        {bannerData.map((item) => {
                            return (
                                <Image
                                    key={item}
                                    style={styles.imageBanner}
                                    resizeMode='cover'
                                    source={{ uri: item }}
                                />
                            )
                        })}
                    </Swiper>
                    <View
                        style={{ height: 20 }}
                    >
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'gainsboro'
    },
    swiper: {
        width: width,
        alignItems: 'center',
        marginTop: 10,
    },
    imageBanner: {
        width: width,
        height: width / 2,
        borderRadius: 10,
        backgroundColor: 'white',
    }
})
export default Banner;