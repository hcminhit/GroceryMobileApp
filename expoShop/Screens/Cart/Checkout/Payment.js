import React, {useState} from 'react';
import { Container, Header, Content, ListItem, Text, Radio, Right, Left, Picker, Icon, Body, Title } from 'native-base';
import {View, Button} from 'react-native';
const methods = [
    { name: 'Cash on Delivery', value: 1 },
    { name: 'Bank Transfer', value: 2 },
    {name:"Card Payment", value: 3}
]
const paymentCards = [
    { name: 'Wallet', value: 1 },
    { name: 'Visa', value: 2 },
    { name: 'Mastercard', value: 3 },
    {name:'Other', value: 4}
]
const Payment = (props) => {
    const order = props.route.params;
    const [selected, setSelected] = useState();
    const [card, setCard] = useState();
    return (
        <Container>
            <Header>
                <Body>
                    <Title>Chooose your payment methods</Title>
                </Body>
            </Header>
            <Content>
                {methods.map((item, index) => {
                    return (
                        <ListItem onPress={() => setSelected(item.value)}
                        key={Math.random().toString()}
                        >
                            <Left
                            key={index}
                            >
                                <Text>{item.name}</Text>       
                            </Left>
                            <Right
                            key={index+1}
                            >
                                <Radio
                                selected={selected==item.value}
                                />
                            </Right>
                        </ListItem>
                    )
                })}
                {selected == 3 ? (
                    <Picker
                        mode="dropdown"
                        iosIcon={<Icon
                        name={'arrow-down'}    
                        />}
                        headerStyle={{ backgroundColor: 'orange' }}
                        headerBackButtonText={{ color: '#fff' }} 
                        headerTitleStyle={{ color: '#fff' }}
                        selectedValue={card}
                        onValueChange={(x)=>setCard(x)}
                    >
                        {paymentCards.map((c, index) => {
                            return (
                             <Picker.Item
                                    label={c.name} value={c.name} key={c.value}      
                            />
                        )
                        })}
                    </Picker>
                ) : null}
                <View style={{marginTop: 60, alignSelf: 'center'}}>
                    <Button
                        title="Confirm"
                        onPress={()=>props.navigation.navigate('Confirm',{order: order})}
                    />
                </View>
            </Content>
        </Container>
    )
}
export default Payment