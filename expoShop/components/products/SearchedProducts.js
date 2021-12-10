import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

import { Content, Left, Body, ListItem, Thumbnail, Text } from 'native-base';
const { width } = Dimensions.get('window');

const SearchedProducts = (props) => {
    const { productsFiltered } = props;
    return (
        <Content style={{ width: width}}>
            {productsFiltered.length > 0 ? (
                productsFiltered.map((item) => (
                    <ListItem
                        key={item.id}
                        avatar
                        onPress={() => {
                            props.navigation.navigate("Product Detail",{item:item})
                        }}
                    >
                        <Left>
                                <Thumbnail
                                    source={{ uri: item.image ? item.image : 'https://pixabay.com/get/g3e46912a95a5c682674a20cc61a8ff54f11854fa04a4f6aa7cd07655a6a334f0238b9e1d39ee65ff6ef2c124e9bc992b_1280.jpg' }}
                                   
                                >
                                </Thumbnail>
                          
                        </Left>
                        <Body>
                            <Text>{item.name}</Text>
                            <Text note={true}>{item.description}</Text>
                        </Body>
                    </ListItem>
                ))
            ) : (
                    <View style={styles.center}>
                        <Text style={{ alignSelf: 'center' }}>
                            No products match the selected 
                        </Text>
                    </View>
            )}
        </Content>
    )
}
const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    }
})
export default SearchedProducts