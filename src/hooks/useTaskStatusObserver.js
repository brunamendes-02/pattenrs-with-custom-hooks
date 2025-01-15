import { useState, useEffect } from 'react';

function useTaskStatusObserver(initialTasks) {
  const [tasks, setTasks] = useState(initialTasks);
  const [observers, setObservers] = useState([]);

  useEffect(() => {
    observers.forEach(callback => callback(tasks));
  }, [tasks, observers]);

  const updateTaskStatus = (taskId, newStatus) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const addObserver = (callback) => {
    setObservers(prevObservers => [...prevObservers, callback]);
  };

  const removeObserver = (callback) => {
    setObservers(prevObservers =>
      prevObservers.filter(observer => observer !== callback)
    );
  };

  return { tasks, updateTaskStatus, addObserver, removeObserver };
}