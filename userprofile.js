import React from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-elements'
import { GraphRequest, GraphRequestManager} from 'react-native-fbsdk'
import PostFaceBook from './postfacebook';

class UserProfile extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            userName:null,
            email:null,
            data: [],
        }
        this.callGraphAPIFacebook();
    }

    render(){
        const accessTokenFB = this.props.navigation.getParam('accessTokenFB', 'NO-AccessTokenFB');
        return (
            <View>
                <Text h2>UserProfile of : {this.state.userName?this.state.userName:this.props.name}</Text>
                <Text h4>accessTokenFB: {accessTokenFB}</Text>
                <PostFaceBook data={this.state.data}></PostFaceBook>
            </View>
        )
    }

    callGraphAPIFacebook(){
        const that = this;
        const infoRequest = new GraphRequest(
            '/me?fields=feed.limit(10),name',
            null,
            function(error,result){
                if (error) {
                    alert('Error fetching data: ' + error.toString());
                  } else {
                    that.setState({
                      userName : result.name,
                      data: result.feed.data
                    });
                  }
            },
          );
                
          new GraphRequestManager().addRequest(infoRequest).start();
    }


    // _responseInfoCallback(error: ?Object, result: ?Object, that: ?Object) {
    //     if (error) {
    //       alert('Error fetching data: ' + error.toString());
    //     } else {
    //       console.warn('Success fetching data: ' + result.name);
    //     //   that.setState({
    //     //     userName : result.name
    //     //   });
    //     }
    // }
}

export default UserProfile;