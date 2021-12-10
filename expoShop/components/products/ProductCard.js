import React from 'react';
import { View, Dimensions, Image, Text, StyleSheet, Button } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../../Redux/Actions/cartActions';
const { width } = Dimensions.get("window");
import Toast from 'react-native-toast-message';
const ProductCard = (props) => {
    const { name, price, image, countInStock } = props;
    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={{ uri: image ? image : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png" }}
                resizeMode='contain'
            />
            <View style={styles.card} />
            <Text
                style={styles.title}
            >
                {name.length > 15 ? name.substring(0, 15 - 3) + '...' : name}
            </Text>
            <Text
                style={styles.price}
            >${price}
            </Text>
            {
                countInStock > 0 ? (
                    <View style={{ marginbottom: 60, marginTop: 20 }}>
                        <Button
                            title={'Add'}
                            color={'green'}
                            onPress={() => {
                                props.addItemToCart(props);
                                Toast.show({
                                    type: 'success',
                                    topOffset: 60,
                                    text1: `${name} added to your cart!`,
                                    text2: 'go to your cart to complete order'
                                })
                            }}
                            
                        />
                    </View>
                ): null
            }
        </View>
    )
}
const mapDispatchToProps = (dispatch) => {
    return {
        addItemToCart: (product) => {
            dispatch(actions.addToCart({quantity:1, product:product }))
        }
    }
}
const styles = StyleSheet.create({
    container: {
        width: width / 2 - 20,
        height: width / 1.7,
        padding: 10,
        borderRadius: 10,
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 10,
        alignItems: 'center',
        elevation: 8,
        backgroundColor: "white"
    },
    image: {
        width: width / 2 - 20 - 10,
        height: width / 2 - 20 - 30,
        backgroundColor: "transparent",
        position: 'absolute',
        top: -40,
    },
    card: {
        marginBottom: 10,
        height: width / 2 - 30 - 90,
        backgroundColor: 'transparent',
        width: width / 2 - 20 - 10
    },
    title: {
        fontWeight: "bold",
        fontSize: 14,
        textAlign: 'center'
    },
    price: {
        color: 'orange',
        marginTop: 10,
        fontSize: 20
    }
})
export default connect(null, mapDispatchToProps)(ProductCard)
//export default ProductCard;