import React from 'react';
import { createStackNavigator } from 'react-navigation';
import HomePage from './homepage';
import Login from './login';
import Register from './register';
import UserProfile from './userprofile';

class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

const RootStack = createStackNavigator(
  {
  Home: HomePage,
  Login:Login,
  Register: Register,
  UserProfile: UserProfile,
  },
  {
    initialRouteName: 'Home',
  }
);

export default App;