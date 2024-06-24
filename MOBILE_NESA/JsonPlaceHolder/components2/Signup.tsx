import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { signup } from "../services/api";
import { Text, TouchableOpacity, Image } from "react-native";
import { Toast } from "react-native-toast-notifications";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import tw from "twrnc";

interface SignupProps {
  onSignup: () => void;
}

export const Signup: React.FC<SignupProps> = ({ onSignup }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [error1, setError1] = useState("");
  const handleSignup = async () => {
    if (!username || !email || !password) {
      setError("Please fill in all fields");
      setTimeout(() => {
        setError("");
      }, 1000);
      return;
    }
    if (username.length < 3 || username.trim() === "") {
      setError("Username must be at least 3 characters long and not empty");
      setTimeout(() => {
        setError("");
      }, 1000);
      return;
    }
    const isEmailValid = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    if (!isEmailValid(email)) {
      setError("Please enter a valid email address");
      setTimeout(() => {
        setError("");
      }, 1000);
      return;
    }
    const isPasswordValid = (password: string) => {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      return passwordRegex.test(password);
    };

    if (!isPasswordValid(password)) {
      setError(
        "Invalid password. Password must contain at least 8 characters, including at least one lowercase letter, one uppercase letter, and one digit."
      );
      setTimeout(() => {
        setError("");
      }, 1000);
      return;
    }

    try {
      await signup(username, email, password);
      Alert.alert("Success", "Account created successfully");
      onSignup();
    } catch (error) {
      Alert.alert(
        "Error",
        (error as any).response?.data?.error || "An error occurred"
      );
    }
  };

  return (
    <View style={tw`items-center p-4 bg-white h-11/12`}>
      <Image
        source={require("./style/Signup-amico.png")}
        resizeMode="cover"
        style={tw`items-center h-1/3 w-full p-4 bg-white`}
      />
      <View style={tw`justify-center items-center w-full h-2/3`}>
        <Text style={tw`text-2xl font-bold mb-4`}>Sign Up</Text>
        {error && <Text style={tw`text-red-500 mb-2`}>{error}</Text>}

        <View
          style={tw`flex flex-row items-center w-full px-3 py-2 border border-gray-300 rounded-md mb-4 h-12`}
        >
          <AntDesign name="user" size={24} color="black" />

          <TextInput
            style={tw`w-full px-3 py-2 `}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
        </View>
        {/* {error && <Text style={tw`text-red-500 mb-2`}>{error}</Text>} */}

        <View
          style={tw`flex flex-row items-center w-full px-3 py-2 border border-gray-300 rounded-md mb-4 h-12`}
        >
          <AntDesign name="mail" size={24} color="black" />

          <TextInput
            style={tw`w-full px-3 py-2`}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            // autoCompleteType="email"
          />
        </View>
        {error1 && <Text style={tw`text-red-500 mb-2`}>{error1}</Text>}
        <View
          style={tw`flex flex-row items-center w-full px-3 py-2 border border-gray-300 rounded-md mb-4 h-12`}
        >
          <MaterialIcons name="password" size={24} color="black" />

          <TextInput
            style={tw`w-full px-3 py-2 `}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        {/* {error && <Text style={tw`text-red-500 mb-2`}>{error}</Text>} */}
        <TouchableOpacity
          style={tw`w-full bg-blue-500 text-white py-2 px-4 rounded-md text-center`}
          onPress={handleSignup}
        >
          <Text style={tw`text-white text-base m-auto font-bold`}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
