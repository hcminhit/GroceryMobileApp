import React,{useState, useCallback} from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import axios from 'axios';
import { Header, Item, Input } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import baseURL from '../../assets/common/baseURL';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
const { height, width } = Dimensions.get('window');
import ListItem from './ListItem';
const ListHeader = () => {
    return (<View
        style={styles.ListHeader }
        elevation={1}
    >
        <View style={styles.headerItem}>
          
        </View>
        <View style={styles.headerItem}>
            <Text style={{fontWeight: '600'}}>Brand</Text>
        </View>
        <View style={styles.headerItem}>
            <Text style={{ fontWeight: '600' }}>Name</Text>
        </View>
        <View style={styles.headerItem}>
            <Text style={{ fontWeight: '600' }}>Category</Text>
        </View>
        <View style={styles.headerItem}>
            <Text style={{ fontWeight: '600' }}>Price</Text>
        </View>

    </View>)
}
const styles = StyleSheet.create({
    ListHeader: {
        flexDirection: 'row',
        padding: 5,
        backgroundColor:'gainsboro'
    },
    headerItem: {
        margin: 3,
        width:width/6
    }
})
const Product = (props) => {

    const [productList, setProductList] = useState();
    const [productFilter, setProductFilter] = useState();
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState();
    useFocusEffect(useCallback(() => {
        AsyncStorage.getItem('jwt').then((res) => {
            setToken(res)
        }).catch((error) => {
            console.log(error)
        });
        axios.get(`${baseURL}products`).then((res) => {
            setProductList(res.data);
            setProductFilter(res.data);
            setLoading(false);
        })
        return () => {
            setProductList();
            setProductFilter();
            setLoading(true);
        }
    }, []))
    const searchProducts = (text) => {
        if (text == "") {
            setProductFilter(productList)
        }
        setProductFilter(
            productList.filter(i=> i.name.toLowerCase().includes(text.toLowerCase()))
        )
        }
    
    return (
        <View>

            <Header
                searchBar rounded
            >
                <Item>
                    <Icon
                        name="search"
                    />
                    <Input
                        placeholder="Search"
                        onChangeText={(text) =>searchProducts(text)}
                    />
                </Item>
            </Header>
            {loading ? (
                <View style={{ 
                    height: height/2,
                    alignItems: 'center',
                    justifyContent: 'center',
                    
                }}>
                    <ActivityIndicator
                        size="large"
                        color="red"
                    />
                </View>
            ) : (
                <FlatList
                    data={productFilter}
                    renderItem={({ item, index }) => (
                        <ListItem
                            {...item}
                            navigation={props.navigation}
                            index={index}
                            
                        />
                        )}
                    ListHeaderComponent={ListHeader}
                    keyExtractor={(item) => item.id}
                />
            )
            }

        </View>)

}
export default Product;