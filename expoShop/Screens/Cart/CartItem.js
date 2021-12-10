import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Left, Right, ListItem, Thumbnail, Body } from 'native-base';

const CartItem = (props) => {
    const data = props.item.item.product;
    const [quantity, setQuantity] = useState(props.item.item.quantity);
    return (
        <ListItem
            key={Math.random()}
            avatar
            style={styles.ListItemStyle}
        >
            <Left>
                <Thumbnail
                    source={{
                        uri: data.image ? data.image : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png'
                    }}
                    style={{ width: 70, height: 70 }}
                >
                </Thumbnail>
            </Left>
            <Body style={styles.body}>
                <Left>
                    <Text>{data.name}</Text>
                </Left>
                <Right>
                    <Text>{data.price}$</Text>
                </Right>
            </Body>

        </ListItem>
    )
}
const styles = StyleSheet.create({
    body: {
        margin: 10,
        alignItems: 'center',
        flexDirection: 'row',
    },
    ListItemStyle: {
        flex: 1,
        backgroundColor:'white'
    }
})
export default CartItem;