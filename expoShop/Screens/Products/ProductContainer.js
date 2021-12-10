import React, { useEffect, useState, useCallback } from 'react';
import { Text, View, FlatList, Dimensions, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import data from '../../assets/data/products.json';
const productcategories = require('../../assets/data/categories.json');
import ProductList from '../../components/products/ProductList';
import { Container, Header, Icon, Item, Input } from 'native-base'
import CategoryFilter from '../../components/products/CategoryFilter';
import Banner from '../../Shared/Banner';
import SearchedProducts from '../../components/products/SearchedProducts';
const { height } = Dimensions.get('window');
import { useFocusEffect } from '@react-navigation/native';
import baseURL from '../../assets/common/baseURL';
import axios from 'axios';
import Toast  from 'react-native-toast-message';
const ProductContainer = (props) => {
    const [productData, setProductData] = useState([]);
    const [productsFiltered, setProductsFiltered] = useState([]);
    const [focus, setFocus] = useState();
    const [categories, setCategories] = useState([]);
    const [productsCtg, setProductsCtg] = useState([]);
    const [active, setActive] = useState();
    const [initialState, setInitialState] = useState([]);
    const [loading, setLoading] = useState(true);

    useFocusEffect(useCallback(
        () => {
            setFocus(false);
            setCategories(productcategories);
            setActive(-1);
            axios.get(`${baseURL}products`).then(
                (res) => {
                    setProductData(res.data);
                    setProductsFiltered(res.data);
                    setProductsCtg(res.data);
                    setInitialState(res.data)
                    setLoading(false)
                }
            ).catch((error) => {
                console.log('Api Call Product Error', error)
            })
            axios.get(`${baseURL}categories`).then(
                (res) => {
                    setCategories(res.data)
                }
            ).catch((error) => {
                console.log('Api Call categories Error', error)
            })
            return () => {
                setProductData([]);
                setProductsFiltered([]);
                setFocus();
                setCategories([])
                setActive()
                setInitialState();
            }
        }
        , []))

    const searchProducts = (text) => {
        setProductsFiltered(
            productData.filter((item) => {
                return item.name.toLowerCase().includes(text.toLowerCase())
            })
        )
    }
    const openList = () => {
        setFocus(true);
    }
    const onBlur = () => {
        setFocus(false);
    }
    //Categories
    const changeCtg = (ctg) => {

        ctg === 'all' ? [setProductsCtg(initialState), setActive(true)] : [
            setProductsCtg(
                productData.filter((item) => {
                    return item.category._id === ctg
                }))
        ]
    }
    return (
        <>
            {loading == false ? (
                <Container>
                    {/* <Header>
                        <Item>
                            <Icon name="search" />
                            <Input
                                placeholder="type here to search"
                                onFocus={openList}
                                onChangeText={(text) => searchProducts(text)}
                            />
                            {focus == true ? (
                                <Icon name="ios-close" onPress={onBlur} />
                            ) : null}
                        </Item>
                    </Header> */}
                    <Header
                        searchBar rounded
                    >
                        <Item>
                            <Icon
                                name="ios-search"
                            />
                            <Input
                                placeholder="type here to search"
                                onFocus={openList}
                                onChangeText={(text) => searchProducts(text)}
                            />
                            {focus == true ? (
                                <Icon name="ios-close" onPress={onBlur} />
                            ) : null}
                        </Item>
                    </Header>
                    {
                        focus == true ? (
                            <SearchedProducts
                                productsFiltered={productsFiltered}
                                navigation={props.navigation}
                            />
                        ) :
                            (
                                <ScrollView>
                                    <View
                                        style={{ marginTop: 5, flex: 1 }}
                                    >
                                        <View>
                                            <Banner />
                                        </View>
                                        <View>
                                            <CategoryFilter
                                                categories={categories}
                                                categoryFilter={changeCtg}
                                                productsCtg={productsCtg}
                                                active={active}
                                                setActive={setActive}
                                            />
                                        </View>
                                        {/* <View style={{ flex: 1 }} >
                                    <FlatList
                                        numColumns={2}
                                        renderItem={({ item }) => {
                                            return <ProductList
                                                item={item}
                                                key={item._id}
                                            />
                                        }}
                                        data={productData}
                                        keyExtractor={(item) => item._id.$oid}
                                    />
                                </View> */}
                                        {
                                            productsCtg.length > 0 ? (
                                                <View style={styles.listContainer}>
                                                    {productsCtg.map((item) => {
                                                        return <ProductList
                                                            navigation={props.navigation}
                                                            key={item.id}
                                                            item={item}
                                                        />
                                                    })}
                                                </View>
                                            ) :
                                                (<View style={[styles.center, { height: height / 2 }]}>
                                                    <Text>No products found</Text>
                                                </View>)
                                        }
                                    </View>
                                </ScrollView>

                            )
                    }
                </Container>
            ) : (
                <Container style={[styles.center, { backgroundColor: '#f2f2f2' }]}>
                    <ActivityIndicator
                        size="large"
                        color="red"
                    />
                </Container>
            )}
        </>
    )
}
const styles = StyleSheet.create({
    listContainer: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        flex: 1,
        alignContent: 'flex-start',
        backgroundColor: 'gainsboro'
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    }
})
export default ProductContainer