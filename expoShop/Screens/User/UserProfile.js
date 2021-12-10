import React, { useContext, useState, useCallback, useEffect } from 'react';
import { View, Text, ScrollView, Button, StyleSheet } from 'react-native';
import { Container } from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import baseURL from '../../assets/common/baseURL';
import Auth_Global from '../../context/Store/Auth_Global';
import { logoutUser } from '../../context/Actions/Auth_actions';
const UserProfile = (props) => {
    const context = useContext(Auth_Global);
    const [userProfile, setUserProfile] = useState();
    useEffect(() => {
        if (context.stateUser.isAuthenticated === false || context.stateUser.isAuthenticated === null) {
            props.navigation.navigate("Login");
        }
        console.log('id user', context.stateUser.user.userId)
        AsyncStorage.getItem("jwt").then((res) => {
            console.log(`res: ${res}`);
            axios
                .get(`${baseURL}users/${context.stateUser.user.userId}`, {
                    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${res}`},
                }).then(user => setUserProfile(user.data))
                .catch(error => {
                console.log('error 1:', error);
            })
        }).catch(error => {
            console.log('error2:',error);
        });
        return () => {
            setUserProfile();
        }
    }, [context.stateUser.isAuthenticated])
   
    return (
        <Container style={styles.container}>
            <ScrollView contentContainerStyle={styles.subContainer}>
                <Text style={{ fontSize: 30 }}>
                    {userProfile ? userProfile.name : ""}
                </Text>
                <View style={{ marginTop: 20 }}>
                    <Text style={{ margin: 10 }}>
                        Email: {userProfile ? userProfile.email : ""}
                    </Text>
                    <Text style={{ margin: 10 }}>
                        Phone: {userProfile ? userProfile.phone : ""}
                    </Text>
                </View>
                <View style={{ marginTop: 80 }}>
                    <Button title={"Sign Out"}
                        onPress={() => {
                            AsyncStorage.removeItem("jwt");
                            logoutUser(context.dispatch)
                        }}
                    />
                </View>
            </ScrollView>
        </Container>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    subContainer: {
        alignItems: 'center',
    }
})
export default UserProfile