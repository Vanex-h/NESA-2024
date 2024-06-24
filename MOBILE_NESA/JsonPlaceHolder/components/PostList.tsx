import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { api, Post } from '../utils/api';
import { authService } from '../authService/authService';

interface PostListProps {
  onPostPress: (post: Post) => void;
}

export const PostList: React.FC<PostListProps> = ({ onPostPress }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      if (!currentUser) {
        throw new Error('User not authenticated');
      }
      const fetchedPosts = await api.getPosts();
      const userPosts = fetchedPosts.filter(post => post.userId === parseInt(currentUser.id));
      setPosts(userPosts);
    } catch (error) {
      Alert.alert('Error', 'user not authenticated');
    }
  };

  const handleDeletePost = async (id: number) => {
    try {
      await api.deletePost(id);
      setPosts(posts.filter(post => post.id !== id));
      Alert.alert('Success', 'Post deleted successfully');
    } catch (error) {
      Alert.alert('Error', 'Post was not deleted');
    }
  };

  const renderItem = ({ item }: { item: Post }) => (
    <View style={styles.postItem}>
      <TouchableOpacity onPress={() => onPostPress(item)}>
        <Text style={styles.postTitle}>{item.title}</Text>
        <Text numberOfLines={2}>{item.body}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDeletePost(item.id)}>
        <Text style={styles.deleteButton}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={posts}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  postItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  deleteButton: {
    color: 'red',
    marginTop: 8,
  },
});