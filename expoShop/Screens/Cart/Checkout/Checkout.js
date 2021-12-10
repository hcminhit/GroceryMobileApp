import React, {useState, useEffect} from 'react';
import { View, Text, Button } from 'react-native'
import { Item, Picker } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import FormContainer from '../../../Shared/Form/FormContainer';
import Input from '../../../Shared/Form/Input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
const countries = require('../../../assets/data/countries.json');
const Checkout = (props) => {
    const [orderItems, setOrderItems] = useState();
    const [address1, setAddress1] = useState();
    const [address2, setAddress2] = useState();
    const [city, setCity] = useState();
    const [zip, setZip] = useState();
    const [country, setCountry] = useState();
    const [phone, setPhone] = useState();
    useEffect(() => {
        setOrderItems(props.cartItems);
        return () => {
            setOrderItems()
        }
    }, [])
    const checkOut = () => {
        let order = {
            city,
            country,
            dateOrdered: Date.now(),
            orderItems,
            phone,
            shippingAddress1: address1,
            shippingAddress2: address2,
            zip,
        }
        props.navigation.navigate("Payment", { order: order })
    }

    return (
        <KeyboardAwareScrollView
            viewIsInsideTabBar={true}
            extraHeight={200}
            enableOnAndroid={true}

        >
            <FormContainer title={"Shipping Address"}>
                <Input
                    placeholder={"Phone"}
                    name={"phone"}
                    value={phone}
                    keyboardType={'numeric'}
                    onChangeText={(text) => setPhone(text)}
                />
                <Input
                    placeholder={"Shipping Address 1"}
                    name={"ShippingAddress1"}
                    value={address1}
                    onChangeText={(text) => setAddress1(text)}
                />
                <Input
                    placeholder={"Shipping Address 2"}
                    name={"ShippingAddress2"}
                    value={address2}
                    onChangeText={(text) => setAddress2(text)}
                />
                <Input
                    placeholder={"City"}
                    name={"city"}
                    value={city}
                    onChangeText={(text) => setCity(text)}
                />
                <Input
                    placeholder={"Zip Code"}
                    name={"Zip"}
                    value={zip}
                    keyboardType={'numeric'}
                    onChangeText={(text) => setZip(text)}
                /> 

                <Item picker>
                    <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="arrow-down" color="#007aff" />}
                        style={{ width: undefined }}
                        selectedValue={country}
                        placeholder="Select your country"
                        placeholderStyle={{ color: '#007aff' }}
                        placeholderIconColor="#007aff"
                        onValueChange={(e) => setCountry(e)}
                    >
                        {countries.map((c) => {
                            return <Picker.Item
                                key={c.code}
                                label={c.name}
                                value={c.name}
                            />
                        })}
                    </Picker>
                </Item>
                <View style={{ width: '80%', alignItems: 'center' }}>
                    <Button
                        title="Confirm"
                        onPress={() => {
                            checkOut()
                        }}
                    />
                </View>
            </FormContainer>
        </KeyboardAwareScrollView>
    )
}
    
  
const mapStateToProps = (state) => {
    const { cartItems } = state;
    return {
        cartItems: cartItems,
    }
}
export default connect(mapStateToProps, null)(Checkout);
