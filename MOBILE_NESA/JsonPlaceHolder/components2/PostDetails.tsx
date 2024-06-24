import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  FlatList,
  SafeAreaView,
} from "react-native";
import { getComments, getPost } from "../services/api";
import tw from "twrnc";
interface Post {
  id: string;
  title: string;
  body: string;
  comments?: Comment[];
}

interface Comment {
  id: string;
  body: string;
}

interface PostDetailsProps {
  postId: string;
}

export const PostDetails: React.FC<PostDetailsProps> = ({ postId }) => {
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [postId]);

  const fetchPost = async () => {
    try {
      const response = await getPost(postId);
      setPost(response.data);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch post details");
    }
  };

  const fetchComments = async () => {
    // Fetch comments for the post
    try {
      const response = await getComments(postId)
        .then((res) => {
          setPost((prevPost) => {
            if (prevPost) {
              return {
                ...prevPost,
                comments: res.data,
              };
            }
            return prevPost;
          });
        })
        .then(() => console.log(post));
    } catch (error) {
      Alert.alert("Error", "Failed to fetch comments");
    }
  };

  if (!post) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={tw`font-bold text-lg text-blue-400 `}>
        Title:{" "}
        <Text style={tw`font-bold text-lg text-black`}>{post.title}</Text>
      </Text>
      <Text style={tw` text-blue-400 font-bold mt-2`}>
        Body: <Text style={tw`text-black font-light`}>{post.body}</Text>
      </Text>
      <Text style={styles.commentsHeader}>Comments:</Text>
      {post.comments && (
        <FlatList
          data={post.comments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Text style={tw`mb-4 border-2 p-3 border-blue-300 rounded`}>
              {item.body}
            </Text>
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    height: 600,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  body: {
    fontSize: 16,
    marginBottom: 16,
  },
  commentsHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  comment: {
    marginBottom: 8,
  },
});
