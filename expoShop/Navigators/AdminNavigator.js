import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Order from '../Screens/Admin/Order';
import Product from '../Screens/Admin/Product';
import ProductForm from '../Screens/Admin/ProductForm';
import Categories from '../Screens/Admin/Categories';

const Stack = createStackNavigator();
function MyStack() {
    return (<Stack.Navigator>
        <Stack.Screen
            name="Product"
            component={Product}

        />
        <Stack.Screen
            name="Order"
            component={Order}
            
        />
        <Stack.Screen
            name="ProductForm"
            component={ProductForm}
           
        />
        <Stack.Screen
            name="Categories"
            component={Categories}

        />    
    </Stack.Navigator>)
}
export default function AdminNavigator() {
    return <MyStack/>
}