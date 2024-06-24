import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { User } from "../types";

export const authService = {
  async signup(
    username: string,
    email: string,
    password: string
  ): Promise<User> {
    const userCredential = await auth().createUserWithEmailAndPassword(
      email,
      password
    );
    const user = userCredential.user;
    await firestore()
      .collection("users")
      .doc(user.uid)
      .set({ username, email });
    return { id: user.uid, username, email };
  },

  async login(email: string, password: string): Promise<User> {
    const userCredential = await auth().signInWithEmailAndPassword(
      email,
      password
    );
    const user = userCredential.user;
    const userDoc = await firestore().collection("users").doc(user.uid).get();
    const userData = userDoc.data();
    return { id: user.uid, username: userData?.username, email: user.email! };
  },

  async logout(): Promise<void> {
    await auth().signOut();
  },

  async getCurrentUser(): Promise<User | null> {
    const user = auth().currentUser;
    if (user) {
      const userDoc = await firestore().collection("users").doc(user.uid).get();
      const userData = userDoc.data();
      return { id: user.uid, username: userData?.username, email: user.email! };
    }
    return null;
  },
};
