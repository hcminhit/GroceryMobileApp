import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, SafeAreaView } from 'react-native';

const Header = () => {
    return (<SafeAreaView style={styles.header}>
        <View
        style={{width: 120, height: 65, backgroundColor:'transparent'}}
        >
            <Image
                source={require("../assets/data/logofinal.png")}
                resizeMode="cover"
                style={{ flex: 1, width: "100%", backgroundColor:'transparent'}}
            />
        </View>
       
    </SafeAreaView>)
}
const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        width: "100%",
        alignContent: "center",
        justifyContent: "center",
        marginTop: 0, 
        backgroundColor:'transparent'
    }
})
export default Header;