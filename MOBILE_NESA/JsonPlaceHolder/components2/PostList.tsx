import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import { getPosts, deletePost } from "../services/api";
import tw from "twrnc";
interface Post {
  id: string;
  title: string;
  body: string;
}

interface PostListProps {
  onPostPress: (post: Post) => void;
  onRefresh: () => void;
  handleActiveScreen: (screen: string) => void;
}

export const PostList: React.FC<PostListProps> = ({
  onPostPress,
  onRefresh,
  handleActiveScreen,
}) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await getPosts();
      setPosts(response.data);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch posts");
    }
  };

  const handleDeletePost = async (id: string) => {
    try {
      await deletePost(id);
      setPosts(posts.filter((post) => post.id !== id));
      Alert.alert("Success", "Post deleted successfully");
      onRefresh();
    } catch (error) {
      Alert.alert("Error", "Failed to delete post");
    }
  };

  const renderItem = ({ item }: { item: Post }) => (
    <View style={tw`p-3  border-b-2 border-gray-200`}>
      <TouchableOpacity
        onPress={() => {
          onPostPress(item);
          handleActiveScreen("postDetail");
        }}
      >
        <Text style={styles.postTitle}>{item.title}</Text>
        <Text numberOfLines={2}>{item.body}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDeletePost(item.id)}>
        <Text
          style={tw`border border-red-300 w-30 text-center p-2 mt-2 rounded-md text-red-300`}
        >
          Delete
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={posts}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      onRefresh={fetchPosts}
      refreshing={false}
    />
  );
};

const styles = StyleSheet.create({
  postItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  deleteButton: {
    color: "red",
    marginTop: 8,
  },
});
