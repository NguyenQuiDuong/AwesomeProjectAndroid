import React from 'react';
import { StyleSheet, ScrollView, View, ActivityIndicator } from 'react-native';
import { Text, FormInput, Button } from 'react-native-elements';

class Register extends React.Component{

    constructor(props) {
        super(props);
    
        this.state = {
          user: {
                 name: null,
                 email:null,
                phone: null,
             password: null,
             c_password: null,
          },
          isLoading: false,
          messages: []
        };
    }

    render(){
        return (
            <ScrollView  style={{padding: 20}}>
                <Text h2>Register</Text>
                <View>{this.renderMessages()}</View>
                <FormInput
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholder="Full Name"
                    onChangeText={(text) => this.state.user.name = text}
                    value={this.state.user.name}
                />
                <FormInput
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholder="Email"
                    onChangeText={(text) => this.state.user.email = text}
                    value={this.state.user.email}
                />
                <FormInput
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholder="Phone Number"
                    onChangeText={(text) => this.state.user.phone = text}
                    value={this.state.user.phone}
                />
                <FormInput
                    secureTextEntry
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholder="Password"
                    onChangeText={(text) => this.state.user.password = text}
                    value={this.state.user.password}
                />
                <FormInput
                    secureTextEntry
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholder="Password Confirmation"
                    onChangeText={(text) => this.state.user.c_password = text}
                    value={this.state.user.c_password}
                />
                {this.state.isLoading && <ActivityIndicator />}
                <Button title="Sign up" onPress={this.handleSignUp} buttonStyle={styles.signupbtn}/>

            </ScrollView>
        )
    }

    disabledSignUpBtn(){
        return !this.state.user.name||!this.state.user.email||!this.state.user.phone||!this.state.user.password||!this.state.user.c_password;
    }

    handleSignUp = () => {
        const that = this;
        this.setState({ isLoading: true });
        var params = {
            name:this.state.user.name,
            email: this.state.user.email,
            phone:this.state.user.phone,
            password: this.state.user.password,
            c_password:this.state.user.c_password
        };

        fetch("http://192.168.1.3/api/register", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params),
            })
            .then(response => {
                const statusCode = response.status;
                const data = response.json();
                return { statusCode, data };})
            .then(function(responseJson){
                if(responseJson.statusCode == 401){
                    console.warn(responseJson);
                    that.setState({ 
                        messages: response.error,
                    });
                }
                if(responseJson.statusCode == 200){
                    console.warn(responseJson.statusCode);
                    that.props.navigation.navigate('UserProfile',{
                        accessToken: responseJson.success.token,
                        name: responseJson.success.name,
                        navigation: that.props.navigation
                    })
                };
            })
            .then(() => {
                that.setState({ isLoading: false });
            })
            .catch(err => {
                that.setState({ 
                    isLoading: false
                });
			});
    }

    renderMessages(){
        if (this.state.messages.length > 0) {
            let messages = this.state.messages.map((val, key) => {
              if (val.message) return <Text style={styles.message} key={key}>{val.message}</Text>;
            });
      
            return messages;
        }
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
    signupbtn: {
        width: '80%',
        backgroundColor: "#2089dc"
    },
    message:{ color: 'red' },
})

export default Register;