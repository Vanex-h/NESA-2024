import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
  Alert,
} from "react-native";
import { Toast } from "react-native-toast-notifications";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import tw from "twrnc";
import { authService } from "../authService/authService";

interface LoginProps {
  onLogin: () => void;
}

const Login = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [error1, setError1] = useState("");

  // const handleSubmit  = async () => {

  //     const response = await fetch("http://192.168.1.102:2000/users/login", {
  //       method: "POST",
  //       body: JSON.stringify({
  //         email,
  //         password,
  //       }),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (response.status === 200) {
  //       Toast.show("Logged in Successfully", { type: "success" });
  //       navigation.push("Welcome");
  //     } else {
  //       setError("Invalid credentials");
  //       setTimeout(() => {
  //         setError("");
  //       }, 1000);
  //       Toast.show("Failed to log in", { type: "fail" });
  //     }
  //   };

  const handleLogin = async () => {
    try {
      await authService.login(email, password);
      // Toast.show("Logged in Successfully", { type: "success" });
      navigation.push("Posts");
    } catch (error1) {
      setError("Invalid credentials");
        setTimeout(() => {
          setError("");
        }, 1000);
        // Toast.show("Failed to log in", { type: "fail" });
      Alert.alert("Error", );
    }
  };
  return (
    <View style={tw`items-center p-4 bg-white h-full`}>
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
            // autoCompleteType="email"
            onBlur={() => {
              // Email validation logic here
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!emailRegex.test(email)) {
                // Handle invalid email input here
                setError1("Invalid email");
                setTimeout(() => {
                  setError("");
                }, 1000);
              } else {
                setError1("");
              }
            }}
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
        <TouchableOpacity
          style={tw`w-full bg-blue-500 text-white py-2 px-4 rounded-md text-center`}
          onPress={handleLogin}
        >
          <Text style={tw`text-white text-base m-auto font-bold`}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`mt-4 hover:text-blue-400`}
          onPress={() => navigation.push("Signup")}
        >
          <Text>
            Don't have an account? <Text style={tw`text-blue-500`}>SignUp</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
