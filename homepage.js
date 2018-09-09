import React from 'react'
import {Text } from 'react-native'
import Login from './login'

export default class HomePage extends React.Component{
  render() {
    return (
      <Login navigation={this.props.navigation}></Login>
    );
  }
}