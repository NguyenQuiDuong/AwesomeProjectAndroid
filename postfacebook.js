import React from 'react';
import { Text, ScrollView,  } from 'react-native';


class PostFaceBook extends React.Component{

    constructor(props) {
        super(props);
    }

    render(){
        // this.renderData();
        return (
            <ScrollView>
                {this.renderData()}
            </ScrollView>
        );
    }

    renderData(){
        let elementReturn =[];
        if(this.props.data.length>0){
            this.props.data.forEach(element => {
                // console.warn(element);
                elementReturn.push(<Text h4>{element.message}</Text>);
            });
        }
        return elementReturn;
    }
}

export default PostFaceBook;