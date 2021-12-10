import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const Tab = createBottomTabNavigator();
import CartNavigator from './CartNavigator';
import HomeNavigator from './HomeNavigator'
import CartIcon from '../Shared/CartIcon'
import UserNavigator from './UserNavigator';
import AdminNavigator from './AdminNavigator'
import Auth_Global from '../context/Store/Auth_Global';
const Main = () => {
    const context = useContext(Auth_Global);
    console.log(`context`,context.stateUser);
    return (
        <Tab.Navigator
            initialRouteName='Home'
            tabBarOptions={{
                keyboardHidesTabBar: true,
                showLabel: false,
                activeTintColor: '#e91e63'
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeNavigator}
                options={{
                    tabBarIcon: ({ color }) => {
                        return <Icon
                            name="home"
                            style={{ position: 'relative' }}
                            color={color}
                            size={30}
                        />
                    }
                }}
            />
            <Tab.Screen
                name="Cart"
                component={CartNavigator}
                options={{
                    tabBarIcon: ({ color }) => {
                        return (<View>
                            <Icon
                                name="shopping-cart"
                                style={{ position: 'relative' }}
                                color={color}
                                size={30}
                            />
                            <CartIcon/>
                        </View>)
                        
                     
                    }
                }}
            />
            {
                context.stateUser.user.isAdmin == true ? (
                    <Tab.Screen
                        name="Admin"
                        component={AdminNavigator}
                        options={{
                            tabBarIcon: ({ color }) => {
                                return <Icon
                                    name="cog"
                                    style={{ position: 'relative' }}
                                    color={color}
                                    size={30}
                                />
                            }
                        }}
                    />
                ):null
            }
            <Tab.Screen
                name="User"
                component={UserNavigator}
                options={{
                    tabBarIcon: ({ color }) => {
                        return <Icon
                            name="user"
                            style={{ position: 'relative' }}
                            color={color}
                            size={30}
                        />
                    }
                }}
            />

        </Tab.Navigator>
    )
}
export default Main