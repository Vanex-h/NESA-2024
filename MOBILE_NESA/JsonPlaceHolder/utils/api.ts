import axios from 'axios';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export const api = {
  createPost: async (post: Omit<Post, 'id'>, userId: number): Promise<Post> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/posts`, { ...post, userId });
      return response.data;
    } catch (error) {
      throw new Error('Failed to create post');
    }
  },
  getPosts: async (): Promise<Post[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/posts`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch posts');
    }
  },

  getPost: async (id: number): Promise<Post> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/posts/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch post');
    }
  },

  getComments: async (postId: number): Promise<Comment[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/posts/${postId}/comments`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch comments');
    }
  },

  deletePost: async (id: number): Promise<void> => {
    try {
      await axios.delete(`${API_BASE_URL}/posts/${id}`);
    } catch (error) {
      throw new Error('Failed to delete post');
    }
  },
};