import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://10.5.223.169:3000/api"; // Use this for Android emulator
// const API_URL = 'http://localhost:3000/api'; // Use this for iOS simulator

const api = axios.create({
  baseURL: API_URL,
});
const api2 = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("userToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const login = (email: string, password: string) =>
  api.post("/users/login", { email, password });

export const signup = (username: string, email: string, password: string) =>
  api.post("/users/signup", { username, email, password });

export const createPost = (userId: string, title: string, body: string) =>
  api2.post("/posts", { userId, title, body });

export const getPosts = () => api2.get("/posts");

export const getPost = (id: string) => api2.get(`/posts/${id}`);

export const deletePost = (id: string) => api2.delete(`/posts/${id}`);

export const getComments = (id: string) => api2.get(`/posts/${id}/comments`);

export const getProfile = () => api.get("/users/profile");

export function formatDateString(dateString: string): string {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = months[date.getMonth()];
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${month} ${day}, ${year}, ${hours}:${minutes}`;
}

export default api;
