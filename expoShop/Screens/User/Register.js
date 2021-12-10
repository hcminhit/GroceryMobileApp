import React ,{useState} from'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import FormContainer from '../../Shared/Form/FormContainer';
import Input from '../../Shared/Form/Input';
import Error from '../../Shared/Error';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from 'axios';
import baseURL from '../../assets/common/baseURL';
import Toast from 'react-native-toast-message';
const Register = (props) => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [phone, setPhone] = useState("");

    const handleSubmit = () => {
        if (email === '' ||
            name === '' ||
            password === '' ||
            phone === '') {
                setError('Please fill in the form correctly')
        }
        let user = {
            name: name,
            email: email,
            password: password,
            phone: phone,
            isAdmin: false,
        }
        axios
            .post(`${baseURL}users/register`, user)
            .then((res) => {
                if (res.status == 200) {
                    Toast.show({
                        topOffset: 60,
                        type: "success",
                        text1: "Registration succeeded",
                        text2: "Please login tin your account"
                    })
                    setTimeout(() => {
                        props.navigation.navigate('Login')
                    }, 2000)
                }
            }).catch((error) => {
                Toast.show({
                    topOffset: 60,
                    type: "error",
                    text1: "Something went wrong",
                    text2: "Please try again"
                })
            })
    }
   
    return (
        <KeyboardAwareScrollView
            viewIsInsideTabBar={true}
            extraHeight={200}
            enableOnAndroid={true}
        >
            <FormContainer
                title={"Register"}
            >
                <Input
                    placeholder={"Email"}
                    id="email"
                    onChangeText={(text) => {
                        setEmail(text.toLowerCase())
                    }}
                    value={email}
                />
                <Input
                    placeholder={"Name"}
                    id="name"
                    name={"name"}
                    onChangeText={(text) => {
                        setName(text)
                    }}
                    value={name}
                />
                <Input
                    placeholder={"Phone Number"}
                    id="phone"
                    name={"phone"}
                    keyboardType={"numeric"}
                    onChangeText={(text) => {
                        setPhone(text)
                    }}
                    value={phone}
                />
                <Input
                    placeholder={"Password"}
                    id="password"
                    name={"password"}
                    onChangeText={(text) => {
                        setPassword(text)
                    }}
                    secureTextEntry={true}
                    value={password}
                />
                <View style={styles.buttonGroup}>
                    {error ? <Error
                        message={error}
                    /> : null}
                    <Button
                        title="Register"
                        onPress={() => {
                            handleSubmit()
                        }}
                    />
                </View>
                <View style={styles.buttonGroup}>
                    <Button
                        title={"Back to Login"}
                        onPress={() => {
                            props.navigation.navigate("Login")
                        }}
                    />
                </View>

            </FormContainer>
        </KeyboardAwareScrollView>
    )
}
const styles = StyleSheet.create({
    buttonGroup: {
        width: "80%",
        margin: 10,
        alignItems: 'center',
    }
})
export default Register