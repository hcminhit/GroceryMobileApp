import React from 'react';
import { View, StyleSheet, Dimensions, ScrollView, Button, Text } from 'react-native';
import {  Left, Right, ListItem, Thumbnail, Body } from 'native-base';
import { connect } from 'react-redux';
import *as actions from '../../../Redux/Actions/cartActions';
const { height, width } = Dimensions.get('window');
const Confirm = (props) => {
    const confirm = props.route.params;
    const confirmOrder = () => {
        setTimeout(() => {
            props.clearCart();
            props.navigation.navigate("Cart");
        },4000)
    }
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                    Confirm Order
                </Text>
                {props.route.params ? (
                    <View style={{borderWidth:1, borderColor:'orange'}}>
                        <Text style={styles.shipping}> Shipping To</Text>
                        <View style={{padding:8}}>
                            <Text>Addess1: {confirm.order.order.shippingAddress1}</Text>
                            <Text>Addess2: {confirm.order.order.shippingAddress2}</Text>
                            <Text>City: {confirm.order.order.city}</Text>
                            <Text>Zip Code: {confirm.order.order.zip}</Text>
                            <Text>Country: {confirm.order.order.country}</Text>
                        </View>
        
                        {confirm.order.order.orderItems.map((x) => {
                            return (
                                <ListItem
                                    style={styles.ListItem}
                                    key={x.product.name}
                                    avatar
                                >
                                    <Left>
                                        <Thumbnail
                                        source={{uri: x.product.image}}
                                        />
                                    </Left>
                                    <Body
                                    style={styles.body}
                                    >
                                        <Left>
                                            <Text>{x.product.name}</Text>
                                        </Left>
                                        <Right>
                                            <Text>${x.product.price}</Text>
                                        </Right>
                                    </Body>
                               </ListItem>
                            )
                        })} 
                    </View>
                ) : null}
                <View style={{alignItems:'center', margin: 20}}>
                    <Button
                        title={'Place Order'}
                        onPress={() =>{confirmOrder()}}
                    />
                </View>
            </View>
        </ScrollView>
    )
}
const mapDispatchToProps = (dispatch)=> {
    return {
        clearCart:()=>dispatch(actions.clearCart())
    }
}
const styles = StyleSheet.create({
    container: {
        height: height,
        padding: 8,
        alignContent: 'center', 
        backgroundColor:'white'
    },
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center', 
        margin: 8
    },
    shipping: {
        alignSelf: 'center',
        margin: 8,
        fontSize: 16,
        fontWeight: 'bold'
    },
    ListItem: {
        alignItems: 'center', 
        backgroundColor: 'white',
        justifyContent: 'center',
        width: width/1.2
    },
    body: {
        margin: 10,
        alignItems: 'center',
        flexDirection:'row'
    }
})
export default connect(null, mapDispatchToProps)(Confirm)