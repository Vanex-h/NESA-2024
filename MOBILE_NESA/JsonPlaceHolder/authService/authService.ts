import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password:string;
}

class AuthService {
  private users: User[] = [];

  async signup(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ): Promise<User> {
    // Check if user already exists
    if (this.users.find((u) => u.email === email)) {
      throw new Error("User already exists");
    }

    const newUser: User = {
      id: Date.now().toString(),
      firstName,
      lastName,
      email,
      password,
    };

    this.users.push(newUser);
    await AsyncStorage.setItem("currentUser", JSON.stringify(newUser));
    return newUser;
  }

  async login(email: string, password: string): Promise<User> {
    const user = this.users.find((u) => u.email === email);
    if (!user) {
      throw new Error("User not found");
    }
  
    if (user.password !== password) {
      throw new Error("Incorrect password");
    }
  
    await AsyncStorage.setItem("currentUser", JSON.stringify(user));
    return user;
  }

  async logout(): Promise<void> {
    await AsyncStorage.removeItem("currentUser");
  }

  async getCurrentUser(): Promise<User | null> {
    const userString = await AsyncStorage.getItem("currentUser");
    return userString ? JSON.parse(userString) : null;
  }
}

export const authService = new AuthService();
