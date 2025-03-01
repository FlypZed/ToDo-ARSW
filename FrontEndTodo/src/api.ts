import axios from "axios";

const API_URL = "http://localhost:8080/api/tasks";

export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export const getTasks = async (): Promise<Task[]> => {
  const response = await axios.get<Task[]>(API_URL);
  return response.data;
};

export const createTask = async (task: Omit<Task, "id">): Promise<void> => {
  await axios.post(API_URL, task);
};

export const updateTask = async (id: number, task: Partial<Task>): Promise<void> => {
  await axios.put(`${API_URL}/${id}`, task);
};

export const deleteTask = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
