export interface User {
  id: string;
  username: string;
  email: string;
  // password: string;
}

export interface Post {
  id: string;
  title: string;
  body: string;
  userId: string;
}

export interface Comment {
  id: string;
  postId: string;
  name: string;
  email: string;
  body: string;
}
