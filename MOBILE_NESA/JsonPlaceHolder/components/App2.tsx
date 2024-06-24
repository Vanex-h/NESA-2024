import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Post } from '../JsonPlaceholderApp/utils/api';
import { PostDetails } from './components/PostDetails';
import { CreatePost } from './components/CreatePost';
import { PostList } from './components/PostList';
import Posts from './components/Posts';
import Login from './components/Login';
import Signup from './components/Signup';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" >
        <Stack.Screen name="Posts" component={Posts} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
