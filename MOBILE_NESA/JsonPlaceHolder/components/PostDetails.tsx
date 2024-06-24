import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import { api, Post, Comment } from '../utils/api';

interface PostDetailsProps {
  post: Post;
}

export const PostDetails: React.FC<PostDetailsProps> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const fetchedComments = await api.getComments(post.id);
      setComments(fetchedComments);
    } catch (error) {
    //   Alert.alert('Error', error.message);
    Alert.alert('Error', 'Failed to fetch comments');
    }
  };

  const renderComment = ({ item }: { item: Comment }) => (
    <View style={styles.commentItem}>
      <Text style={styles.commentName}>{item.name}</Text>
      <Text style={styles.commentEmail}>{item.email}</Text>
      <Text>{item.body}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.postTitle}>{post.title}</Text>
      <Text style={styles.postBody}>{post.body}</Text>
      <Text style={styles.commentsHeader}>Comments:</Text>
      <FlatList
        data={comments}
        renderItem={renderComment}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  postTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  postBody: {
    fontSize: 16,
    marginBottom: 16,
  },
  commentsHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  commentItem: {
    marginBottom: 16,
  },
  commentName: {
    fontWeight: 'bold',
  },
  commentEmail: {
    color: '#666',
    marginBottom: 4,
  },
});