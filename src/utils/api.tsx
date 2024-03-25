import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAPI = async (endpoint: string): Promise<any> => {
  try {
    const response = await axios.get(`${API_URL}${endpoint}`);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw new Error("Failed to fetch data from API");
  }
};

export const postAPI = async (endpoint: string, data: any): Promise<any> => {
  try {
    const response = await axios.post(`${API_URL}${endpoint}`, data);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw new Error("Failed to post data to API");
  }
};

export const deleteAPI = async (endpoint: string): Promise<any> => {
  try {
    const response = await axios.delete(`${API_URL}${endpoint}`);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw new Error("Failed to delete data from API");
  }
};

export const getSingleUserAPI = async (userId: number): Promise<any> => {
  try {
    const response = await axios.get(`${API_URL}users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw new Error("Failed to fetch single user from API");
  }
};

export const updateSingleUserAPI = async (
  userId: number,
  data: any
): Promise<any> => {
  try {
    const response = await axios.put(`${API_URL}users/${userId}`, data);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw new Error("Failed to fetch single user from API");
  }
};
