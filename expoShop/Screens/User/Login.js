import React,{useState, useContext, useEffect} from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import FormContainer from '../../Shared/Form/FormContainer';
import Input from '../../Shared/Form/Input';
import Error from '../../Shared/Error';
import Auth_Global from '../../context/Store/Auth_Global';
import {loginUser} from  '../../context/Actions/Auth_actions'
const Login = (props) => {
    const context= useContext(Auth_Global)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError]=useState('');
    const handleSubmit = () => {
        const user = {
            email,
            password
        }
        if (email === "" || password === "") {
            setError("Please fill in your credential");
        } else {
            loginUser(user, context.dispatch);
        }
    }
    useEffect(() => {
        if (context.stateUser.isAuthenticated === true) {
            props.navigation.navigate("UserProfile");
        }
    },[context.stateUser.isAuthenticated])
    return (
        <FormContainer
        title={"Login"}
        >
            <Input
                placeholder={"Enter Email"}
                name={"Email"}
                id={"email"}
                value={email}
                onChangeText={(text) =>setEmail(text)}
            />
            <Input
                placeholder={"Enter Password"}
                name={"password"}
                id={"password"}
                secureTextEntry={true}
                value={password}
                onChangeText={(text) =>setPassword(text)}
            />
            <View style={styles.buttonGroup}>
                {error ? <Error
                message={error}
                />:null}
                <Button
                    title="Login"
                    onPress={() => {
                        handleSubmit()
                    }}
                />
            </View>
            <View style={[{ margin: 40 }, styles.buttonGroup ]}>
                <Text style={styles.middleText}> Dont have an account yet?</Text>
                <Button title={"Register"}
                    onPress={() => {
                    props.navigation.navigate("Register")
                }}
                />
            </View>

        </FormContainer>
    )
}
const styles= StyleSheet.create({
    buttonGroup: {
        width: "80%", 
        alignItems:'center'
    },
    middleText: {
        marginBottom: 20, 
        alignSelf:'center'
    }
})
export default Login