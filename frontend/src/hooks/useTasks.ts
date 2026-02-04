import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import type { TaskDetails, AddContentForm } from '../types';

export const useTasks = () => {
  const [tasks, setTasks] = useState<TaskDetails[]>([]); // tasks: holds the array of user tasks fetched from the backend.
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchTasks = async () => {
    try {
      const response = await axiosInstance.get("/task");
      setTasks(response.data.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const createTask = async (formData: AddContentForm) => {
    setIsSubmitting(true);
    try {      
      const tagsArray = formData.tags.split(',').map(tag => tag.trim());
      
      const response = await axiosInstance.post('/task', {
        title: formData.title,
        type: formData.type,
        link: formData.link || null,
        why: formData.why,
        tags: tagsArray,
        reminderDate: new Date(formData.reminderDate)
      });
      
      setTasks(prev => [response.data.taskDetails, ...prev]); // React ki asynchronous state update ko safe aur accurate rakhne ke liye.
      return { success: true };
    } catch (error) {
      console.error("Error creating task:", error);
      return { success: false, error: "Failed to create task" };
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteTask = async (taskId: number) => {
    try {
      await axiosInstance.delete(`/task/${taskId}`);
      setTasks(prev => prev.filter(t => t.id !== taskId));
      return { success: true };
    } catch (error) {
      console.error("Error deleting task:", error);
      return { success: false, error: "Failed to delete task" };
    }
  };

  const toggleTaskStatus = async (taskId: number, currentStatus: string) => {
    
    try {
      if (currentStatus === 'COMPLETED') {
        
      const res =  await axiosInstance.put(`/task/${taskId}`, { status: 'IN_PROGRESS' });      
        setTasks(prev => prev.map(t => t.id === taskId ? {...t, status: 'PENDING'} : t));
      } else {
        await axiosInstance.post(`/task/${taskId}/completed`);
        setTasks(prev => prev.map(t => t.id === taskId ? {...t, status: 'COMPLETED'} : t));
      }
      return { success: true };
    } catch (error) {
      return { success: false, error: "Failed to update task status" };
    }
  };

  return {
    tasks,
    isSubmitting,
    createTask,
    deleteTask,
    toggleTaskStatus,
    refetch: fetchTasks
  };
};