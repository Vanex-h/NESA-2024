import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import { CreatePost } from './CreatePost';
import { PostList } from './PostList';
import { PostDetails } from './PostDetails';
import { Post } from '../utils/api';
import { authService } from '../authService/authService';
import Signup from './Signup';
import Login from './Login';
import { AntDesign } from '@expo/vector-icons';


const Posts: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ firstName: string, lastName:string ; email: string } | null>(null);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    const user = await authService.getCurrentUser();
    setIsLoggedIn(!!user);
    setCurrentUser(user);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    checkLoginStatus();
  };

  const handleSignup = () => {
    setIsLoggedIn(true);
    setShowSignup(false);
    checkLoginStatus();
  };

  const handleLogout = async () => {
    await authService.logout();
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  if (!isLoggedIn) {
    return (
      <View style={styles.container}>
        {showSignup ? (
          <>
            <Signup onSignup={handleSignup} />
            <Button title="Already have an account? Login" onPress={() => setShowSignup(false)} />
          </>
        ) : (
          <>
            <Login onLogin={handleLogin} />
            <Button title="Don't have an account? Sign Up" onPress={() => setShowSignup(true)} />
          </>
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Text>Welcome, {currentUser?.firstName}!</Text>
        <Text>{currentUser?.email}</Text>
        <Button title="Logout" onPress={handleLogout} />
      </View>
      {selectedPost ? (
        <>
        <AntDesign
            name="closecircle"
            size={24}
            color="black"
            onPress={() => setSelectedPost(null)}
          />
          <PostDetails post={selectedPost} /></>
      ) : (
        <>
          <CreatePost />
          <PostList onPostPress={setSelectedPost} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  userInfo: {
    marginBottom: 16,
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
  },
});

export default Posts;