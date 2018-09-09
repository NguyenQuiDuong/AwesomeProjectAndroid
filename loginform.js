import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Button, FormInput, FormValidationMessage } from 'react-native-elements'

class LoginForm extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errorMessage: null
        };
    }

    handleLogin = () => {

    }
    
    render(){
        return(  <View style={styles.container}>
            <Text>Login</Text>
            {this.state.errorMessage &&
                <Text style={{ color: 'red' }}>
                    {this.state.errorMessage}
                </Text>}
            <TextInput
                style={styles.textInput}
                autoCapitalize="none"
                placeholder="Email"
                onChangeText={email => this.setState({ email })}
                value={this.state.email}
            />
            <TextInput
                secureTextEntry
                style={styles.textInput}
                autoCapitalize="none"
                placeholder="Password"
                onChangeText={password => this.setState({ password })}
                value={this.state.password}
            />
            <Button title="Login" onPress={this.handleLogin} />
            <Button
                title="Don't have an account? Sign Up"
                onPress={() => this.props.navigation.navigate('Register')}
            />
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        height: 40,
        width: '90%',
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 8
    }
})

export default LoginForm;