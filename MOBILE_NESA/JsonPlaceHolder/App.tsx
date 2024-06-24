import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Button,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TouchableWithoutFeedback,
} from "react-native";

import { Signup } from "./components2/Signup";
import { Login } from "./components2/Login";
import { PostDetails } from "./components2/PostDetails";
import { CreatePost } from "./components2/CreatePost";
import { PostList } from "./components2/PostList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import tw from "twrnc";
import { getProfile, formatDateString } from "./services/api";

interface Post {
  id: string;
  title: string;
  body: string;
}

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [activeScreen, setActiveScreen] = useState("Home");
  const [profileData, setProfileData] = useState<any | null>(null);

  useEffect(() => {
    checkLoginStatus();
    getProfile().then((res) => setProfileData(res.data));
  }, [isLoggedIn]);

  const checkLoginStatus = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    setIsLoggedIn(!!userToken);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleSignup = () => {
    setIsLoggedIn(true);
    setShowSignup(false);
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("userToken");
    setIsLoggedIn(false);
  };

  const handleRefresh = () => {
    setSelectedPost(null);
    setActiveScreen("Home");
  };

  if (!isLoggedIn) {
    return (
      <View style={tw`w-full flex flex-col justify-center`}>
        {showSignup ? (
          <>
            <Signup onSignup={handleSignup} />
            <TouchableOpacity
              style={tw`self-center  text-blue-500 py-2 px-4 rounded-md text-center`}
              onPress={() => setShowSignup(false)}
            >
              <Text style={tw` text-blue-500 h-6`}>
                Already have an account? Login
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Login onLogin={handleLogin} />
            <TouchableOpacity
              style={tw`self-center  text-blue-500 py-2 px-4 rounded-md text-center`}
              onPress={() => setShowSignup(true)}
            >
              <Text style={tw` text-blue-500 h-6`}>
                Don't have an account? Sign Up
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* <Button title="Logout" onPress={handleLogout} /> */}
      <View style={tw`flex-row justify-between`}>
        <Text style={tw`my-5 font-bold text-xl ml-4 text-blue-400`}>JApp</Text>
        {activeScreen === "postDetail" && (
          <TouchableOpacity onPress={handleRefresh} style={tw`my-5 mr-4`}>
            <Text style={tw`font-bold text-sm`}>Back to posts</Text>
          </TouchableOpacity>
        )}
      </View>
      {selectedPost ? (
        <PostDetails postId={selectedPost.id} />
      ) : activeScreen === "Home" ? (
        <PostList
          onPostPress={setSelectedPost}
          handleActiveScreen={setActiveScreen}
          onRefresh={handleRefresh}
        />
      ) : activeScreen === "createPost" ? (
        <CreatePost onPostCreated={handleRefresh} />
      ) : (
        <View style={tw`flex h-full gap-5 p-3`}>
          <Text style={tw`text-blue-400 text-lg`}>
            Your name:{" "}
            <Text style={tw`text-black`}>{profileData.username}</Text>
          </Text>
          <Text style={tw`text-blue-400 text-lg`}>
            Your email: <Text style={tw`text-black`}>{profileData.email}</Text>
          </Text>
          <Text style={tw`text-blue-400 text-lg`}>
            You joined:{" "}
            <Text style={tw`text-black`}>
              {formatDateString(profileData.createdAt).slice(0, 13)}
            </Text>
          </Text>

          <TouchableOpacity
            onPress={handleLogout}
            style={tw`w-1/2 self-center bg-blue-400 text-white py-2 px-4 rounded-md text-center`}
          >
            <Text style={tw`text-center text-white`}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}

      <View
        style={tw`flex-row justify-between p-3 absolute bottom-0 w-full bg-white `}
      >
        <TouchableOpacity
          style={tw`bg-blue-400 p-2 px-4 rounded-md`}
          onPress={() => setActiveScreen("Home")}
        >
          <Text style={tw`text-white`}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`bg-blue-400 p-2 px-4 rounded-md`}
          onPress={() => setActiveScreen("createPost")}
        >
          <Text style={tw`text-white`}>Create post</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`bg-blue-400 p-2 px-4 rounded-md`}
          onPress={() => setActiveScreen("profile")}
        >
          <Text style={tw`text-white`}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
    paddingTop: 16,
  },
});

export default App;
