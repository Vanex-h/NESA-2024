import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { login } from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons";
import { Text, TouchableOpacity, ImageBackground, Image } from "react-native";
import { Toast } from "react-native-toast-notifications";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import tw from "twrnc";
import { authService } from "../authService/authService";

interface LoginProps {
  onLogin: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [error, setError] = useState("");
  const [error1, setError1] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill in all fields");
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
    try {
      const response = await login(email, password);
      await AsyncStorage.setItem("userToken", response.data.token);
      onLogin();
    } catch (error) {
      Alert.alert(
        "Error",
        (error as any).response?.data?.error || "An error occurred"
      );
    }
  };

  return (
    <View style={tw`items-center p-4 bg-white`}>
      <Image
        source={require("./style/Login-amico.png")}
        resizeMode="cover"
        style={tw`items-center h-1/2 w-full p-4 bg-white`}
      />

      <View style={tw`justify-center items-center  w-full`}>
        <Text style={tw`text-2xl font-bold mb-4`}>Log In</Text>
        {error && <Text style={tw`text-red-500 mb-2`}>{error}</Text>}
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
          />
        </View>
        <View
          style={tw`flex flex-row items-center w-full px-3 py-2 border border-gray-300 rounded-md mb-4 h-12`}
        >
          {passwordVisible ? (
            <AntDesign
              name="eyeo"
              size={24}
              color="black"
              onPress={() => setPasswordVisible((prev) => !prev)}
            />
          ) : (
            <Feather
              name="eye-off"
              size={24}
              color="black"
              onPress={() => setPasswordVisible((prev) => !prev)}
            />
          )}
          {/* <AntDesign name="eyeo" size={24} color="black" /> */}

          <TextInput
            style={tw`w-full px-3 py-2 `}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        <TouchableOpacity
          style={tw`w-full bg-blue-500 text-white py-2 px-4 rounded-md text-center`}
          onPress={handleLogin}
        >
          <Text style={tw`text-white text-base m-auto font-bold`}>Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
