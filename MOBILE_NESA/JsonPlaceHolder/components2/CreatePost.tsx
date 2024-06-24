import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert, Text } from "react-native";
import { createPost } from "../services/api";
import tw from "twrnc";
interface CreatePostProps {
  onPostCreated: () => void;
}

export const CreatePost: React.FC<CreatePostProps> = ({ onPostCreated }) => {
  const [title, setTitle] = useState("");
  const [userId, setUserId] = useState(""); // Hardcoded user ID for now
  const [error, setError] = useState("");
  const [body, setBody] = useState("");

  const handleCreatePost = async () => {
    if (isNaN(parseInt(userId))) {
      setError("User ID must be a valid integer");
      setTimeout(() => {
        setError("");
      }, 1000);
      return;
    }
    if (!title || title.trim() === "" || title.trim().length < 3) {
      setError(
        "Title must not be empty and must be at least 3 characters long"
      );
      setTimeout(() => {
        setError("");
      }, 1000);
      return;
    }
    if (!body || body.trim() === "" || body.trim().length < 3) {
      setError("Body must not be empty and must be at least 3 characters long");
      setTimeout(() => {
        setError("");
      }, 1000);
      return;
    }
    try {
      await createPost(userId, title, body);
      Alert.alert("Success", "Post created successfully");
      setTitle("");
      setBody("");
      onPostCreated();
    } catch (error) {
      Alert.alert(
        "Error",
        (error as any).response?.data?.error || "An error occurred"
      );
    }
  };

  return (
    <View style={styles.container}>
      {error && <Text style={tw`text-red-500 mb-2`}>{error}</Text>}
      <TextInput
        style={styles.input}
        placeholder="User Id"
        value={userId}
        onChangeText={setUserId}
      />
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Body"
        value={body}
        onChangeText={setBody}
        multiline
      />
      <Button title="Create Post" onPress={handleCreatePost} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 16,
  },
});
