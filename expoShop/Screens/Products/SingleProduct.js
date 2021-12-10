import React, { useState, useEffect } from 'react';
import { Image, View, StyleSheet, Text, ScrollView, Button } from 'react-native';
import { Left, Right, Container, H1 } from 'native-base';
import Toast from 'react-native-toast-message';
import * as actions from '../../Redux/Actions/cartActions';
import { connect } from 'react-redux';
const SingleProduct = (props) => {
    const [item, setItem] = useState(props.route.params.item);
    const [availability, setAvailability] = useState(null);
    return (
        <Container
            style={styles.container}
        >
            <ScrollView >
                <View>
                    <Image
                        source={{
                            uri: item.image ? item.image : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png'
                        }}
                        resizeMode='contain'
                        style={styles.image}
                    />
                </View>
                <View
                style={styles.contentContainer}
                >
                    <H1 style={styles.contentHeader}>{item.name}</H1>
                    <Text style={styles.contentText}>{item.brand}</Text>
                </View>
            </ScrollView>
            <View style={styles.bottomContainer}>
                <Left>
                    <Text style={styles.price}>${item.price}</Text>
                </Left>
                <Right>
                    <Button
                        title={"Add"}
                        onPress={() => {
                            props.addItemToCart(item);
                            Toast.show({
                                type: "success",
                                topOffset: 60,
                                text1: `${item.name} added to your card`,
                                text2: 'Go to your cart to complete order'
                            })
                        }}
                    />
                </Right>
            </View>
        </Container>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        addItemToCart: (product) => {
            dispatch(actions.addToCart({ quantity: 1, product: product }))
        }
    }
}
const styles = StyleSheet.create({
    container: {
        height: '100%',
        padding: 5
    },
    imageContainer: {
        backgroundColor: 'pink',
        padding: 0,
        margin: 0
    },
    image: {
        width: '100%',
        height:250
    },
    contentContainer: {
        marginTop: 0,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    contentHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20
    },
    bottomContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right:0,
    },
    price: {
        fontSize: 24,
        margin: 20,
        color: 'red'
    }
})
export default connect(null, mapDispatchToProps)(SingleProduct);