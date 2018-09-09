import React from 'react';
import { StyleSheet, Text, TextInput, ScrollView, ActivityIndicator  } from 'react-native';
import {Button, FormInput, SocialIcon   } from 'react-native-elements';
import FBSDK, { AccessToken,LoginManager, LoginButton} from 'react-native-fbsdk'

class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errorMessage: null,
            isLoginFacebook: false,
            titleLoginFaceBookBtn: 'Login With Facebook',
            isLoggingIn: false,
        };
        AccessToken.getCurrentAccessToken().then(
            (data) => {
                if(data == null){
                    this.setState({
                        isLoginFacebook: false
                    })
                }else{
                    this.setState({
                        isLoginFacebook: true,
                        titleLoginFaceBookBtn: 'Logout Facebook',
                    })
                }
            }
        )
    }

    handleLogin = () => {
        const that = this;
        this.setState({ isLoggingIn: true, errorMessage: '' });

        var params = {
            email: this.state.email,
            password: this.state.password,
        };

        fetch("http://192.168.1.3/api/login", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params),
            })
            .then(function(response){
                if(response.status == 401){
                    that.setState({ 
                        errorMessage: "Wrong email or password!",
                        isLoggingIn: false
                    });
                }
                if(response.status == 200){
                    let responseJson = response.json();
                    that.props.navigation.navigate('UserProfile',{
                        accessToken: responseJson.success.token,
                        navigation: that.props.navigation
                    })
                };
            })
            .then(() => {
                that.setState({ isLoggingIn: false });
            })
            .catch(err => {
                that.setState({ 
                    errorMessage: err.message,
                    isLoggingIn: false
                });
			});
    }

    facebookAction(){
        const that = this
        if(this.state.isLoginFacebook == false){
            LoginManager.logInWithReadPermissions(['public_profile','user_photos'])
            .then(
                function(result) {
                if (result.isCancelled) {
                    } else {
                    AccessToken.getCurrentAccessToken().then(
                    (data) => {
                        let accessToken = data.accessToken;
                    //   console.warn(accessToken);
                    that.setState({
                        isLoginFacebook: true
                    });
                        that.props.navigation.navigate('UserProfile',{
                            accessTokenFB: accessToken,
                            navigation: that.props.navigation
                        })
                    })
                    }
                },
                function(error) {
                console.warn('Login fail with error: ',error);
                });
        }else{
            LoginManager.logOut();
            that.setState({
                isLoginFacebook: false,
                titleLoginFaceBookBtn: 'Login With Facebook',
            });
            console.warn(that.state.titleLoginFaceBookBtn);
        }
    }

    render(){
        return(  <ScrollView  style={{padding: 20}}>
            <Text h1>Login</Text>
            {/* {this.state.errorMessage && (<Text style={{ color: 'red' }}>AA: {this.state.errorMessage}</Text>)} */}
            <Text style={{ color: 'red' }}>{this.state.errorMessage}</Text>
            <FormInput
                style={styles.textInput}
                autoCapitalize="none"
                placeholder="Email"
                onChangeText={email => this.setState({ email })}
                value={this.state.email}
            />
            <FormInput
                secureTextEntry
                style={styles.textInput}
                autoCapitalize="none"
                placeholder="Password"
                onChangeText={password => this.setState({ password })}
                value={this.state.password}
            />
            {this.state.isLoggingIn && <ActivityIndicator />}
            <Button title="Login" disabled={this.state.isLoggingIn||!this.state.email||!this.state.password} onPress={this.handleLogin} buttonStyle={styles.loginbtn}/>
            <SocialIcon onPress={() => this.facebookAction()} title={this.state.titleLoginFaceBookBtn} button type='facebook' style={styles.facebook}/>
            <Text onPress={() => this.props.navigation.navigate('Register',{navigation: this.props.navigation})}>Don't have an account? Sign Up</Text>
        </ScrollView >
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
        width: '50%',
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 8,
        marginRight: 15,
        marginLeft: 15
    },
    loginbtn: {
        width: '80%',
        backgroundColor: "#2089dc"
    },
    facebook: {
        width: '80%'
    }
})

export default Login;